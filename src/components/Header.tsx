import { useEffect, useRef, useState } from 'react';
import type { Route } from '../lib/router';
import { href } from '../lib/router';
import { LANGS, useContent, useLang } from '../i18n';
import logoUrl from '../assets/logo-staylog.png';

/** Stay Log 로고 — 글자 모양만 남긴 이미지를 마스크로 써서, 배경 톤에 맞는 색으로 칠합니다 */
const LOGO_STYLE = { WebkitMaskImage: `url(${logoUrl})`, maskImage: `url(${logoUrl})` };

function Logo() {
  return <span className="topbar__mark" style={LOGO_STYLE} aria-hidden="true" />;
}

/**
 * 상단 바 — 로고 · 게하 탐색 · 취향 테스트 · 언어(KO / EN / 中) · 메뉴
 * 지금 화면에 걸친 섹션의 data-tone(dark/light)을 읽어 글자색을 바꿉니다.
 */
export function Header({ route }: { route: Route }) {
  const [tone, setTone] = useState<'dark' | 'light'>('light');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { site, ui } = useContent();

  // 페이지가 바뀌면 메뉴를 닫습니다 (뒤로 가기 등 메뉴 밖에서 이동한 경우 포함).
  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = 30;
      let current: HTMLElement | null = null;
      document.querySelectorAll<HTMLElement>('[data-tone]').forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) current = s;
      });
      setTone((current as HTMLElement | null)?.dataset.tone === 'dark' ? 'dark' : 'light');
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    const t = window.setTimeout(update, 350);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [route]);

  // 메인에서 로고를 누르면 주소가 그대로라 이동이 없으니, 맨 위(인트로)로 올려 줍니다
  const toTop = () => {
    if (route.name === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`topbar topbar--${tone}${scrolled ? ' is-scrolled' : ''}`}>
        <a className="topbar__brand" href={href.home()} onClick={toTop} data-track="gnb_logo" aria-label={ui.nav.toHome(site.brand)}>
          <Logo />
          <span className="topbar__ko">{site.brand}</span>
        </a>
        <nav className="topbar__nav" aria-label={ui.nav.mainNav}>
          <a className="topbar__link" href={href.house()} data-track="gnb_house" aria-current={route.name === 'house' ? 'page' : undefined}>
            {ui.nav.house}
          </a>
          <a className="topbar__link" href={href.test()} data-track="gnb_test" aria-current={route.name === 'test' ? 'page' : undefined}>
            {ui.nav.test}
          </a>
          <LangSwitch />
          <button type="button" className="topbar__menu" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)} data-track="gnb_menu_open">
            <span className="topbar__burger" aria-hidden="true"><i /><i /><i /></span>
            <span className="visually-hidden">{ui.nav.menuOpen}</span>
          </button>
        </nav>
      </header>
      {open && <Menu route={route} onClose={() => setOpen(false)} />}
    </>
  );
}

/** 언어 바꾸기 — 누르면 사이트 전체 글이 그 언어로 바뀝니다 */
function LangSwitch() {
  const { lang, setLang } = useLang();
  const { ui } = useContent();
  return (
    <div className="langswitch" role="group" aria-label={ui.langLabel}>
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id === 'zh' ? 'zh-CN' : l.id}
          title={l.name}
          aria-label={l.name}
          aria-pressed={lang === l.id}
          onClick={() => setLang(l.id)}
          data-track={`gnb_lang_${l.id}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

const MENU = [
  // 메인 — 인트로 다음 CHECK IN 화면(사진 띠 · '게스트하우스에서 이런 하루')으로
  { key: 'home', en: 'HOME', to: href.home('checkin') },
  { key: 'house', en: 'EXPLORE', to: href.house() },
  // 메뉴는 상세 화면 대신 메인 안의 그 칸으로 — 취향 테스트 안내 · 취향 지도 · 더 많은 이야기(인스타그램)
  { key: 'test', en: 'TEST', to: href.home('find') },
  { key: 'map', en: 'MAP', to: href.home('tastemap') },
  { key: 'insta', en: 'INSTAGRAM', to: href.home('inside') },
] as const;

function Menu({ route, onClose }: { route: Route; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { ui } = useContent();
  const labels = { home: ui.nav.main, house: ui.nav.house, test: ui.nav.test, map: ui.nav.map, insta: ui.nav.more };

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('a, button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const items = ref.current.querySelectorAll<HTMLElement>('a, button');
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div className="menu" id="site-menu" role="dialog" aria-modal="true" aria-label={ui.nav.menu} ref={ref} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="menu__sheet">
        <div className="menu__head">
          <Logo />
          <button type="button" className="menu__close" onClick={onClose} data-track="gnb_menu_close">
            <span aria-hidden="true">×</span>
            <span className="visually-hidden">{ui.nav.menuClose}</span>
          </button>
        </div>
        <ul className="menu__list">
          {MENU.map((m) => (
            <li key={m.key}>
              <a href={m.to} onClick={onClose} data-track={`menu_${m.key}`} aria-current={route.name === m.key ? 'page' : undefined}>
                <span>{labels[m.key]}</span>
                <span className="label label--muted">{m.en}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

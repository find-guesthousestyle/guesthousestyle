import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { SITE as SITE_KO } from '../data/site';
import { useContent } from '../i18n';
import { href } from '../lib/router';
import { useReducedMotion } from '../lib/motion';
import { HousePage } from './HousePage';
import { GehageScene } from '../components/GehageScene';
import { INSTA_ORDER, INSTA_POSTS } from '../data/insta';
import { TasteMapIsland } from '../components/TasteMapIsland';
import { BeachDivider } from '../components/BeachDivider';
import { GrassLedge } from '../components/GrassLedge';
import { TestShare } from '../components/TestShare';
import introNightUrl from '../assets/intro-night.webp';
import checkoutBgUrl from '../assets/checkout-stay.webp';
import stripLpWall from '../assets/strip/lp-wall.webp';
import stripPotluck from '../assets/strip/potluck-wall.webp';
import stripCat from '../assets/strip/flower-cat.webp';
import stripBuckwheat from '../assets/strip/buckwheat-umbrella.webp';
import stripTea from '../assets/strip/iced-tea.webp';
import stripMallow from '../assets/strip/fire-marshmallow.webp';
import stripWinePour from '../assets/strip/wine-pour.webp';
import stripRingWork from '../assets/strip/ring-workshop.webp';
import stripCosmos from '../assets/strip/cosmos-field.webp';
import stripCalendar from '../assets/strip/calendar-wall.webp';
import stripCrater from '../assets/strip/crater-view.webp';
import stripPuppy from '../assets/strip/rooftop-puppy.webp';
import stripSeaSit from '../assets/strip/seaside-sit.webp';
import stripForest from '../assets/strip/forest-trail.webp';
import stripSeaRun from '../assets/strip/seaside-run.webp';
import stripGuitar from '../assets/strip/guitar-corner.webp';
import stripDinner from '../assets/strip/susu-dinner-table.webp';
import stripSunrise from '../assets/strip/kokoko-sunrise.webp';

/**
 * PAGE 01 — 메인 (하나의 세로 스크롤)
 * INTRO → PROBLEM → CHECK IN → FIND YOUR STAY → CHECK OUT
 */
export function HomePage() {
  const { site: SITE, ui } = useContent();
  return (
    <>
      <h1 className="visually-hidden">{SITE.brand} — {ui.home.srTitle}</h1>
      <Intro />
      {/* 대문(체크인 · 체크아웃) 대신 집 내부를 메인에서 바로 둘러봅니다 */}
      <HousePage embedded />
      <FindYourStay />
      <TasteMapBanner />
      <InsideRooms />
      <CheckOut />
    </>
  );
}

/* ── SECTION 01. INTRO — 밤의 게스트하우스, 기존 인식 ─────────────────────────────── */
/**
 * 화면을 고정해 두고 스크롤하는 만큼 장면이 진행됩니다.
 * 질문 → 01 파티. → 02 술. → 03 헌팅.
 * → 어둠 속 전환 문구 → 밝은 화면이 서서히 떠오르며 문제 정의(PROBLEM)
 * 동작 줄이기 설정이면 고정 없이 모든 문구를 한 번에 보여 줍니다.
 */
const REVEAL = SITE_KO.intro.words.length + 3;
/**
 * 이번 방문에서 인트로를 이미 봤는지 — 브라우저에 저장하지 않고 페이지가 열려 있는 동안만 기억합니다.
 * 사이트에 처음 들어왔을 때(새로 열기 · 새로고침)만 재생하고, 상세페이지에 다녀오거나 맨 위로 올라와도 다시 틀지 않습니다.
 */
let introPlayed = false;
function Intro() {
  const { site: SITE, ui } = useContent();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const total = SITE.intro.words.length;
  // 스크롤 없이 시간에 맞춰 저절로 — 질문 → 파티 · 술 · 헌팅 → 전환 문구 → 문제 정의
  // auto: 1 ~ total 은 나온 단어 수, total + 1 은 시야가 좁아짐, total + 2 는 전환 문구, REVEAL 은 문제 정의
  const seenRef = useRef(introPlayed);
  const [auto, setAuto] = useState(() => (seenRef.current ? REVEAL : 0));
  // 자동 진행 중에 먼저 스크롤해 내려가도 바로 문제 정의
  const [revealByScroll, setRevealByScroll] = useState(false);
  // 아래로 내려갔다가 맨 위로 돌아오면 질문부터 다시 재생 (run 이 바뀌면 시간을 처음부터 셉니다)
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduced || seenRef.current) return;
    // 질문만 1.5초(생각할 시간) → 단어 0.65초 간격 → 1초 뒤 전환 문구 → 3초 뒤 문제 정의
    // (전환 문구는 두 줄 먼저, 0.85초 뒤 '전부가 아닙니다.' — 마지막 줄도 읽을 시간을 둠)
    // (예전 '시야가 좁아짐' 단계는 뺐습니다 — 같은 시각에 두 단계를 한꺼번에 넘김)
    const at = Array.from({ length: total }, (_, i) => 1500 + i * 650);
    const last = at[at.length - 1];
    at.push(last + 1000, last + 1000, last + 4000);
    // 화면에 실제로 보이는 동안만 시간을 셉니다 — 공유 링크가 뒤에서 미리 불러와질 때 혼자 끝나 버리지 않도록
    // (requestAnimationFrame 은 안 보이는 창 · 프레임에서 멈추고, 인트로 무대가 화면에 반 이상 보일 때만 셈)
    let visible = false;
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([en]) => { visible = en.intersectionRatio >= 0.5; }, { threshold: [0, 0.5] })
      : null;
    // 섹션 전체(화면 2.6개 높이)가 아니라 화면에 고정된 무대를 봅니다
    const stage = ref.current?.querySelector('.intro__stage');
    if (io && stage) io.observe(stage);
    else visible = true;
    let elapsed = 0;
    let prev = 0;
    let raf = 0;
    const tick = (now: number) => {
      const dt = prev ? Math.min(100, now - prev) : 0;
      prev = now;
      if (visible && document.visibilityState === 'visible') elapsed += dt;
      const n = at.filter((ms) => elapsed >= ms).length;
      if (n) setAuto((cur) => Math.max(cur, n));
      if (n < at.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [reduced, total, run]);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let wentDown = false;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range)) : 1;
      el.style.setProperty('--p', p.toFixed(3));
      // 스크롤한 화면 수 기준 — 0.04 화면만 내려도 문제 정의 (문제 정의 화면은 약 0.3화면 머문 뒤 다음 섹션으로)
      // 자동 진행이 끝나기 전에 내려가 버려도, 돌아오면 문제 정의가 열린 상태입니다
      const s = p * range / window.innerHeight;
      const reveal = s >= 0.04;
      setRevealByScroll(reveal);
      if (reveal) {
        setAuto(REVEAL);
        wentDown = true;
      } else if (wentDown && s < 0.05 && !seenRef.current) {
        wentDown = false;
        setAuto(0);
        setRun((r) => r + 1);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced, total]);

  const step = revealByScroll ? REVEAL : auto;
  const shown = reduced ? REVEAL : step;
  const revealed = !reduced && step >= REVEAL;
  const phase = reduced ? 'static'
    : step === 0 ? 'start'
    : step < total ? 'words'
    : step === total ? 'all'
    : step === total + 1 ? 'iris'
    : step === total + 2 ? 'turn' : 'reveal';

  // 문제 정의(PROBLEM)가 열리기 전까지는 스크롤을 막습니다 — 휠 · 터치 · 키보드만 막고,
  // 메뉴 · 버튼으로 이동하는 스크롤은 그대로 둡니다 (메뉴 안 스크롤도 그대로)
  // 혹시 시간이 멈춰도(창이 가려졌다 돌아오는 등) 갇히지 않게 15초 뒤에는 풀어 줍니다
  const [lockTimedOut, setLockTimedOut] = useState(false);
  const locked = !reduced && !revealed && !lockTimedOut;
  useEffect(() => {
    setLockTimedOut(false);
    const t = window.setTimeout(() => setLockTimedOut(true), 15000);
    return () => window.clearTimeout(t);
  }, [run]);
  useEffect(() => {
    if (!locked) return;
    const KEYS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'End', 'Home']);
    const inMenu = (t: EventTarget | null) => t instanceof Element && !!t.closest('.menu');
    const block = (e: Event) => {
      if (!inMenu(e.target)) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (!KEYS.has(e.key) || inMenu(t) || t?.closest('input, textarea, select, [contenteditable]')) return;
      // 버튼 위 스페이스는 누르기 동작이라 그대로 둠
      if (e.key === ' ' && t?.closest('button')) return;
      e.preventDefault();
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', onKey);
    };
  }, [locked]);

  // 밝은 문제 정의 화면이 열리면 상단 바 글자색도 다시 맞춥니다.
  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, [revealed]);

  // 한 번 끝까지 보면 이번 방문 동안은 다시 재생하지 않음
  useEffect(() => {
    if (!revealed) return;
    introPlayed = true;
    seenRef.current = true;
  }, [revealed]);

  return (
    <section ref={ref} id="intro" className={`intro${reduced ? ' intro--static' : ''}`} data-step={Math.min(shown, total)} data-phase={phase} data-tone={revealed ? 'light' : 'dark'} aria-labelledby="intro-title">
      {/* 메뉴 '메인'이 오는 자리 — 인트로를 끝까지 내린 곳, CHECK IN 화면이 다 열린 상태 */}
      {!reduced && <span id="checkin" className="intro__anchor" />}
      <div className="intro__stage">
        <NightScene />

        <h2 id="intro-title" className="intro__q pre">{SITE.intro.question}</h2>
        <ol className="intro__words" aria-label={ui.home.wordsAria}>
          {SITE.intro.words.map((w, i) => (
            <li key={w} className={`intro__word w${i + 1}${i < Math.min(shown, total) ? ' is-on' : ''}`}>
              {w}
            </li>
          ))}
        </ol>

        {/* 줄마다 — 따옴표로 시작하는 줄(‘제주 게스트하우스’)은 크고 진하게 */}
        <p className="intro__turn">
          {SITE.intro.turn.split('\n').map((line, i, all) => (
            <span key={line} className={/^[‘“]/.test(line) ? 'intro__turn-em' : i === all.length - 1 ? 'intro__turn-end' : undefined}>
              {line}
            </span>
          ))}
        </p>

        <p className="intro__hint" aria-hidden="true">
          <i />
        </p>

        {/* 밝은 화면이 서서히 떠오르며 — 문제 정의 */}
        <div id="problem" className="intro__reveal">
          {/* 동작 줄이기 설정이면 고정 없이 펼쳐지므로 CHECK IN 자리는 여기 */}
          {reduced && <span id="checkin" />}
          <Problem />
          {/* 아래로 내려 보라는 표시 */}
          <p className="intro__scroll" aria-hidden="true">
            <span>SCROLL</span>
            <b className="intro__chev">
              <span />
              <span />
            </b>
          </p>
        </div>
      </div>
    </section>
  );
}

/** 흐릿한 파티 불빛과 사람들의 실루엣 — 받은 배경 그림 한 장, 문구가 늘어날수록 짙어집니다 */
function NightScene() {
  return (
    <div className="intro__scene" aria-hidden="true">
      <img className="intro__bg" src={introNightUrl} alt="" />
    </div>
  );
}

/* ── SECTION 02. PROBLEM — 인트로 끝에 떠오르는 문제 정의 ─────────────────────────────── */
function Problem() {
  const { site: SITE } = useContent();
  return (
    <section className="problem" aria-labelledby="problem-title">
      <div className="problem__inner wrap">
        {/* 사진 띠가 맨 위 — 그 아래 제목 · 문장 */}
        <PhotoStrip />
        <header className="problem__head">
          <p className="label">{SITE.problem.label}</p>
          <h2 id="problem-title" className="problem__title">
            {SITE.problem.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
        </header>
        {SITE.problem.points.length > 0 && (
          <div className="problem__points">
            {SITE.problem.points.map((pt) => (
              <div key={pt.no} className="problem__point">
                <p className="problem__key">
                  <span>{pt.no}</span>
                  {pt.key}
                </p>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="problem__answer">
          <p className="problem__answertext pre">{SITE.problem.answer}</p>
          {SITE.problem.answerNote && <p className="problem__answernote">{SITE.problem.answerNote}</p>}
        </div>
      </div>
    </section>
  );
}

/**
 * 사진 띠 — 게스트하우스 장면을 세로 사진으로, 조금씩 겹치고 살짝 기울여 한 줄로 늘어놓고
 * 오른쪽에서 밀려 들어온 뒤 계속 왼쪽으로 흘러갑니다. (같은 줄을 두 번 이어 붙여 끊김 없이 돕니다)
 * h 는 띠 높이 대비 %, y 는 위아래 어긋남(%), r 은 기울기(도).
 * photo 는 같은 사진이 쓰인 상세페이지 사진 파일 이름 — 대체 텍스트를 거기서 가져옵니다. (run · lounge · camp · mallow · dome · candle · lpwall · living · ring · potluck · cat · buckwheat 은 상세에 없어 ui 문구)
 */
// 색 순서대로 — 초록(메밀밭 · 코스모스 · 숲길 · 분화구) → 주황(일출 · 일력 벽 · 모닥불 · 아이스티 · 포트럭 · 꽃과 고양이)
// → 파랑(바다 달리기 · 방파제 · 강아지) → 갈색(LP 벽 · 반지 공방 · 저녁 식탁 · 기타 · 와인). 초록 · 파랑이 모자란 끝부분은 주황 · 갈색이 번갈아
const STRIP: { src: string; h: number; y: number; r: number; photo: string }[] = [
  { src: stripBuckwheat, h: 99, y: -3, r: -2, photo: 'buckwheat' },
  { src: stripSunrise, h: 90, y: 2, r: 2, photo: 'kokoko-sunrise' },
  { src: stripSeaRun, h: 98, y: -3, r: -2, photo: 'searun' },
  { src: stripLpWall, h: 92, y: 3, r: 1.5, photo: 'lpwall' },
  { src: stripCosmos, h: 99, y: -3, r: -1.5, photo: 'cosmos' },
  { src: stripCalendar, h: 95, y: 3, r: 1.5, photo: 'calendar' },
  { src: stripSeaSit, h: 98, y: -3, r: -1.5, photo: 'seasit' },
  { src: stripRingWork, h: 97, y: 2, r: 2, photo: 'ringwork' },
  { src: stripForest, h: 96, y: -3, r: -1.5, photo: 'forest' },
  { src: stripMallow, h: 93, y: 3, r: 1.5, photo: 'mallow' },
  { src: stripPuppy, h: 96, y: -2, r: -1.5, photo: 'puppy' },
  { src: stripDinner, h: 100, y: 2, r: 1.5, photo: 'susu-dinner-table' },
  { src: stripCrater, h: 99, y: -4, r: -2, photo: 'crater' },
  { src: stripTea, h: 91, y: 4, r: 1, photo: 'tea' },
  { src: stripGuitar, h: 96, y: -2, r: -1.5, photo: 'guitar' },
  { src: stripPotluck, h: 97, y: 4, r: 2, photo: 'potluck' },
  { src: stripWinePour, h: 95, y: -3, r: -1.5, photo: 'winepour' },
  { src: stripCat, h: 94, y: 2, r: 1.5, photo: 'cat' },
];

function PhotoStrip() {
  const { ui, programs } = useContent();
  const alt = (key: string) => {
    if (key === 'run') return ui.home.stripRunAlt;
    if (key === 'lounge') return ui.home.stripLoungeAlt;
    if (key === 'camp') return ui.home.stripCampAlt;
    if (key === 'mallow') return ui.home.stripMallowAlt;
    if (key === 'dome') return ui.home.stripDomeAlt;
    if (key === 'candle') return ui.home.stripCandleAlt;
    if (key === 'lpwall') return ui.home.stripLpWallAlt;
    if (key === 'living') return ui.home.stripLivingAlt;
    if (key === 'ring') return ui.home.stripRingAlt;
    if (key === 'potluck') return ui.home.stripPotluckAlt;
    if (key === 'cat') return ui.home.stripCatAlt;
    if (key === 'buckwheat') return ui.home.stripBuckwheatAlt;
    if (key === 'tea') return ui.home.stripTeaAlt;
    if (key === 'searun') return ui.home.stripSeaRunAlt;
    if (key === 'guitar') return ui.home.stripGuitarAlt;
    if (key === 'winepour') return ui.home.stripWinePourAlt;
    if (key === 'ringwork') return ui.home.stripRingWorkAlt;
    if (key === 'cosmos') return ui.home.stripCosmosAlt;
    if (key === 'calendar') return ui.home.stripCalendarAlt;
    if (key === 'crater') return ui.home.stripCraterAlt;
    if (key === 'puppy') return ui.home.stripPuppyAlt;
    if (key === 'seasit') return ui.home.stripSeaSitAlt;
    if (key === 'forest') return ui.home.stripForestAlt;
    for (const g of programs.flatMap((p) => p.report.programs ?? [])) {
      const hit = [g.photo, ...(g.photos ?? [])].find((ph) => ph?.src?.includes(key));
      if (hit) return hit.alt;
    }
    return '';
  };
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {[0, 1].map((loop) =>
          STRIP.map((p) => (
            <span key={`${loop}-${p.src}`} className="strip__item" style={{ height: `${p.h}%`, '--y': `${p.y}%`, '--r': `${p.r}deg` } as CSSProperties}>
              <img src={p.src} alt={loop === 0 ? alt(p.photo) : ''} />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

/* ── SECTION 03. FIND YOUR STAY — 취향 테스트 안내 ─────────────────────────────── */
function FindYourStay() {
  const { site: SITE, ui } = useContent();
  return (
    <section id="find" className="find" data-tone="light" aria-labelledby="find-title">
      {/* 위 집 칸 잔디밭과 이 칸 모래 사이 — 두께 있는 잔디 판(디오라마) */}
      <GrassLedge />
      <div className="find__inner wrap">
        <div className="find__copy">
          <p className="label">{SITE.findYourStay.label}</p>
          <h2 id="find-title" className="section-head__title">
            {SITE.findYourStay.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
        </div>
        {/* 테스트 첫 화면의 소라게 게하게 소개 — 그림 · 이름 · 두 줄 이야기 그대로, 그 밑에 테스트 버튼 */}
        <div className="find__gehage story">
          <GehageScene bubbleId="find-bubble-fill" />
          <p className="story__title">{ui.test.storyTitle}</p>
          <p className="story__body pre">{ui.test.storyBody}</p>
          <a className="btn" href={href.test()} data-track="find_cta">
            {SITE.findYourStay.cta} <span className="arrow" aria-hidden="true">→</span>
          </a>
          {/* 테스트 공유하기 — 카카오톡 · X · 링크 복사 */}
          <TestShare />
        </div>
      </div>
    </section>
  );
}

/* ── SECTION 04. CHECK OUT — 마무리: 맺음 문구 · 다시 둘러보기 ─────────────────────────────── */
/* ── 제주 게하 취향지도 — 테스트 칸과 MORE STORIES 사이, 받은 섬 그림 위로 돋보기가 움직임 · 누르면 취향 지도 페이지 ── */
function TasteMapBanner() {
  const { ui } = useContent();
  return (
    <section id="tastemap" className="find find--map" data-tone="light" aria-labelledby="tastemap-title">
      {/* 위 '게하게' 칸 모래사장에서 파도를 지나 바다로 */}
      <BeachDivider />
      <div className="find__inner wrap">
        {/* 제목 — 다른 칸처럼 작은 라벨 + 굵은 제목 (그림 속 글씨는 빼고) */}
        <div className="tastemap__head">
          <p className="label">AROUND JEJU</p>
          <h2 id="tastemap-title" className="section-head__title pre">{ui.map.homeTitle}</h2>
        </div>
        {/* 누를 수 있다는 안내 — 지도 바로 위 */}
        <p className="tastemap__hint">
          {/* 청록 동그라미 속 하얀 지도 핀 — 둘레로 물결이 퍼짐 */}
          <span className="tastemap__pin" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 2.5a7 7 0 0 0-7 7c0 5.2 7 12 7 12s7-6.8 7-12a7 7 0 0 0-7-7Zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" />
            </svg>
          </span>
          {ui.map.cta}
        </p>
        {/* 그림 전체가 눌림 */}
        <a className="tastemap" href={href.map()} data-track="home_taste_map" aria-label={ui.map.open}>
          {/* 섬 위를 돋보기가 집집마다 찾아다니는 움직이는 그림 */}
          <TasteMapIsland />
        </a>
      </div>
    </section>
  );
}

/* ── 방 내부 둘러보기 — 테스트 칸 밑 한 칸 더: 인스타그램 페이지(숙소 게시물 사진)로 ── */

function InsideRooms() {
  const { ui } = useContent();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // 스크롤하는 만큼 카드가 바다 위로 쓱 올라옴 — 카드 위쪽이 화면 맨 아래에 닿을 때 0, 화면 55% 높이에 오면 1
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.style.setProperty('--rise', '1');
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // 카드가 아래로 내려가 있는 만큼을 빼고 원래 자리 기준으로 계산
      const top = el.getBoundingClientRect().top - (1 - Number(el.style.getPropertyValue('--rise') || 1)) * 240;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)));
      el.style.setProperty('--rise', p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return (
    <section ref={ref} id="inside" className="find find--inside" data-tone="light" aria-labelledby="inside-title">
      <div className="find__inner wrap">
        {/* 휴대폰 — 가운데 정렬로 글 밑에 격자 / 넓은 화면 — 테스트 칸과 거울처럼 왼쪽 사진 격자 · 오른쪽 글, 색은 그대로 */}
        <div className="more">
          <div className="more__copy">
            <p className="label">MORE STORIES</p>
            <h2 id="inside-title" className="more__title pre">{ui.home.moreTitle}</h2>
            {/* 집 둘러보기의 안내(주황 점이 깜빡이는 둥근 상자)와 같은 모양 */}
            <p className="explore__hint more__hint">
              <span className="explore__dot" aria-hidden="true" />
              {ui.home.moreSub}
            </p>
          </div>
          {/* 인스타그램 게시물 표지 사진 — 9개 세 칸 × 세 줄 격자(순서는 INSTA_ORDER — 인스타그램 페이지와 같음), 누르면 웹진 인스타그램 페이지에서 그 게시물이 바로 열림 */}
          <ul className="more__grid">
            {INSTA_ORDER.map((i) => [INSTA_POSTS[i], i] as const).map(([p, i]) => (
              <li key={p.img}>
                <a href={href.insta(i + 1)} data-track={`inside_thumb_${i + 1}`}>
                  <img src={p.img} alt={p.alt} loading="lazy" decoding="async" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CheckOut() {
  const { site: SITE } = useContent();
  const c = SITE.checkOut;
  return (
    // 배경 — 받은 그림(크림 종이 · 찢어진 종이 · 초록 언덕 위 stay Log 집 로고)을 오른쪽 아래에. 글은 왼쪽 위, 로고는 글 아래 오른쪽 (휴대폰은 버튼 오른쪽 아래)
    <section id="checkout" className="outro" data-tone="light" aria-labelledby="checkout-title" style={{ '--outro-bg': `url(${checkoutBgUrl})` } as CSSProperties}>
      <div className="outro__inner wrap">
        <header className="outro__head">
          <p className="label">{c.label}</p>
          <h2 id="checkout-title" className="outro__title">
            {c.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h2>
        </header>

        {/* 빈 줄(\n\n)로 나눈 두 문장 — 빈 줄 한 칸 대신 반 줄쯤만 띄움 */}
        <p className="outro__closing pre">
          {c.closing.split('\n\n').map((part) => (
            <span key={part} className="outro__para">{part}</span>
          ))}
        </p>
        {/* 다시 둘러보기 · 그 아래 인스타그램 보러가기 */}
        <div className="outro__actions">
          <a className="btn" href={href.house()} data-track="checkout_cta">
            {c.cta} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

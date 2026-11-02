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
 * 스크롤한 화면 수(s)마다 한 단계씩 — 첫 단어 0.15화면, 단어 사이 0.22화면,
 * 마지막 단어 0.25화면 뒤 전환 문구, 다시 0.35화면 뒤 문제 정의. 위로 올리면 거꾸로 돌아갑니다.
 * (예전에는 시간에 맞춰 저절로 진행하며 그동안 스크롤을 막았는데, 여기서 이탈이 많아 스크롤로 바꿈)
 * 문제 정의가 열리면 사진이 한 벌로 포개진 채 비스듬히 선 모습(입체)으로 나타나
 * 0.05 ~ 0.45화면 동안 대각선으로 쫙 펼쳐지고(fanAt), 0.6 ~ 1.0화면 동안 바로 누워 원래 사진 띠가 됩니다(isoAt).
 * 다 누우면 띠가 흐르기 시작하고, 제목 · 문장도 그때 떠오릅니다.
 * 단어 4개 기준 문제 정의 1.41화면 + 사진 1.0화면 — 섹션 높이(home.css .intro, 360vh)가 여기에 맞춰져 있습니다.
 */
const WORD_AT = 0.15;
const WORD_GAP = 0.22;
const TURN_GAP = 0.25;
const REVEAL_GAP = 0.35;
const FAN = [0.05, 0.45];
const FLATTEN = [0.6, 1.0];
/** 사진 대각선 무대에 세우는 장 수 — 화면 가운데에 보이는 것만 */
const FAN_COUNT = 12;
const revealAt = (total: number) => WORD_AT + (total - 1) * WORD_GAP + TURN_GAP + REVEAL_GAP;
const ramp = (s: number, [a, b]: number[]) => Math.min(1, Math.max(0, (s - a) / (b - a)));
function stepAt(s: number, total: number) {
  const turnAt = revealAt(total) - REVEAL_GAP;
  if (s >= turnAt + REVEAL_GAP) return REVEAL;
  // total + 1(시야가 좁아짐) 단계는 건너뜁니다
  if (s >= turnAt) return total + 2;
  return s < WORD_AT ? 0 : Math.min(total, Math.floor((s - WORD_AT) / WORD_GAP) + 1);
}
/** 0 = 한 벌로 포개짐, 1 = 대각선으로 다 펼쳐짐 */
const fanAt = (s: number, total: number) => ramp(s - revealAt(total), FAN);
/** 1 = 비스듬히 선 입체 무대, 0 = 바로 누운 사진 띠 (문제 정의 전에는 1) */
const isoAt = (s: number, total: number) => 1 - ramp(s - revealAt(total), FLATTEN);
/**
 * 입체 무대로 세울 때 사진마다 화면 가운데까지의 거리(--dx)와 대각선 자리(--kc: 가운데 기준 순번, --kf: 0 앞 ~ 1 뒤)를 잽니다.
 * 화면 가운데 FAN_COUNT 장만 세우고 나머지는 잠시 숨김(--hide). 맨 왼쪽이 맨 앞(위에 겹침)입니다.
 * 흐르던 띠가 멈춘 그 자리 기준이라, 위로 올려 다시 세워도 띠가 튀지 않습니다.
 */
function measureFan(track: HTMLElement) {
  const left = track.getBoundingClientRect().left;
  const mid = window.innerWidth / 2;
  const items = [...track.children as HTMLCollectionOf<HTMLElement>].map((item) => {
    // 띠가 움직이는(transform 이 걸린) 동안에는 띠 자체가 offsetParent 라 offsetLeft 가 띠 기준
    const inTrack = item.offsetParent === track ? item.offsetLeft : item.offsetLeft - track.offsetLeft;
    return { item, x: left + inTrack + item.offsetWidth / 2 };
  });
  const picked = [...items].sort((a, b) => Math.abs(a.x - mid) - Math.abs(b.x - mid)).slice(0, FAN_COUNT).sort((a, b) => a.x - b.x);
  const n = picked.length;
  for (const { item, x } of items) {
    item.style.setProperty('--dx', `${(mid - x).toFixed(1)}px`);
    const k = picked.findIndex((p) => p.item === item);
    item.style.setProperty('--hide', k < 0 ? '1' : '0');
    item.style.setProperty('--kc', k < 0 ? '0' : String(k - (n - 1) / 2));
    item.style.setProperty('--kf', k < 0 ? '0' : (k / Math.max(1, n - 1)).toFixed(3));
    item.style.zIndex = k < 0 ? '' : String(2 + n - k);
  }
}
/** 다 누워 띠가 다시 흐를 때 — 세울 때 넣었던 겹침 순서를 지워 원래 겹침(home.css)으로 */
function clearFan(track: HTMLElement) {
  for (const item of track.children as HTMLCollectionOf<HTMLElement>) item.style.zIndex = '';
}
function Intro() {
  const { site: SITE, ui } = useContent();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const total = SITE.intro.words.length;
  // 0: 질문만, 1 ~ total: 나온 단어 수, total + 2: 전환 문구, REVEAL: 문제 정의
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    // 사진 입체 무대 자리를 잰 상태인지 — 다 누우면(띠가 다시 흐르면) 다음에 세울 때 새로 잽니다
    let piled = false;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range)) : 1;
      el.style.setProperty('--p', p.toFixed(3));
      const s = p * range / window.innerHeight;
      setStep(stepAt(s, total));
      const iso = isoAt(s, total);
      const track = el.querySelector<HTMLElement>('.strip__track');
      if (track) {
        if (iso > 0 && !piled) {
          track.style.animationPlayState = 'paused';
          measureFan(track);
          piled = true;
        } else if (iso <= 0 && piled) {
          track.style.animationPlayState = '';
          clearFan(track);
          piled = false;
        }
      }
      el.style.setProperty('--fan', fanAt(s, total).toFixed(3));
      el.style.setProperty('--iso', iso.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      piled = false;
      onScroll();
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [reduced, total]);

  const shown = reduced ? REVEAL : step;
  const revealed = !reduced && step >= REVEAL;
  const phase = reduced ? 'static'
    : step === 0 ? 'start'
    : step < total ? 'words'
    : step === total ? 'all'
    : step === total + 1 ? 'iris'
    : step === total + 2 ? 'turn' : 'reveal';

  // 밝은 문제 정의 화면이 열리면 상단 바 글자색도 다시 맞춥니다.
  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
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

        {/* 스크롤해야 진행된다는 안내 — 첫 화면에서 바로 보이게 글자와 함께 */}
        <p className="intro__hint" aria-hidden="true">
          <span>SCROLL</span>
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

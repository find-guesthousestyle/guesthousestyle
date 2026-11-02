import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { QUESTIONS } from '../data/quiz';
import { useContent } from '../i18n';
import type { ProgramId } from '../data/types';
import { scoreQuiz, decodeAnswers, type AnswerKey, type QuizResult } from '../lib/scoring';
import { characterArt } from '../data/characterArt';
import { gaAttrs } from '../lib/gaParams';
import { absUrl, href } from '../lib/router';
import { prefersReducedMotion } from '../lib/motion';
import { track } from '../lib/track';
import { makeResultImage } from '../lib/resultImage';
import { openXPost } from '../lib/shareX';
import tripCrabUrl from '../assets/trip-crab.webp';
import tripHouseUrl from '../assets/trip-house.webp';

/** 숫자 — 질문 순서 · 'result' — 결과 */
type Step = number | 'result';

/**
 * PAGE 04 — 취향 테스트
 * 10문항 · 점수 배점(src/data/quiz.ts) · 계산(src/lib/scoring.ts)을 그대로 씁니다.
 * 결과는 BEST 1(결과 유형의 대표 숙소) + BEST 2 · 3(그다음 추천).
 */
export default function TestPage({ sharedCode, mine = false }: { sharedCode: string | null; mine?: boolean }) {
  const { ui, questions } = useContent();
  const shared = decodeAnswers(sharedCode);
  const [answers, setAnswers] = useState<(AnswerKey | null)[]>(() => shared ?? QUESTIONS.map(() => null));
  const [step, setStep] = useState<Step>(shared ? 'result' : 0);
  const [isShared, setIsShared] = useState(Boolean(shared) && !mine);
  const focusRef = useRef<HTMLHeadingElement>(null);
  // 직전 단계 — 처음 열릴 때(뒤로 가기로 돌아올 때 포함)는 위로 올리지 않도록 단계가 실제로 바뀔 때만 움직입니다
  const prevStep = useRef(step);
  const timer = useRef(0);
  /** 테스트 시작 시각 — 결과까지 걸린 시간(quiz_result 의 duration_sec) */
  const startedAt = useRef(0);

  useEffect(() => {
    const decoded = decodeAnswers(sharedCode);
    if (!decoded) return;
    setAnswers(decoded);
    setIsShared(!mine);
    setStep('result');
  }, [sharedCode, mine]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // 들어오자마자 첫 질문부터 (게하게 소개는 메인 FIND YOUR STAY 칸에)
  useEffect(() => {
    if (!shared) {
      startedAt.current = Date.now();
      track('quiz_start');
    }
  }, []);

  // 문항이 바뀌면 질문으로 초점을 옮기고 화면 위쪽에 맞춥니다.
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    focusRef.current?.focus({ preventScroll: true });
    const top = document.querySelector('.test__card, .result');
    if (top && top.getBoundingClientRect().top < 0) window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [step]);

  const finish = (all: AnswerKey[]) => {
    const r = scoreQuiz(all);
    setStep('result');
    // 주소에 내 결과를 남겨 둡니다 — 숙소 페이지로 갔다가 뒤로 가기를 누르면 이 결과로 돌아옴
    history.replaceState(history.state, '', href.myResult(r.code));
    // duration_sec — 첫 문항이 뜬 뒤 결과까지 걸린 초 (공유받은 결과처럼 시작이 없으면 빼고 보냄)
    const sec = startedAt.current ? Math.round((Date.now() - startedAt.current) / 1000) : null;
    track('quiz_result', { type: r.type, best: r.main, code: r.code, ...(sec != null ? { duration_sec: sec } : null) });
  };

  const choose = (qi: number, key: AnswerKey) => {
    const next = [...answers];
    next[qi] = key;
    setAnswers(next);
    track('quiz_answer', { q: QUESTIONS[qi].id, a: key });
    window.clearTimeout(timer.current);
    // 선택이 보이도록 잠깐 머문 뒤 다음 질문으로
    timer.current = window.setTimeout(() => goNext(qi, next), prefersReducedMotion() ? 0 : 320);
  };

  const goNext = (qi: number, list = answers) => {
    if (!list[qi]) return;
    if (qi < QUESTIONS.length - 1) setStep(qi + 1);
    else finish(list as AnswerKey[]);
  };

  const restart = () => {
    setAnswers(QUESTIONS.map(() => null));
    setIsShared(false);
    setStep(0);
    history.replaceState(history.state, '', href.test());
    startedAt.current = Date.now();
    track('quiz_start');
  };

  const result = step === 'result' && answers.every(Boolean) ? scoreQuiz(answers as AnswerKey[]) : null;
  const qi = typeof step === 'number' ? step : -1;
  // 다음 질문 그림을 미리 불러 둠 — 답을 고르자마자 넘어갈 때 그림이 늦게 뜨지 않게
  const nextImage = qi >= 0 ? questions[qi + 1]?.image : undefined;
  useEffect(() => {
    if (nextImage) new Image().src = nextImage;
  }, [nextImage]);

  return (
    <section className="test" data-tone="light" aria-labelledby="test-title">
      <div className="test__inner wrap">
        {qi >= 0 && (
          <>
            {/* 진행 — 왼쪽 끝 소라게가 한 문항마다 한 칸씩 걸어가 마지막 문항에서 오른쪽 집 문 앞에 닿음
                (받은 그림에서 소라게 · 집을 배경만 빼서 그대로) · 카드 밖에 두어 문항이 바뀌어도 이어서 움직임 */}
            <div
              className="trip"
              role="progressbar"
              aria-label={ui.test.progress}
              aria-valuemin={1}
              aria-valuemax={QUESTIONS.length}
              aria-valuenow={qi + 1}
              aria-valuetext={`${qi + 1} / ${QUESTIONS.length}`}
            >
              <span className="trip__path" aria-hidden="true" />
              <img className="trip__house" src={tripHouseUrl} alt="" />
              <img className="trip__crab" src={tripCrabUrl} alt="" style={{ '--step': qi / (QUESTIONS.length - 1) } as CSSProperties} />
            </div>            <div className="test__card" key={qi}>

              <p className="test__qno serif" aria-hidden="true">Q{qi + 1}.</p>
              <h1 id="test-title" ref={focusRef} tabIndex={-1} className="test__q">
                {questions[qi].q}
              </h1>

              {/* 질문 그림 — 왼쪽 칸이 A, 오른쪽 칸이 B (선택지 글과 같은 내용이라 읽기 도구에는 숨김) */}
              {questions[qi].image && (
                <div className="test__pic" aria-hidden="true">
                  <img src={questions[qi].image} alt="" width={1404} height={514} />
                  <span className="test__pickey test__pickey--a">A</span>
                  <span className="test__pickey test__pickey--b">B</span>
                </div>
              )}

              <div className="test__options" role="radiogroup" aria-labelledby="test-title">
                {questions[qi].options.map((o) => {
                  const on = answers[qi] === o.key;
                  return (
                    <button
                      key={o.key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={`test__option${on ? ' is-on' : ''}`}
                      onClick={() => choose(qi, o.key)}
                      data-track={`quiz_${QUESTIONS[qi].id}_${o.key}`}
                    >
                      <span className="test__key" aria-hidden="true">{o.key}</span>
                      <span className="test__otext">{o.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* 답을 고르면 저절로 다음 질문으로 — 버튼은 이전 질문만 */}
              <div className="test__nav">
                <button type="button" className="btn btn--ghost btn--back" onClick={() => setStep(qi - 1)} disabled={qi === 0} data-track="quiz_prev">
                  {ui.test.prev} <span className="arrow" aria-hidden="true">←</span>
                </button>
              </div>
            </div>
          </>
        )}

        {result && <Result result={result} shared={isShared} onRetry={restart} focusRef={focusRef} />}
      </div>
    </section>
  );
}

function Result({ result, shared, onRetry, focusRef }: { result: QuizResult; shared: boolean; onRetry: () => void; focusRef: RefObject<HTMLHeadingElement | null> }) {
  const { ui, site, programById, experiences, questions } = useContent();
  const t = ui.test;
  // 추천 이유 — 1위 숙소에 점수를 가장 많이 준 실제 답변 둘 (지금 언어의 선택지 문장으로)
  // 추천 근거 해시태그 — 1위 숙소 점수에 가장 크게 보탠 답 3개의 태그
  const reasonTags = [...result.evidence]
    .sort((a, b) => (b.option.programs[result.main] ?? 0) - (a.option.programs[result.main] ?? 0))
    .slice(0, 3)
    .map(({ question, option }) => questions.find((q) => q.id === question.id)?.options.find((o) => o.key === option.key)?.tag ?? option.tag);
  const [status, setStatus] = useState('');
  const [second, third] = result.subs;

  // 저장하기 — 결과를 한 장의 이미지로 (휴대폰은 공유 창의 ‘이미지 저장’, 컴퓨터는 파일 내려받기)
  const save = async () => {
    try {
      const file = await resultFile();
      const touch = window.matchMedia('(pointer: coarse)').matches;
      if (touch && navigator.canShare?.({ files: [file] })) {
        // 이미지만 보냄 — 제목 문장(‘스테이 제주로그 — …’)은 함께 보내지 않음
        await navigator.share({ files: [file] });
      } else download(file);
      setStatus(t.saved);
      track('result_save', { type: result.type });
    } catch (err) {
      setStatus((err as Error)?.name === 'AbortError' ? t.canceled : t.saveFailed);
    }
  };

  // 결과 이미지 한 장 — 화면 위쪽 그대로(취향 · 캐릭터 이름 · 해시태그 · BEST 1 · 소라게 · 게하 이름 · 한 줄 소개)
  const resultFile = async () => {
    const id: ProgramId = result.main;
    const blob = await makeResultImage({
      id,
      lead: t.lead,
      title: site.characters[id],
      tags: reasonTags,
      rank: 'BEST 1',
      place: programById[id].report.place.name,
      oneLine: programById[id].report.oneLine,
      brand: site.brand,
    });
    return new File([blob], `jejulog-${result.code}.png`, { type: 'image/png' });
  };
  const download = (file: File) => {
    const u = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = u;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 4000);
  };

  // 결과 공유 — 지금 쓰는 기기의 공유 창으로 (휴대폰이면 카카오톡 · 인스타그램 앱이 목록에 바로 뜸)
  const url = absUrl(href.result(result.code));
  const hit = (via: string) => track('result_share', { via });
  const failed = (err: unknown) => setStatus((err as Error)?.name === 'AbortError' ? t.canceled : t.shareFailed);
  // 카카오톡 — 결과 링크를 공유 창으로 (링크만 보냄, 제목 · 설명 문장은 함께 보내지 않음)
  //  공유 창이 없는 컴퓨터 브라우저는 링크를 복사해 카카오톡 대화창에 붙여 넣게
  const shareKakao = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ url });
        setStatus(t.shared);
      } else {
        await navigator.clipboard.writeText(url);
        setStatus(t.kakaoCopied);
      }
      hit('kakao');
    } catch (err) {
      failed(err);
    }
  };
  // X — 내 결과 문구 · 링크가 채워진 글쓰기 창으로 (휴대폰은 X 앱).
  //  링크는 결과별 미리보기 페이지(public/s/{결과}.html) — X 가 그 결과 소라게 · 이름 그림(s/{결과}.jpg)을 카드로 보여 주고,
  //  누르면 웹진의 이 결과 화면으로 바로 넘어감
  const shareX = () => {
    hit('x');
    const cardUrl = absUrl(`s/${result.main}.html?r=${result.code}`);
    openXPost(t.xText(site.characters[result.main]), cardUrl);
  };
  // 링크 복사 — 결과 링크를 복사해 두고 원하는 곳(문자 · DM · 메모 등)에 붙여 넣게
  //  복사 기능을 못 쓰는 브라우저는 숨긴 글상자를 골라 복사
  const copyLink = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else {
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setStatus(t.linkCopied);
      hit('link');
    } catch (err) {
      failed(err);
    }
  };

  return (
    <div className="result">
      <header className="result__head">
        {shared && <p className="label">{t.sharedLabel}</p>}
        <p className="result__lead">{t.lead}</p>
        {/* 1위 — 캐릭터 이름(…하게) · 추천 이유 · 한 줄 소개 · 캐릭터 그림 · 게스트하우스 이름 */}
        <h1 id="test-title" ref={focusRef} tabIndex={-1} className="result__type">
          {site.characters[result.main]}
        </h1>
        {/* 추천 근거 — 실제 고른 답에서 나온 해시태그 3개, 캐릭터 이름 바로 밑 */}
        {reasonTags.length > 0 && (
          <ul className="result__tags">
            {reasonTags.map((tg) => (
              <li key={tg} className="result__tag">#{tg}</li>
            ))}
          </ul>
        )}
        <div className="result__hero">
          <span className="result__rank">BEST 1<span className="visually-hidden"> {t.bestCaption}</span></span>
          <img src={characterArt[result.main]} alt="" />
        </div>
        {/* 게스트하우스 이름 — '자세히 알아보기' 바로 위 */}
        <p className="result__place">{programById[result.main].report.place.name}</p>
        {/* 게하 한 줄 소개 — 숙소 페이지 BASIC INFORMATION 과 같은 문장, 이름 바로 밑 */}
        {programById[result.main].report.oneLine && <p className="result__oneline">{programById[result.main].report.oneLine}</p>}
        {/* 자세히 알아보기 · 그 오른쪽 저장(아이콘만) */}
        <div className="result__cta">
          <a className="btn" href={href.stay(result.main)} data-track={`result_best01_${result.main}`} {...gaAttrs(result.main, 1)}>
            {t.detail} <span className="arrow" aria-hidden="true">→</span>
          </a>
          <button type="button" className="result__save" onClick={save} aria-label={t.save} title={t.save} data-track="result_save">
            <ActIcon name="save" />
          </button>
        </div>
      </header>

      <ol className="result__picks">
        {/* 2 · 3순위 — 나란히 */}
        {second && <Pick rank="BEST 2" caption={t.nextCaption} id={second.id} />}
        {third && <Pick rank="BEST 3" caption={t.thirdCaption} id={third.id} />}
      </ol>

      {/* 내 결과 공유하기(카카오톡 · 인스타그램 · X) — 2 · 3순위 카드 바로 밑 */}
      <div className="result__actions">
        <div className="share">
          <p className="share__title">{t.shareTitle}</p>
          <div className="share__row">
            <button type="button" className="share__btn share__btn--kakao" onClick={shareKakao} aria-label={t.shareKakao} title={t.shareKakao} data-track="result_share_kakao">
              <ShareIcon name="kakao" />
            </button>
            <button type="button" className="share__btn share__btn--x" onClick={shareX} aria-label={t.shareX} title={t.shareX} data-track="result_share_x">
              <ShareIcon name="x" />
            </button>
            <button type="button" className="share__btn share__btn--link" onClick={copyLink} aria-label={t.shareLink} title={t.shareLink} data-track="result_share_link">
              <ShareIcon name="link" />
            </button>
          </div>
        </div>
        <p className="result__status" role="status">{status}</p>
      </div>

      {/* 나머지 캐릭터 — 1 · 2 · 3위를 뺀 여섯 곳, 집 둘러보기 순서대로 */}
      <section className="others" aria-labelledby="others-title">
        <p className="label">{t.othersLabel}</p>
        <h2 id="others-title" className="others__title">{t.othersTitle}</h2>
        <ul className="others__list">
          {experiences
            .filter((e) => e.id !== result.main && e.id !== second?.id && e.id !== third?.id)
            .map((e) => (
              <li key={e.id}>
                <a className="others__item" href={href.stay(e.id)} data-track={`result_other_${e.id}`}>
                  <img src={characterArt[e.id]} alt="" loading="lazy" />
                  <span className="others__char">{site.characters[e.id]}</span>
                  <span className="others__place">{programById[e.id].report.place.name}</span>
                </a>
              </li>
            ))}
        </ul>
      </section>

      {/* 다시하기 */}
      <div className="result__actions">
        <button type="button" className="btn btn--ghost result__retry" onClick={onRetry} data-track="result_retry">
          <ActIcon name="retry" />
          {t.retry}
        </button>
      </div>
    </div>
  );
}

/** 결과 버튼 아이콘 — 저장(내려받기) · 다시하기(되돌리기), 글자색 선으로 */
function ActIcon({ name }: { name: 'save' | 'retry' }) {
  return (
    <svg className="result__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === 'save' && <path d="M12 4v11m-5-5 5 5 5-5M5 19h14" />}
      {name === 'retry' && <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4v3.5H8" />}
    </svg>
  );
}

/** 공유 동그라미 버튼 그림 — 카카오톡(노랑 바탕 · 갈색 말풍선 TALK) · X 로고 · 인스타그램(카메라) */
function ShareIcon({ name }: { name: 'kakao' | 'x' | 'link' }) {
  if (name === 'kakao') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M24 11c-9.4 0-17 5.9-17 13.2 0 4.7 3.1 8.8 7.8 11.1l-1.6 5.9c-.1.5.4.9.8.6l7-4.6c1 .1 2 .2 3 .2 9.4 0 17-5.9 17-13.2S33.4 11 24 11z" fill="#3A1D1D" />
        <text x="24" y="27.8" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif" fill="#FEE500" letterSpacing=".3">TALK</text>
      </svg>
    );
  }
  if (name === 'x') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.19L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45z" fill="#fff" />
      </svg>
    );
  }
  // 사슬 고리 두 개 — 링크 복사
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" />
    </svg>
  );
}

/**
 * 결과 카드 — 소라게 캐릭터 · 캐릭터 이름 · 게스트하우스 이름 · 자세히 보기 버튼
 * 캐릭터 그림은 src/assets/characters/hermit-*.webp (data/characterArt.ts)
 */
function Pick({ rank, caption, id }: { rank: string; caption: string; id: ProgramId }) {
  const { ui, site, programById } = useContent();
  const p = programById[id];
  return (
    <li className="pick">
      <p className="pick__rank" title={caption}>
        <strong>{rank}</strong>
        <span className="visually-hidden">{caption}</span>
      </p>
      <div className="pick__character">
        <img src={characterArt[id]} alt="" />
      </div>
      <p className="pick__charname">{site.characters[id]}</p>
      <h2 className="pick__name">{p.report.place.name}</h2>
      <a className="btn" href={href.stay(id)} data-track={`result_${rank.toLowerCase().replace(' ', '')}_${id}`} {...gaAttrs(id, Number(rank.replace(/\D/g, '')))}>
        {ui.test.detail} <span className="arrow" aria-hidden="true">→</span>
      </a>
    </li>
  );
}

import type { ProgramId, TypeId } from '../data/types';
import type { RoomId } from '../data/experiences';

/* ------------------------------------------------------------------
   다국어 — 한국어(ko)가 원본이고, 영어(en) · 중국어 간체(zh)는
   아래 모양의 '콘텐츠 팩'으로 같은 자리의 글만 바꿔 끼웁니다.
   사진 경로 · 주소 · 가격 숫자 같은 사실 정보는 원본 데이터(src/data)를 그대로 씁니다.
------------------------------------------------------------------- */

export type Lang = 'ko' | 'en' | 'zh';

/** src/data/site.ts 의 SITE 와 같은 모양 (글만) */
export interface SiteText {
  brand: string;
  issue: string;
  description: string;
  intro: { slug: string; time: string; question: string; words: string[]; turn: string };
  problem: {
    label: string;
    title: string[];
    points: { no: string; key: string; text: string }[];
    answer: string;
    answerNote: string;
  };
  checkIn: { label: string; title: string[]; sub: string; cta: string };
  /** rooms — 테스트 칸 밑 새 칸 제목 '방 내부 둘러보기' (버튼은 인스타그램 보러가기) */
  findYourStay: { label: string; title: string[]; cta: string; rooms: string };
  /** 메인 마지막 마무리 — closing: 맺음말 */
  checkOut: { label: string; title: string[]; sub: string; cta: string; instagram: string; closing: string };
  explore: { label: string; title: string[]; sub: string; hint: string };
  /** 숙소(프로그램)마다 소라게 캐릭터 이름 — 취향 테스트 결과 카드 */
  characters: Record<string, string>;
}

/** 게스트하우스 한 곳의 글 — src/data/programs.ts 의 각 항목과 같은 자리 */
export interface ProgramText {
  /** 'OO하는 방법' 형식의 기사 제목 (상세페이지 메인 카피) */
  title: string;
  kicker: string;
  /** 프로그램 기획 의도 본문 (원본이 빈 문자열이면 빈 문자열) */
  intro: string;
  forWhom: string[];
  hero: { alt: string; caption?: string };
  /** 숙소 이름 (영어는 로마자 표기, 중국어는 로마자 + 괄호 안 한국어) */
  placeName: string;
  /** 지역 (예: Andeok-myeon, Seogwipo) — 상세 주소는 원본 한국어 그대로 씁니다 */
  area: string;
  oneLine?: string;
  introQuote?: string;
  /** report.programs 와 같은 순서 · 같은 개수 */
  programs?: {
    name: string;
    /** 원본 info 와 같은 순서 · 같은 개수 */
    info: { label: string; value: string }[];
    /** photo 또는 photos 의 사진 순서대로 */
    photos?: { alt: string; caption?: string }[];
    text: string[];
    note?: string;
  }[];
  editorProfile?: { title?: string; label?: string; tags: string[]; about?: string[] };
  /** 에디터 체험기 문단 (원본과 같은 개수) */
  experience: string[];
  recommend?: string[];
  /** 참여 전 확인 번역 — 링크 이름은 순서대로 */
  join?: { who?: string; how?: string; linkLabels?: string[] };
}

export interface ExperienceText {
  /** 집 안에서 보이는 경험 이름 (예: Reading) */
  label: string;
  /** 취향 테스트 결과의 한 단어 유형 */
  short: string;
  /** 원본 experiences.ts 에 headline 이 있는 항목만 */
  headline?: string;
}

export interface QuizText {
  /** 키는 문항 id (q1 ~ q10) — 선택지는 A · B 두 갈래 */
  questions: Record<string, { context: string; q: string; options: { A: string; B: string; C?: string; D?: string }; tags?: { A: string; B: string } }>;
  types: Record<TypeId, { name: string; en: string; description: string; travelStyle: string[] }>;
}

export interface ContentPack {
  site: SiteText;
  experiences: Record<ProgramId, ExperienceText>;
  /** 층 · 공간 이름 (다락 작업실, 서재, 거실, 부엌, 마당) */
  floors: Record<RoomId, string>;
  programs: Record<ProgramId, ProgramText>;
  quiz: QuizText;
}

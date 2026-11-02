import type { ArtKey, ProgramId, TypeId } from './types';

/* ------------------------------------------------------------------
   CHAPTER 03 — 취향 테스트 데이터

   ▣ 10문항, 문항마다 두 갈래(A · B). 마지막 문항(Q10)은 성향 점수가 3점으로 가장 큽니다.

   ▣ 점수 규칙 (점수표)
     · 선택지마다 programs 에 숙소(프로그램)별 점수를 줍니다 — 쉼 cinema · 서론 lp · 스르르 craft · 코코코 flower
       · 서점숙소 book · 수수민박 homemeal · 루프탑정원 wine · 무릉쉼표 camping · 새애월 running
     · 10문항 합계가 높은 순서로 1 · 2 · 3위 숙소를 추천합니다.
     · 동점이면 Q10 → Q9 → … → Q1 순서로, 그 문항에서 점수를 더 받은 곳을 위로 올립니다.
     · 결과 유형(공유 제목 등)은 1위 숙소가 속한 유형입니다. types(성향 점수)는 더 이상 결과에 쓰지 않습니다.

   ▣ 9개 프로그램은 모두 네 유형 중 하나에 속하므로, 어떤 프로그램도
     추천 결과에서 빠지지 않습니다.
       모험하는 여행자   러닝 · 캠핑
       감각적인 수집가   LP · 책
       손끝의 기록자     꽃 · 나무반지 · 집밥
       장면을 간직하는 여행자  영화 · 와인
------------------------------------------------------------------- */

export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  /** 결과 화면 해시태그 — 이 답을 고르면 붙는 한 단어 */
  tag: string;
  types: Partial<Record<TypeId, number>>;
  programs: Partial<Record<ProgramId, number>>;
}

export interface QuizQuestion {
  id: string;
  /** 결과의 '추천 이유' 문장에 쓰이는 짧은 맥락 */
  context: string;
  q: string;
  /** 질문과 선택지 사이 그림 (public/ 기준) — 왼쪽 칸이 A, 오른쪽 칸이 B. 아직 없으면 비워 둠
   *  (그림마다 테두리가 달라 두 칸 모두 같은 크기 · 같은 둥근 테두리로 다시 그려 둠, 1404 × 514) */
  image?: string;
  options: QuizOption[];
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    context: '마음이 가는 제주 게하',
    q: '제주 게하, 나는 이런 곳이 좋다.',
    image: 'quiz/q1.webp',
    options: [
      { key: 'A', tag: '쉼', text: '조용히 푹 쉬다 오는 곳', types: { collector: 2 }, programs: { cinema: 3, lp: 3, craft: 1, flower: 1 } },
      { key: 'B', tag: '사람냄새', text: '사람 사는 냄새 나는 곳', types: { maker: 1, keeper: 1 }, programs: { book: 3, homemeal: 2, wine: 2, camping: 2, running: 1 } },
    ],
  },
  {
    id: 'q2',
    context: '체크인 후 라운지에서',
    q: '체크인! 라운지에 먼저 온 게스트가 있다.',
    image: 'quiz/q2.webp',
    options: [
      { key: 'A', tag: '혼자만의시간', text: '눈인사만 하고 방으로 직행', types: { collector: 2 }, programs: { craft: 3, cinema: 2, flower: 1 } },
      { key: 'B', tag: '먼저인사', text: '“어디서 오셨어요?” 먼저 말 건다', types: { keeper: 1, adventurer: 1 }, programs: { wine: 3, homemeal: 1, running: 1, camping: 1 } },
    ],
  },
  {
    id: 'q3',
    context: '하루 종일 비 오는 날',
    q: '하루 종일 비 소식이다.',
    image: 'quiz/q3.webp',
    options: [
      { key: 'A', tag: '원데이클래스', text: '숙소에서 원데이 클래스 듣기', types: { maker: 2 }, programs: { craft: 2, flower: 1 } },
      { key: 'B', tag: '비오는제주', text: '비 와도 나간다, 비 오는 제주 찍으러', types: { adventurer: 2 }, programs: { camping: 1 } },
    ],
  },
  {
    id: 'q4',
    context: '오늘 저녁 메뉴',
    q: '오늘 저녁 메뉴는?',
    image: 'quiz/q4.webp',
    options: [
      { key: 'A', tag: '집밥', text: '사장님이 차려주는 집밥 한 상', types: { maker: 2 }, programs: { homemeal: 2 } },
      { key: 'B', tag: '와인디너', text: '와인 곁들인 양식 디너', types: { keeper: 2 }, programs: { wine: 1, running: 1 } },
    ],
  },
  {
    id: 'q5',
    context: '저녁 먹고 숙소에서',
    q: '저녁 먹고, 숙소에서 하나만 한다면?',
    image: 'quiz/q5.webp',
    options: [
      { key: 'A', tag: '영화', text: '다 같이 영화 한 편', types: { keeper: 2 }, programs: { cinema: 3 } },
      { key: 'B', tag: 'LP', text: 'LP로 음악 듣기', types: { collector: 2 }, programs: { lp: 3 } },
    ],
  },
  {
    id: 'q6',
    context: '밤에 나누는 이야기',
    q: '밤에 사람들이랑 얘기한다면?',
    image: 'quiz/q6.webp',
    options: [
      { key: 'A', tag: '깊은대화', text: '책 한 구절로 시작하는 깊은 얘기', types: { collector: 2 }, programs: { book: 3 } },
      { key: 'B', tag: '불멍수다', text: '모닥불 앞에서 가벼운 수다', types: { adventurer: 1, keeper: 1 }, programs: { camping: 2, running: 2 } },
    ],
  },
  {
    id: 'q7',
    context: '여행에서의 하루 리듬',
    q: '여행 가서 나는?',
    image: 'quiz/q7.webp',
    options: [
      { key: 'A', tag: '아침형', text: '일찍 일어나는 아침형', types: { adventurer: 2 }, programs: { homemeal: 2, flower: 2, running: 1 } },
      { key: 'B', tag: '밤형', text: '늦게까지 깨어 있는 밤형', types: { collector: 2 }, programs: { lp: 3, book: 3, cinema: 1, wine: 1 } },
    ],
  },
  {
    id: 'q8',
    context: '아침 일찍 나간다면',
    q: '아침 일찍 나간다면?',
    image: 'quiz/q8.webp',
    options: [
      { key: 'A', tag: '오름일출', text: '오름 올라 일출 보기', types: { adventurer: 2 }, programs: { flower: 3 } },
      { key: 'B', tag: '해안러닝', text: '해안도로 따라 달리기', types: { adventurer: 2 }, programs: { running: 3 } },
    ],
  },
  {
    id: 'q9',
    context: '제주 기념으로 남길 것',
    q: '제주 기념으로 남기고 싶은 건?',
    image: 'quiz/q9.webp',
    options: [
      { key: 'A', tag: '손으로만든것', text: '내 손으로 만든 것', types: { maker: 2 }, programs: { craft: 3, flower: 1 } },
      { key: 'B', tag: '풍경사진', text: '제주 풍경 속 내 사진', types: { adventurer: 2 }, programs: { camping: 3 } },
    ],
  },
  {
    id: 'q10',
    context: '처음 만난 사람과 함께할 것',
    q: '처음 만난 사람과 딱 하나만 함께한다면?',
    image: 'quiz/q10.webp',
    options: [
      { key: 'A', tag: '와인한잔', text: '와인 한 잔', types: { keeper: 3 }, programs: { wine: 2, running: 1 } },
      { key: 'B', tag: '따뜻한밥', text: '따뜻한 밥 한 끼', types: { maker: 3 }, programs: { homemeal: 2, camping: 1 } },
    ],
  },
];

export interface TravelType {
  id: TypeId;
  no: string;
  name: string;
  en: string;
  /** 감각적인 유형 설명 */
  description: string;
  /** 당신에게 어울리는 제주 여행 방식 */
  travelStyle: string[];
  /** 이 유형에 속한 프로그램 — 순서가 프로그램 동점 시 우선순위입니다 */
  programs: ProgramId[];
  art: ArtKey;
}

export const TYPES: Record<TypeId, TravelType> = {
  adventurer: {
    id: 'adventurer',
    no: '01',
    name: '모험하는 여행자',
    en: 'THE MOVER',
    description:
      '당신은 풍경을 눈보다 몸으로 먼저 기억합니다. 숨이 차오르는 순간, 바람이 방향을 바꾸는 순간, 그런 것들이 여행의 장면이 되지요. 낯선 사람과도 나란히 걷고 같은 불을 쬐다 보면 어느새 친해져 있습니다.',
    travelStyle: [
      '해가 뜨기 전에 일어나, 동네 아침 코스를 달린다',
      '하룻밤쯤은 지붕 대신 하늘 아래에서 잔다',
      '밤에는 모닥불 앞에서 내일의 코스를 이야기한다',
    ],
    programs: ['running', 'camping'],
    art: 'road',
  },
  collector: {
    id: 'collector',
    no: '02',
    name: '감각적인 수집가',
    en: 'THE COLLECTOR',
    description:
      '당신에게 여행은 소리와 문장을 모으는 일입니다. 붐비는 명소보다 오래 앉아 있을 수 있는 자리를 먼저 찾지요. 말없이 같은 공간을 나누는 사람들 사이에서 오히려 편안함을 느낍니다.',
    travelStyle: [
      '하루에 한 곳, 오래 머물 공간을 고른다',
      '좋은 음악과 책 한 권을 일정만큼 중요하게 챙긴다',
      '밤에는 볼륨을 높이고 목소리를 낮춘다',
    ],
    programs: ['lp', 'book'],
    art: 'lp',
  },
  maker: {
    id: 'maker',
    no: '03',
    name: '손끝의 기록자',
    en: 'THE MAKER',
    description:
      '당신은 보고 듣는 것만으로는 조금 아쉬운 사람입니다. 꽃 한 송이를 다듬고, 나무 한 조각을 깎고, 함께 먹을 밥을 짓는 동안 여행지는 비로소 내 것이 되지요. 결과물이 조금 비뚤어도 괜찮습니다. 그 비뚤어짐이 기억이니까요.',
    travelStyle: [
      '오후 한나절은 손을 쓰는 프로그램에 비워 둔다',
      '기념품은 사지 않고 만든다',
      '저녁은 처음 만난 사람들과 함께 차려 먹는다',
    ],
    programs: ['flower', 'craft', 'homemeal'],
    art: 'workbench',
  },
  keeper: {
    id: 'keeper',
    no: '04',
    name: '장면을 간직하는 여행자',
    en: 'THE KEEPER',
    description:
      '당신은 여행이 끝난 뒤에 여행을 한 번 더 하는 사람입니다. 함께 본 영화의 한 장면, 잔을 기울이던 밤의 공기가 시간이 지날수록 선명해지지요. 지금 이 순간이 나중에 어떻게 기억될지 아는 사람입니다.',
    travelStyle: [
      '하루의 끝을 서두르지 않고, 천천히 닫는다',
      '같은 화면이나 같은 잔을 나누며 밤을 보낸다',
      '여행의 장면을 오래 꺼내 볼 수 있게 남겨 둔다',
    ],
    programs: ['cinema', 'wine'],
    art: 'wine',
  },
};

/** 동점일 때 마지막으로 쓰는 고정 우선순위 (scoring.ts 3단계) */
export const TYPE_FALLBACK_ORDER: TypeId[] = ['collector', 'maker', 'keeper', 'adventurer'];

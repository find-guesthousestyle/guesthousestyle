/* ------------------------------------------------------------------
   제주로그(JEJULOG) — 메인 · 탐색 페이지 문안
   CHECK IN → EXPLORE → DISCOVER → CHECK OUT
------------------------------------------------------------------- */

/** 제주로그 인스타그램 (@stay.jejulog) */
export const INSTAGRAM_URL = 'https://www.instagram.com/stay.jejulog?cplk=YmVraTQ2YWU1b2hh&utm_source=qr';

export const SITE = {
  brand: 'Find Your Guesthouse Style',
  issue: 'VOL. 01 — JEJU GUESTHOUSE',
  description: '파티만 있는 줄 알았던 제주 게스트하우스. 에디터가 직접 머물며 찾은 아홉 가지 경험과 나에게 맞는 숙소.',

  intro: {
    slug: 'S#00. 게스트하우스 / 밤',
    time: '23:40',
    question: '‘게스트하우스’ 하면\n무슨 단어가 떠오르시나요?',
    words: ['파티', '헌팅', '술', '이성'],
    turn: '당신이 알고 있는\n‘제주 게스트하우스’\n전부가 아닙니다.',
  },

  /* 문제 정의 — 기획 배경을 그대로 옮깁니다 */
  problem: {
    label: 'CHECK IN',
    title: ['게스트하우스에서 이런 하루', '상상해보셨나요?'],
    points: [],
    answer: "에디터가 직접 제주에 머물며 찾은 경험,\n한 집에 모아봤습니다.",
    answerNote: '',
  },

  checkIn: {
    label: 'CHECK IN',
    title: ['문 너머,', '우리가 몰랐던 게스트하우스.'],
    sub: '문을 열고,\n당신의 취향을 발견해보세요.',
    cta: '문 열고 체크인하기',
  },

  findYourStay: {
    label: 'FIND YOUR STAY',
    title: ['당신의 취향에 맞는', '제주 게스트하우스를 찾아보세요.'],
    cta: '테스트 바로가기',
    rooms: '방 내부 둘러보기',
  },

  checkOut: {
    label: 'CHECK OUT',
    title: ['제주에 와서', '어떤 하루를 보내고 싶나요?'], // 휴대폰은 두 줄, 웹은 한 줄로 이어 붙임
    sub: '게스트하우스에는 파티 말고도\n당신의 취향에 맞는\n다양한 경험이 기다리고 있습니다.',
    cta: '다시 둘러보기',
    instagram: '인스타그램 보러가기',
    closing: '에디터가 발견한 아홉 가지 경험 중,\n\n당신의 취향에 맞는 하루를 골라보세요.',
  },

  explore: {
    label: 'ROOM TOUR',
    title: ['어느 방부터 둘러볼까요?'],
    sub: '제주 게스트하우스에서 만날 수 있는\n여러 가지 경험을 둘러보세요.',
    hint: '공간을 누르면 해당 게스트하우스로 이동합니다.',
  },

  /** 숙소(프로그램)마다 소라게 캐릭터 이름 — 취향 테스트 결과 카드 */
  characters: {
    cinema: '엔딩 크레딧까지 다 보게',
    lp: '이어폰은 잠시 넣어두게',
    book: '오늘 밤만큼은 솔직하게',
    craft: '걱정은 깎아서 흘려보내게',
    flower: '오늘은 나한테만 맞추게',
    homemeal: '저녁은 같이 먹게',
    wine: '잔 좀 채워주게',
    running: '한 바퀴만 더 달리게',
    camping: '이 순간 그대로 남기게',
  },
} as const;

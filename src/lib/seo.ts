/**
 * 검색엔진 · AI · SNS 미리보기가 읽는 head 태그 — 화면이 바뀔 때마다 지금 페이지 내용으로 맞춥니다.
 * 첫 화면 값은 index.html 에 그대로 적혀 있고, 여기서는 #/ 뒤 주소가 바뀔 때 같은 태그를 고쳐 씁니다.
 * (화면에 보이는 문장 · 디자인은 건드리지 않습니다)
 */

/** 대표 주소 (canonical) — GitHub Pages 게시 주소 */
export const SITE_URL = 'https://seongmin9584.github.io/stay.jejulog/';
export const SITE_NAME = 'Find Your Guesthouse Style';

export interface PageMeta {
  title: string;
  description: string;
  /** SNS 미리보기 제목 · 설명 — 없으면 title · description */
  ogTitle?: string;
  ogDescription?: string;
  /** 대표 사진 (사이트 기준 상대 경로) · 대체 텍스트 — 없으면 og.jpg */
  image?: string;
  imageAlt?: string;
  /** SITE_URL 뒤에 붙는 주소 (예: #/stay/craft) */
  path?: string;
  /** 상세페이지 Article 구조화 데이터 — 화면에 보이는 제목 · 대표 사진만 */
  article?: { headline: string; image: string };
}

function meta(attr: 'name' | 'property', key: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
}

// og.jpg 크기 · 대체 텍스트 — 다른 사진을 쓰는 페이지에서 지웠다가 되돌릴 때 씁니다
const OG_DEFAULT: Record<string, string | null> = {};
for (const k of ['og:image:width', 'og:image:height', 'og:image:alt']) {
  OG_DEFAULT[k] = document.head.querySelector(`meta[property="${k}"]`)?.getAttribute('content') ?? null;
}

const abs = (path: string) => new URL(path, SITE_URL).href;

export function applyPageMeta(m: PageMeta) {
  const url = SITE_URL + (m.path ?? '');
  document.title = m.title;
  meta('name', 'description').content = m.description;
  meta('property', 'og:title').content = m.ogTitle ?? m.title;
  meta('property', 'og:description').content = m.ogDescription ?? m.description;
  meta('property', 'og:url').content = url;
  meta('property', 'og:image').content = abs(m.image ?? 'og.jpg');
  for (const k of Object.keys(OG_DEFAULT)) {
    const value = m.image ? (k === 'og:image:alt' ? m.imageAlt ?? null : null) : OG_DEFAULT[k];
    if (value) meta('property', k).content = value;
    else document.head.querySelector(`meta[property="${k}"]`)?.remove();
  }

  document.getElementById('ld-page')?.remove();
  if (m.article) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'ld-page';
    s.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: m.article.headline,
      image: abs(m.article.image),
      url,
      isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    });
    document.head.appendChild(s);
  }
}

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const SITE_URL = 'https://guesthousestyle.vercel.app/';

/**
 * 취향 테스트를 # 이 아닌 따로 된 주소(…/team4/test/)로 — 빌드가 끝나면 index.html 을 test/index.html 로 한 벌 더 둡니다.
 * 같은 앱이 그 주소에서 열리면 테스트 화면을 보여 주고(lib/router.ts), 사진 · 파일은 <base href="../"> 로 찾습니다(index.html 맨 위).
 * 검색 · 공유용 대표 주소와 제목만 테스트 페이지에 맞게 바꿉니다.
 */
function testPage(): Plugin {
  let outDir = 'dist';
  return {
    name: 'test-page',
    apply: 'build',
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    closeBundle() {
      const html = readFileSync(resolve(outDir, 'index.html'), 'utf8')
        // 스크립트로 <base> 를 넣으면 브라우저가 그 전에 test/assets/… 를 먼저 찾아 헛걸음하므로, 테스트 페이지에는 처음부터 태그로
        .replace(/<script>[^<]*createElement\('base'\)[^<]*<\/script>/, '<base href="../" />')
        .replace(`<link rel="canonical" href="${SITE_URL}" />`, `<link rel="canonical" href="${SITE_URL}test/" />`)
        .replace(`<meta property="og:url" content="${SITE_URL}" />`, `<meta property="og:url" content="${SITE_URL}test/" />`)
        .replace(/<title>[^<]*<\/title>/, '<title>취향 테스트 | Find Your Guesthouse Style</title>');
      mkdirSync(resolve(outDir, 'test'), { recursive: true });
      writeFileSync(resolve(outDir, 'test/index.html'), html);
    },
  };
}

// base: './' — 빌드 결과물(dist)을 어느 경로에 올려도 동작하도록 상대 경로로 출력합니다.
export default defineConfig({
  base: './',
  plugins: [react(), testPage()],
  server: { port: 5181, strictPort: true },
});

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 60000, // 밀리초 단위 타임아웃
  });
  // 나머지 코드
})();

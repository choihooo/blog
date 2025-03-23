const fs = require("fs");
const path = require("path");

// 파일 경로 설정
const postsMetaPath = path.join(__dirname, "..", "public", "postsMeta.json");
const configPath = path.join(__dirname, "..", "hydratable.config.json");

// 설정 파일을 읽고 수정하는 함수
function updateConfigWithUrls() {
  // 포스트 메타데이터 파일 읽기
  const postData = JSON.parse(fs.readFileSync(postsMetaPath, "utf8"));

  // 설정 파일 읽기
  let config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  // 기존 크롤링 URL 배열을 확인하고, 없으면 초기화
  if (!config.crawlingUrls) {
    config.crawlingUrls = [];
  }

  // 포스트 데이터로부터 URL 생성 및 추가
  postData.forEach((post) => {
    const urlTitle = encodeURIComponent(post.title);
    const newUrl = `/post/${urlTitle}`;
    // 중복된 URL을 추가하지 않도록 체크
    if (!config.crawlingUrls.includes(newUrl)) {
      config.crawlingUrls.push(newUrl);
    }
  });

  // 수정된 설정 파일 저장
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2)); // JSON 파일을 예쁘게 출력하기 위해 들여쓰기 옵션 사용
  console.log("Config file has been updated with new URLs.");
}

// 함수 실행
updateConfigWithUrls();

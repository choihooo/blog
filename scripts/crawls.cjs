const fs = require("fs");
const path = require("path");

// 파일 경로 설정
const postsMetaPath = path.join(__dirname, "..", "public", "postsMeta.json");
const packageJsonPath = path.join(__dirname, "..", "package.json");

// package.json의 reactSnap 설정을 업데이트하는 함수
function updateReactSnapConfig() {
  try {
    // 포스트 메타데이터 파일 읽기
    const postData = JSON.parse(fs.readFileSync(postsMetaPath, "utf8"));

    // package.json 파일 읽기
    let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // reactSnap 설정이 없으면 초기화
    if (!packageJson.reactSnap) {
      packageJson.reactSnap = {
        source: "dist",
        minifyHtml: {
          collapseWhitespace: false,
          removeComments: false
        },
        puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
        puppeteerIgnoreHTTPSErrors: true,
        skipThirdPartyRequests: true,
        crawl: true,
        include: ["/"]
      };
    }

    // 포스트 데이터로부터 URL 생성 및 추가
    const urls = postData.map(post => `/post/${encodeURIComponent(post.title)}`);
    packageJson.reactSnap.include = ["/", ...urls];

    // 수정된 package.json 파일 저장
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("package.json has been updated with new URLs for react-snap.");
  } catch (error) {
    console.error("Error updating react-snap configuration:", error);
    // 에러가 발생해도 빌드가 계속 진행되도록 함
  }
}

// 함수 실행
updateReactSnapConfig();

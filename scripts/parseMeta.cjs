const fs = require("fs");
const path = require("path");
const fm = require("front-matter");

const postsDirectory = path.join(__dirname, "../public/_posts");
const outputJson = path.join(__dirname, "../public/postsMeta.json");

const files = fs.readdirSync(postsDirectory);
const posts = files
  .map((file) => {
    const content = fs.readFileSync(path.join(postsDirectory, file), "utf8");
    const metadata = fm(content);

    const post = {
      title: metadata.attributes.title,
      date: metadata.attributes.date,
      categories: metadata.attributes.categories,
      tags: metadata.attributes.tags,
      excerpt: metadata.attributes.excerpt,
      thumbnail: metadata.attributes.thumbnail,
    };

    // series 속성이 존재할 때만 추가
    if (metadata.attributes.series) {
      post.series = metadata.attributes.series;
    }

    return post;
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // 날짜 내림차순 정렬

fs.writeFileSync(outputJson, JSON.stringify(posts, null, 2));

console.log("✅ 마크다운 파일에서 JSON 변환 완료! (날짜순 정렬)");

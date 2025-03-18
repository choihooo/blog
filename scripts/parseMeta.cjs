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
    return {
      title: metadata.attributes.title,
      date: metadata.attributes.date,
      categories: metadata.attributes.categories,
      tags: metadata.attributes.tags,
      series: metadata.attributes.series,
      excerpt: metadata.attributes.excerpt,
      thumbnail: metadata.attributes.thumbnail,
    };
  })
  .sort((a, b) => b.date - a.date);

fs.writeFileSync(outputJson, JSON.stringify(posts, null, 2));

console.log("✅ 마크다운 파일에서 JSON 변환 완료! (날짜순 정렬)");

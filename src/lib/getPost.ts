import fm from "front-matter";

// ✅ 마크다운 파일에서 사용할 속성 타입 정의
interface PostAttributes {
  title?: string;
  date?: string;
  categories?: string[];
  tags?: string[];
  series?: string;
  excerpt?: string;
  thumbnail?: string;
}

export async function getPost(id: string | undefined) {
  if (!id) {
    console.error("❌ Invalid post ID");
    return null;
  }

  try {
    // ✅ URL 디코딩 적용
    const decodedId = decodeURIComponent(id);

    // 🔹 마크다운 파일 불러오기
    const response = await fetch(`https:/www.howu.run/_posts/${decodedId}.md`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${decodedId}.md: ${response.status}`);
    }

    const markdown = await response.text();

    // 🔹 마크다운에서 메타데이터(attributes)와 본문(body) 분리
    const { attributes, body } = fm<PostAttributes>(markdown);

    return {
      title: attributes.title || "Untitled",
      date: attributes.date || new Date().toISOString(),
      categories: attributes.categories || ["Uncategorized"],
      tags: attributes.tags || [],
      series: attributes.series || "",
      excerpt: attributes.excerpt || "",
      thumbnail: attributes.thumbnail || "/images/default.webp",
      content: body, // ✅ 본문 내용 그대로 반환
    };
  } catch (error) {
    console.error(`❌ Failed to fetch post: ${id}`, error);
    return null;
  }
}

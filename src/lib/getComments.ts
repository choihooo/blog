import { title } from "process";

const GITHUB_COMMENTS_API =
  "https://api.github.com/repos/choihooo/comment/issues/comments"; // ❗ 필요 시 사용

// ✅ 특정 이슈(게시글) 내용을 가져오는 함수
async function getIssueContent(issueUrl: string) {
  try {
    const response = await fetch(issueUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API 호출 실패 (이슈 내용): ${response.status}`);
    }

    const issue = await response.json();
    return {
      title: issue.title,
      body: issue.body,
      createdAt: new Date(issue.created_at).toLocaleString(),
    };
  } catch (error) {
    console.error("❌ 이슈 내용을 가져오는 중 오류 발생:", error);
    return {
      title: "제목 없음",
      body: "내용을 불러올 수 없습니다.",
      createdAt: "",
    };
  }
}

// ✅ 제목 디코딩 + "post/" 접두사 제거 함수
function formatTitle(title: string) {
  const decodedTitle = decodeURIComponent(title); // URL 디코딩
  return decodedTitle.startsWith("post/")
    ? decodedTitle.slice(5)
    : decodedTitle; // "post/" 제거
}

// ✅ 최근 댓글 가져오기 + 해당 이슈(게시글) 내용 포함
export async function getRecentComments() {
  try {
    const response = await fetch(
      `${GITHUB_COMMENTS_API}?per_page=3&sort=created`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API 호출 실패 (댓글): ${response.status}`);
    }

    const comments = await response.json();

    // ✅ 각 댓글이 작성된 게시글(이슈)의 내용을 함께 가져오기
    const commentsWithPostContent = await Promise.all(
      comments.map(async (comment: any) => {
        const postContent = await getIssueContent(comment.issue_url);
        const match = postContent.body.match(/\[(https?:\/\/[^\]]+)\]/);
        const extractedUrl = match ? match[1] : null;

        return {
          id: comment.id,
          title: formatTitle(postContent.title), // ✅ 디코딩 후 "post/" 제거
          body: comment.body,
          user: comment.user.login,
          avatar: comment.user.avatar_url,
          url: comment.html_url,
          postUrl: extractedUrl,
          createdAt: new Date(comment.created_at).toLocaleString(),
        };
      }),
    );

    return commentsWithPostContent;
  } catch (error) {
    console.error("❌ 최근 댓글을 가져오는 중 오류 발생:", error);
    return [];
  }
}

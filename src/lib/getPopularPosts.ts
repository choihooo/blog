import { supabase } from "./supabaseClient";

// 변화율을 기준으로 인기 글을 선정하는 함수
export async function getPopularPostsByChangeRate() {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24시간 전
  const formattedTime = twentyFourHoursAgo.toISOString();

  // 최근 24시간 동안 조회된 글 가져오기
  const { data, error } = await supabase
    .from("views")
    .select("slug, count, last_updated")
    .gte("last_updated", formattedTime) // 최근 24시간 데이터를 가져옴
    .order("count", { ascending: false }); // 조회수 높은 순으로 정렬

  if (error) {
    console.error("인기 글 조회 실패:", error);
    return [];
  }

  // 만약 최근 24시간 이내의 글이 없다면, 전체 조회수 순으로 인기 글을 가져옴
  if (data.length === 0) {
    const { data: allData, error: allDataError } = await supabase
      .from("views")
      .select("slug, count")
      .order("count", { ascending: false }); // 전체 글에서 조회수 높은 순으로 정렬

    if (allDataError) {
      console.error("전체 인기 글 조회 실패:", allDataError);
      return [];
    }

    // 최대 3개만 반환
    return allData.slice(0, 3).map((post) => ({
      title: post.slug, // slug를 title로 변환
      url: `/post/${post.slug}`, // URL을 생성
      views: post.count, // count를 views로 변환
    }));
  }

  // 최근 24시간 내 데이터가 있을 경우 최대 3개만 반환
  return data.slice(0, 3).map((post) => ({
    title: post.slug, // slug를 title로 변환
    url: `/post/${post.slug}`, // URL을 생성
    views: post.count, // count를 views로 변환
  }));
}

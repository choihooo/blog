import { supabase } from "./supabaseClient";

export async function increaseViewCount(slug: string) {
  try {
    const now = new Date().getTime();

    // 로컬스토리지에서 마지막 조회 기록 가져오기
    const lastViewed = localStorage.getItem(`viewed_${slug}`);

    // 24시간 내 조회했으면 조회수 증가 안 함
    if (lastViewed && now - parseInt(lastViewed, 10) < 24 * 60 * 60 * 1000) {
      console.log("최근 24시간 내 조회됨, 조회수 증가 안 함");
      return;
    }

    // 조회수 가져오기
    const { data, error } = await supabase
      .from("views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error("조회수 가져오기 실패: " + error.message);
    }

    const newCount = (data?.count || 0) + 1;

    // 조회수 업데이트 또는 삽입
    const { error: upsertError } = await supabase
      .from("views")
      .upsert([{ slug, count: newCount }], { onConflict: "slug" });

    if (upsertError) {
      throw new Error("조회수 업데이트 실패: " + upsertError.message);
    }

    // 조회 기록을 로컬스토리지에 저장 (현재 시간 기록)
    localStorage.setItem(`viewed_${slug}`, now.toString());

    console.log("조회수 업데이트 성공:", newCount);
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

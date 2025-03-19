import { supabase } from "./supabaseClient";

export async function increaseViewCount(slug: string) {
  try {
    // 조회수 가져오기
    const { data, error } = await supabase
      .from("views")
      .select("count, last_updated")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw new Error("조회수 가져오기 실패: " + error.message);
    }

    const newCount = (data?.count || 0) + 1;
    const lastUpdated = new Date().toISOString(); // 현재 시간을 타임스탬프 형식으로 설정

    // 조회수 업데이트 또는 삽입
    const { data: upsertData, error: upsertError } = await supabase
      .from("views")
      .upsert([{ slug, count: newCount, last_updated: lastUpdated }], {
        onConflict: "slug",
      });

    if (upsertError) {
      throw new Error("조회수 업데이트 실패: " + upsertError.message);
    }

    console.log("조회수 업데이트 성공:", upsertData);
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

import { Skeleton } from "@/components/ui/skeleton";

export const PostItem = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="group max-w-[700px] cursor-pointer">
      <div className="flex">
        <div className="mr-5 flex max-w-[501px] flex-col gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-[16px] w-[200px]" /> {/* 제목 로딩 */}
              <div>
                <Skeleton className="mb-2 h-[13px] w-[500px]" />{" "}
                <Skeleton className="mb-2 h-[13px] w-[500px]" />{" "}
                <Skeleton className="h-[13px] w-[300px]" />{" "}
              </div>
              {/* 본문 내용 로딩 */}
              <Skeleton className="h-[12px] w-[94px]" /> {/* 날짜 로딩 */}
            </>
          ) : (
            <>
              <div className="text-[16px] group-hover:text-blue-500">
                무엇이든 물어보세요
              </div>
              <div className="text-[13px]">
                모닥불 10화 특집: 캠프파이어 에피소드 🔥 이번 모닥불은 특별히
                시청자 여러분과 함께하는 시간으로 준비했어요. 사전에 접수된
                시청자 여러분의 다양한 사연과 질문 그리고 코드 리뷰까지! 지금
                바로 확인해보세요!
              </div>
              <div className="text-[12px]">2025월 2월 17일</div>
            </>
          )}
        </div>
        <div className="h-[90px] w-[130px] overflow-hidden rounded-xl">
          {isLoading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <img
              src="https://avatars.githubusercontent.com/u/67588757?s=400&u=2c601651c1112a2b62e8d26523319c1dcdc23623&v=4"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt="Post Thumbnail "
            />
          )}
        </div>
      </div>
    </div>
  );
};

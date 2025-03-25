import Link from "next/link";
import Image from "next/image";

interface SeriesItemProps {
  series: {
    name: string;
    count: number;
    latestDate: string;
    thumbnail: string;
  };
}

export const SeriesItem = ({ series }: SeriesItemProps) => {
  return (
    <div className="max-w-[330px]">
      <Link
        href={`/search/${encodeURIComponent(series.name)}`}
        className="block h-full w-[330px]"
      >
        <div className="relative aspect-video w-full">
          <Image
            src={series.thumbnail}
            alt={series.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="mt-2 text-xl font-semibold">{series.name}</div>
        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
          <div className="font-semibold">{series.count}개의 포스트</div>
          <div className="font-[300]">마지막 업데이트 {series.latestDate}</div>
        </div>
      </Link>
    </div>
  );
}; 
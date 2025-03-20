import { Link } from "react-router-dom";

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
        to={`/search/${encodeURIComponent(series.name)}`}
        className="block h-full w-[330px]"
      >
        <div>
          <img
            src={series.thumbnail}
            alt={series.name}
            className="w-full rounded-md object-cover"
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

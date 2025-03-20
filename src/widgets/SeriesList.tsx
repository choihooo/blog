import { SeriesItem } from "@/shared/ui/SeriesItem";
import { SeriesListType } from "@/types";

interface SeriesListProps {
  series: SeriesListType[];
  isLoading: boolean;
}

export const SeriesList = ({ series, isLoading }: SeriesListProps) => {
  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-[700px] w-full flex flex-wrap gap-10">
      {series.map((item) => (
        <SeriesItem key={item.name} series={item} />
      ))}
    </div>
  );
};

import { SeriesItem } from "@/components/SeriesItem";
import { SeriesListType } from "@/types/types.d";

interface SeriesListProps {
  series: SeriesListType[];
}

export const SeriesList = ({ series }: SeriesListProps) => {
  return (
    <div className="max-w-[700px] w-full flex flex-wrap gap-10">
      {series.map((item) => (
        <SeriesItem key={item.name} series={item} />
      ))}
    </div>
  );
}; 
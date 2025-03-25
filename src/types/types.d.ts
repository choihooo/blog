export interface PostListType {
  title: string;
  date: string;
  excerpt: string;
  thumbnail: string;
  tags: string[];
  series: string;
}

export interface SeriesListType {
  name: string;
  count: number;
  latestDate: string;
  thumbnail: string;
}

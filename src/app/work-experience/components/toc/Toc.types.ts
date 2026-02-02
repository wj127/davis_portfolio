export type TimelineItem = {
  year: number;
  content?: {
    title: string;
    description: string;
  };
};

export type TocProps = {
  years?: number[];
  activeIndex?: number;
};

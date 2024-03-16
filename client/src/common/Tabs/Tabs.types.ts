interface ITab {
  name: string;
  value: string;
}

export interface ITabsProps {
  data: ITab[];
  value: string;
  setTab: (a: string) => void;
}

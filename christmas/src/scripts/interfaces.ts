export interface IToy {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface ICard extends IToy {
  isChosen: boolean;
  isShow: boolean;
}

export interface IRange extends Record<string, number> {
  min: number;
  max: number;
}

export interface ISliderOptions {
  start: number[];
  connect: boolean;
  step: number;
  range: IRange;
}

export interface IFiltersByValue {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
}

export interface IFiltersByRange {
  count: IRange;
  year: IRange;
}

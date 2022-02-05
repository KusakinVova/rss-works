export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnerTime {
  wins: number;
  time: number;
}

export interface IWinnerData {
  id: number;
  name: string | null;
  time: number;
}

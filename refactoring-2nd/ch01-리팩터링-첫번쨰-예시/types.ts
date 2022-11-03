export type Plays = {
  [k:string]: Play;
};

export type Invoice = {
  customer: string;
  performances: PlayPerformance[];
};

export type StatementData = {
  customer: Invoice['customer'];
  performances: EnrichPlayPerformance[];
  totalVolumeCredits?: number;
  totalAmount?: number;
};

export type Play = {
  name: string;
  type: string;
};

export type PlayPerformance = {
  playID: string;
  audience: number;
};

export type EnrichPlayPerformance = PlayPerformance & {
  play: Play;
  amount?: number;
  volumeCredits?: number;
};

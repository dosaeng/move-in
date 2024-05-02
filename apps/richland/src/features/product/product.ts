export interface ProductUsage {
  id: number;
  name: string;
  count?: number;
}

export interface ProductAddress {
  id: string;
  levelOneName: string;
  levelTwoName?: string;
  levelThreeName?: string;
  level: number;
  count?: number;
}

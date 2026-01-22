// Task 3: Odds History Types

export interface OddsHistory {
  id: number;
  game_id: string;
  bookmaker_key: string;
  outcome_name: string;
  outcome_price: number;
  snapshot_time: Date;
  created_at: Date;
}

export interface OddsHistoryQuery {
  bookmaker_key?: string;
  limit?: number;
}

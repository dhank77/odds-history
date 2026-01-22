export interface Sport {
  key: string;
  title: string;
  description?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Game {
  id: string;
  sport_key: string;
  commence_time: Date;
  home_team: string;
  away_team: string;
  created_at: Date;
  updated_at: Date;
}

export interface Bookmaker {
  key: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

export interface Market {
  key: string;
  title: string;
  description?: string;
  created_at: Date;
}

export interface Odds {
  id: number;
  game_id: string;
  bookmaker_key: string;
  market_key: string;
  outcome_name: string;
  outcome_price: number;
  last_update: Date;
  created_at: Date;
  updated_at: Date;
}

export interface GameWithOdds extends Game {
  odds: Odds[];
}

export interface GameWithDetails extends Game {
  sport?: Sport;
  odds: Array<Odds & { bookmaker?: Bookmaker; market?: Market }>;
}

// Task 2: Favorites Types

export interface UserFavorite {
  id: number;
  user_id: string;
  game_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface FavoriteWithGame {
  game_id: string;
  home_team: string;
  away_team: string;
  sport_key: string;
  commence_time: Date;
  created_at: Date;
}

export interface AddFavoriteRequest {
  game_id: string;
}

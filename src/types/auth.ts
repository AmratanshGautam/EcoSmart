export interface AuthUser {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  token_balance: number;
  created_at: string;
}
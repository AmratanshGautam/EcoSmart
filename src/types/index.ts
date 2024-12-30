export interface User {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  token_balance: number;
  created_at: string;
}

export interface GarbageReport {
  id: string;
  user_id: string;
  image_url: string;
  description: string;
  latitude: number;
  longitude: number;
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  tokens_earned: number;
  created_at: string;
}

export interface Heritage {
  id: string;
  name: string;
  description: string;
  image_url: string;
  latitude: number;
  longitude: number;
  average_rating: number;
}
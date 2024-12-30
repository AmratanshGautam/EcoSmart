export interface HeritageSite {
  id: string;
  name: string;
  description: string;
  image_url: string;
  location: {
    latitude: number;
    longitude: number;
  };
  average_rating: number;
}

export interface HeritageRating {
  id: string;
  user_id: string;
  site_id: string;
  rating: number;
  created_at: string;
}
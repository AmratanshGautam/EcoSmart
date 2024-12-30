export interface GarbageReport {
  id: string;
  user_id: string;
  image_url: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
  status: ReportStatus;
  tokens_earned: number;
  created_at: string;
}

export type ReportStatus = 'pending' | 'verified' | 'resolved' | 'rejected';
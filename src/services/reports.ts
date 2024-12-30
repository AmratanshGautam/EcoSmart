import supabase from '../lib/supabase';
import { GarbageReport } from '../types/reports';

export async function createReport(
  userId: string,
  imageUrl: string,
  description: string,
  latitude: number,
  longitude: number
): Promise<GarbageReport> {
  const { data, error } = await supabase
    .from('garbage_reports')
    .insert({
      user_id: userId,
      image_url: imageUrl,
      description,
      latitude,
      longitude,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function getUserReports(userId: string): Promise<GarbageReport[]> {
  const { data, error } = await supabase
    .from('garbage_reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
}
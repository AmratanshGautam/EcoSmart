import supabase from '../lib/supabase';
import { HeritageSite, HeritageRating } from '../types/heritage';

export async function getHeritageSites(): Promise<HeritageSite[]> {
  const { data, error } = await supabase
    .from('heritage_sites')
    .select('*')
    .order('name');
    
  if (error) throw error;
  return data;
}

export async function rateHeritageSite(
  userId: string,
  siteId: string,
  rating: number
): Promise<HeritageRating> {
  const { data, error } = await supabase
    .from('heritage_ratings')
    .insert({
      user_id: userId,
      site_id: siteId,
      rating,
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}
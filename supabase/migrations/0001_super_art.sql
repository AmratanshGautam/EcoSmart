/*
  # Initial Schema Setup for EcoSmart App

  1. New Tables
    - users
      - Custom user data including token balance
    - garbage_reports
      - Stores all garbage reports with location and status
    - heritage_sites
      - Cultural landmarks and eco-friendly spaces
    - heritage_ratings
      - User ratings for heritage sites
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table extension
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  username text UNIQUE NOT NULL,
  avatar_url text,
  token_balance integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Garbage reports table
CREATE TABLE IF NOT EXISTS public.garbage_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  image_url text NOT NULL,
  description text,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  status text DEFAULT 'pending',
  tokens_earned integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Heritage sites table
CREATE TABLE IF NOT EXISTS public.heritage_sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  average_rating double precision DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Heritage ratings table
CREATE TABLE IF NOT EXISTS public.heritage_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  site_id uuid REFERENCES heritage_sites NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, site_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.garbage_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage_ratings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Garbage reports policies
CREATE POLICY "Users can view all reports"
  ON public.garbage_reports
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reports"
  ON public.garbage_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON public.garbage_reports
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Heritage sites policies
CREATE POLICY "Anyone can view heritage sites"
  ON public.heritage_sites
  FOR SELECT
  TO authenticated
  USING (true);

-- Heritage ratings policies
CREATE POLICY "Users can view all ratings"
  ON public.heritage_ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can rate once per site"
  ON public.heritage_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update average rating
CREATE OR REPLACE FUNCTION update_heritage_site_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE heritage_sites
  SET average_rating = (
    SELECT AVG(rating)
    FROM heritage_ratings
    WHERE site_id = NEW.site_id
  )
  WHERE id = NEW.site_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating average rating
CREATE TRIGGER update_heritage_rating
AFTER INSERT OR UPDATE ON heritage_ratings
FOR EACH ROW
EXECUTE FUNCTION update_heritage_site_rating();
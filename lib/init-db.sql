/*
  # Create The Great Run Database Schema

  1. New Tables
    - `editions`
      - `id` (uuid, primary key)
      - `title` (text) - Edition title
      - `excerpt` (text) - Short description
      - `content` (text) - Full rich-text content
      - `featured_image` (text) - Cloudinary URL
      - `gallery_images` (jsonb) - Array of Cloudinary URLs
      - `slug` (text, unique) - URL-friendly identifier
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `sponsors`
      - `id` (uuid, primary key)
      - `name` (text) - Sponsor name
      - `logo_url` (text) - Cloudinary URL for logo
      - `website` (text) - Sponsor website
      - `display_order` (integer) - Order for display
      - `created_at` (timestamptz) - Creation timestamp

    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text) - Contact name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `message` (text) - Contact message
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on all tables
    - Public read access for editions and sponsors
    - Authenticated access for contact submissions
*/

CREATE TABLE IF NOT EXISTS editions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  featured_image text DEFAULT '',
  gallery_images jsonb DEFAULT '[]'::jsonb,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE editions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view editions"
  ON editions
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert editions"
  ON editions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update editions"
  ON editions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete editions"
  ON editions
  FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text DEFAULT '',
  website text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sponsors"
  ON sponsors
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert sponsors"
  ON sponsors
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sponsors"
  ON sponsors
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sponsors"
  ON sponsors
  FOR DELETE
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_editions_created_at ON editions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_editions_slug ON editions(slug);
CREATE INDEX IF NOT EXISTS idx_sponsors_display_order ON sponsors(display_order);

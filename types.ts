export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  author: string;
  date: string;
  slug: string;
}

export interface Edition {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  slug: string;
  location: string;
  summary: string;
  distance_km: number;
  hero_image_url: string;
  featured: boolean;
}

export interface Sponsor {
  id: string;
  name: string;
  website: string;
  logo_url: string;
}

export interface Gallery {
  id: string;
  title: string;
  edition_id: string;
  images: string[];
}

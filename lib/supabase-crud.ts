
import { supabase } from '@/lib/supabase';
import { BlogPost, Edition, Sponsor, Gallery } from '../types';

// Blog Posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase.from('blog_posts').select('*');
  if (error) throw error;
  return data as BlogPost[];
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (error) throw error;
  return data as BlogPost;
};

export const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const { data, error } = await supabase.from('blog_posts').insert(post).select();
  if (error) throw error;
  return data[0];
};

export const updateBlogPost = async (id: string, post: Partial<Omit<BlogPost, 'id'>>) => {
  const { data, error } = await supabase.from('blog_posts').update(post).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteBlogPost = async (id: string) => {
  const { data, error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Editions
export const getEditions = async (): Promise<Edition[]> => {
  const { data, error } = await supabase.from('editions').select('*');
  if (error) throw error;
  return data as Edition[];
};

export const getEdition = async (id: string): Promise<Edition> => {
  const { data, error } = await supabase.from('editions').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Edition;
};

export const addEdition = async (edition: Omit<Edition, 'id'>) => {
  const { data, error } = await supabase.from('editions').insert(edition).select();
  if (error) throw error;
  return data[0];
};

export const updateEdition = async (id: string, edition: Partial<Omit<Edition, 'id'>>) => {
  const { data, error } = await supabase.from('editions').update(edition).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteEdition = async (id: string) => {
  const { data, error } = await supabase.from('editions').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Sponsors
export const getSponsors = async (): Promise<Sponsor[]> => {
  const { data, error } = await supabase.from('sponsors').select('*');
  if (error) throw error;
  return data as Sponsor[];
};

export const getSponsor = async (id: string): Promise<Sponsor> => {
  const { data, error } = await supabase.from('sponsors').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Sponsor;
};

export const addSponsor = async (sponsor: Omit<Sponsor, 'id'>) => {
  const { data, error } = await supabase.from('sponsors').insert(sponsor).select();
  if (error) throw error;
  return data[0];
};

export const updateSponsor = async (id: string, sponsor: Partial<Omit<Sponsor, 'id'>>) => {
  const { data, error } = await supabase.from('sponsors').update(sponsor).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteSponsor = async (id: string) => {
  const { data, error } = await supabase.from('sponsors').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Galleries
export const getGalleries = async (): Promise<Gallery[]> => {
  const { data, error } = await supabase.from('galleries').select('*');
  if (error) throw error;
  return data as Gallery[];
};

export const getGallery = async (id: string): Promise<Gallery> => {
  const { data, error } = await supabase.from('galleries').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Gallery;
};

export const addGallery = async (gallery: Omit<Gallery, 'id'>) => {
  const { data, error } = await supabase.from('galleries').insert(gallery).select();
  if (error) throw error;
  return data[0];
};

export const updateGallery = async (id: string, gallery: Partial<Omit<Gallery, 'id'>>) => {
  const { data, error } = await supabase.from('galleries').update(gallery).eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteGallery = async (id: string) => {
  const { data, error } = await supabase.from('galleries').delete().eq('id', id);
  if (error) throw error;
  return data;
};

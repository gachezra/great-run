import { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Assuming you have a firebase config file
import { BlogPost, Edition, Sponsor, Gallery } from '../types';

// Blog Posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const q = query(collection(db, 'blogPosts'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BlogPost));
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const docRef = doc(db, 'blogPosts', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Blog post not found');
  }
  return { id: docSnap.id, ...docSnap.data() } as BlogPost;
};

export const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const docRef = await addDoc(collection(db, 'blogPosts'), post);
  return docRef.id;
};

export const updateBlogPost = async (id: string, post: Partial<Omit<BlogPost, 'id'>>) => {
  const docRef = doc(db, 'blogPosts', id);
  await updateDoc(docRef, post);
};

export const deleteBlogPost = async (id: string) => {
  const docRef = doc(db, 'blogPosts', id);
  await deleteDoc(docRef);
};

// Editions
export const getEditions = async (): Promise<Edition[]> => {
  const q = query(collection(db, 'editions'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Edition));
};

export const getEdition = async (id: string): Promise<Edition> => {
  const docRef = doc(db, 'editions', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Edition not found');
  }
  return { id: docSnap.id, ...docSnap.data() } as Edition;
};

export const addEdition = async (edition: Omit<Edition, 'id'>) => {
  const docRef = await addDoc(collection(db, 'editions'), edition);
  return docRef.id;
};

export const updateEdition = async (id: string, edition: Partial<Omit<Edition, 'id'>>) => {
  const docRef = doc(db, 'editions', id);
  await updateDoc(docRef, edition);
};

export const deleteEdition = async (id: string) => {
  const docRef = doc(db, 'editions', id);
  await deleteDoc(docRef);
};

// Sponsors
export const getSponsors = async (): Promise<Sponsor[]> => {
  const q = query(collection(db, 'sponsors'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Sponsor));
};

export const getSponsor = async (id: string): Promise<Sponsor> => {
  const docRef = doc(db, 'sponsors', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Sponsor not found');
  }
  return { id: docSnap.id, ...docSnap.data() } as Sponsor;
};

export const addSponsor = async (sponsor: Omit<Sponsor, 'id'>) => {
  const docRef = await addDoc(collection(db, 'sponsors'), sponsor);
  return docRef.id;
};

export const updateSponsor = async (id: string, sponsor: Partial<Omit<Sponsor, 'id'>>) => {
  const docRef = doc(db, 'sponsors', id);
  await updateDoc(docRef, sponsor);
};

export const deleteSponsor = async (id: string) => {
  const docRef = doc(db, 'sponsors', id);
  await deleteDoc(docRef);
};

// Galleries
export const getGalleries = async (): Promise<Gallery[]> => {
  const q = query(collection(db, 'galleries'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Gallery));
};

export const getGallery = async (id: string): Promise<Gallery> => {
  const docRef = doc(db, 'galleries', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Gallery not found');
  }
  return { id: docSnap.id, ...docSnap.data() } as Gallery;
};

export const addGallery = async (gallery: Omit<Gallery, 'id'>) => {
  const docRef = await addDoc(collection(db, 'galleries'), gallery);
  return docRef.id;
};

export const updateGallery = async (id: string, gallery: Partial<Omit<Gallery, 'id'>>) => {
  const docRef = doc(db, 'galleries', id);
  await updateDoc(docRef, gallery);
};

export const deleteGallery = async (id: string) => {
  const docRef = doc(db, 'galleries', id);
  await deleteDoc(docRef);
};

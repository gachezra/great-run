'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addEdition } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { Edition } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function NewEditionPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [distanceKm, setDistanceKm] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isHero: boolean) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        if (isHero) {
          setHeroImageUrl(url);
        } else {
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEdition: Omit<Edition, 'id'> = {
        title,
        date,
        location,
        description,
        summary,
        distance_km: distanceKm,
        image_url: imageUrl,
        hero_image_url: heroImageUrl,
        featured,
        slug: title.toLowerCase().replace(/ /g, '-'),
      };
      await addEdition(newEdition);
      router.push('/admin/editions');
    } catch (error) {
      console.error('Failed to add edition:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">New Edition</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="number"
          placeholder="Distance (km)"
          value={distanceKm}
          onChange={(e) => setDistanceKm(Number(e.target.value))}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <div className="text-white">
          <label>Card Image</label>
          <Input
            type="file"
            onChange={(e) => handleImageUpload(e, false)}
            accept="image/*"
            className="bg-gray-700 border-gray-600 rounded-lg text-white mt-2"
          />
          {uploading && <p className="text-gray-400">Uploading...</p>}
          {imageUrl && <img src={imageUrl} alt="Uploaded image" className="max-w-xs rounded-lg mt-2" />}
        </div>
        <div className="text-white">
          <label>Hero Image</label>
          <Input
            type="file"
            onChange={(e) => handleImageUpload(e, true)}
            accept="image/*"
            className="bg-gray-700 border-gray-600 rounded-lg text-white mt-2"
          />
          {uploading && <p className="text-gray-400">Uploading...</p>}
          {heroImageUrl && <img src={heroImageUrl} alt="Uploaded image" className="max-w-xs rounded-lg mt-2" />}
        </div>
        <div className="flex items-center space-x-2 text-white">
          <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(Boolean(checked))} />
          <label htmlFor="featured">Featured</label>
        </div>
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Create Edition</Button>
      </form>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addSponsor } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { Sponsor } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewSponsorPage() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        setLogoUrl(url);
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
      const newSponsor: Omit<Sponsor, 'id'> = {
        name,
        website,
        logo_url: logoUrl,
      };
      await addSponsor(newSponsor);
      router.push('/admin/sponsors');
    } catch (error) {
      console.error('Failed to add sponsor:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">New Sponsor</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="url"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          className="bg-gray-700 border-gray-600 rounded-lg text-white"
        />
        {uploading && <p className="text-gray-400">Uploading...</p>}
        {logoUrl && <img src={logoUrl} alt="Uploaded image" className="max-w-xs rounded-lg" />}
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Create Sponsor</Button>
      </form>
    </div>
  );
}

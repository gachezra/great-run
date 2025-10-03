'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getSponsor, updateSponsor } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { Sponsor } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EditSponsorPage() {
  const [sponsor, setSponsor] = useState<Sponsor | null>(null);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadSponsor = async () => {
        try {
          const data = await getSponsor(id as string);
          setSponsor(data);
          setName(data.name);
          setWebsite(data.website);
          setLogoUrl(data.logo_url);
        } catch (error) {
          console.error('Failed to load sponsor:', error);
        }
      };
      loadSponsor();
    }
  }, [id]);

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
    if (!sponsor) return;

    try {
      const updatedSponsor: Partial<Omit<Sponsor, 'id'>> = {
        name,
        website,
        logo_url: logoUrl,
      };
      await updateSponsor(sponsor.id, updatedSponsor);
      router.push('/admin/sponsors');
    } catch (error) {
      console.error('Failed to update sponsor:', error);
    }
  };

  if (!sponsor) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Sponsor</h1>
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
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Update Sponsor</Button>
      </form>
    </div>
  );
}

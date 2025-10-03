'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getEditions, getGallery, updateGallery } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { Edition, Gallery } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export default function EditGalleryPage() {
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [title, setTitle] = useState('');
  const [editionId, setEditionId] = useState('');
  const [editions, setEditions] = useState<Edition[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const loadEditions = async () => {
      try {
        const data = await getEditions();
        setEditions(data);
      } catch (error) {
        console.error('Failed to load editions:', error);
      }
    };
    loadEditions();
  }, []);

  useEffect(() => {
    if (id) {
      const loadGallery = async () => {
        try {
          const data = await getGallery(id as string);
          setGallery(data);
          setTitle(data.title);
          setEditionId(data.edition_id);
          setImages(data.images);
        } catch (error) {
          console.error('Failed to load gallery:', error);
        }
      };
      loadGallery();
    }
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploading(true);
      try {
        const urls = await Promise.all(
          Array.from(e.target.files).map((file) => uploadImage(file))
        );
        setImages([...images, ...urls]);
      } catch (error) {
        console.error('Failed to upload images:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gallery) return;

    try {
      const updatedGallery: Partial<Omit<Gallery, 'id'>> = {
        title,
        edition_id: editionId,
        images,
      };
      await updateGallery(gallery.id, updatedGallery);
      router.push('/admin/galleries');
    } catch (error) {
      console.error('Failed to update gallery:', error);
    }
  };

  if (!gallery) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Gallery</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Select onValueChange={setEditionId} value={editionId}>
          <SelectTrigger className="bg-gray-700 border-gray-600 rounded-lg text-white">
            <SelectValue placeholder="Select Edition" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white border-gray-600">
            {editions.map((edition) => (
              <SelectItem key={edition.id} value={edition.id} className="hover:bg-gray-600">
                {edition.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="file"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
          className="bg-gray-700 border-gray-600 rounded-lg text-white"
        />
        {uploading && <p className="text-gray-400">Uploading...</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`Uploaded image ${index + 1}`} className="w-full h-auto rounded-lg" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 bg-red-500/80 hover:bg-red-500"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Update Gallery</Button>
      </form>
    </div>
  );
}

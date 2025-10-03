'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addBlogPost } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth-context';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        setImageUrl(url);
      } catch (error) {
        console.error('Failed to upload image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const newPost: Omit<BlogPost, 'id'> = {
        title,
        content,
        image_url: imageUrl,
        author: user.email || 'Admin',
        date: new Date().toISOString(),
        slug: title.toLowerCase().replace(/ /g, '-'),
      };
      await addBlogPost(newPost);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Failed to add blog post:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
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
        {imageUrl && <img src={imageUrl} alt="Uploaded image" className="max-w-xs rounded-lg" />}
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Create Post</Button>
      </form>
    </div>
  );
}

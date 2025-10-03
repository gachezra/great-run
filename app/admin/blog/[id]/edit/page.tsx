'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBlogPost, updateBlogPost } from '@/lib/supabase-crud';
import { uploadImage } from '@/lib/cloudinary';
import { BlogPost } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function EditPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        try {
          const data = await getBlogPost(id as string);
          setPost(data);
        } catch (error) {
          console.error('Failed to load blog post:', error);
        }
      };
      loadPost();
    }
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const url = await uploadImage(e.target.files[0]);
        if (post) {
          setPost({ ...post, image_url: url });
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
    if (!post) return;

    try {
      const updatedPost: Partial<Omit<BlogPost, 'id'>> = {
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        slug: post.title.toLowerCase().replace(/ /g, '-'),
      };
      await updateBlogPost(post.id, updatedPost);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Failed to update blog post:', error);
    }
  };

  if (!post) {
    return <p className="text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          placeholder="Title"
          value={post?.title || ''}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="bg-gray-700 border-gray-600 rounded-lg text-white placeholder:text-gray-400"
          required
        />
        <Textarea
          placeholder="Content"
          value={post?.content || ''}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
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
        {post.image_url && <img src={post.image_url} alt="Uploaded image" className="max-w-xs rounded-lg" />}
        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-black">Update Post</Button>
      </form>
    </div>
  );
}

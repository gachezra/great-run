
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase } from '@/lib/supabase';

interface Edition {
  id: string;
  title: string;
  content: string;
  featured_image: string;
  gallery_images: string[];
  created_at: string;
}

export default function EditionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchEdition();
    }
  }, [slug]);

  async function fetchEdition() {
    setLoading(true);
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (data) {
      setEdition(data);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!edition) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Edition Not Found</h1>
          <Link href="/editions" className="text-blue-400 hover:text-blue-300">
            Back to Editions
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = Array.isArray(edition.gallery_images)
    ? edition.gallery_images
    : JSON.parse(edition.gallery_images || '[]');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/editions"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Editions</span>
          </Link>

          <div className="relative h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden mb-8">
            <Image
              src={edition.featured_image}
              alt={edition.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                {edition.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} />
                  <span>{new Date(edition.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-3xl p-8 md:p-12 mb-12">
              <div
                className="prose prose-invert prose-lg md:prose-xl max-w-none prose-p:text-white prose-headings:text-white"
                dangerouslySetInnerHTML={{ __html: edition.content }}
              />
            </div>

            {galleryImages.length > 0 && (
              <AnimatedSection delay={0.3}>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  {galleryImages.map((image: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative h-64 sm:h-80 rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

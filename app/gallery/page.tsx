'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase } from '@/lib/supabase';

interface Edition {
  id: string;
  title: string;
  gallery_images: string[];
}

export default function GalleryPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditions();
  }, []);

  async function fetchEditions() {
    setLoading(true);
    const { data, error } = await supabase
      .from('editions')
      .select('id, title, gallery_images')
      .order('created_at', { ascending: false });

    if (data) {
      setEditions(data);
    }
    setLoading(false);
  }

  const allImages = editions.flatMap((edition) => {
    const images = Array.isArray(edition.gallery_images)
      ? edition.gallery_images
      : JSON.parse(edition.gallery_images || '[]');
    return images.map((img: string) => ({ image: img, edition: edition.title }));
  });

  const filteredImages =
    selectedEdition === 'all'
      ? allImages
      : allImages.filter((item) => item.edition === selectedEdition);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Relive the unforgettable moments from our driving adventures
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedEdition('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedEdition === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                : 'glass-effect text-white hover:border-blue-500/50'
            }`}
          >
            All
          </motion.button>
          {editions.map((edition) => (
            <motion.button
              key={edition.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedEdition(edition.title)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedEdition === edition.title
                  ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                  : 'glass-effect text-white hover:border-blue-500/50'
              }`}
            >
              {edition.title}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.edition}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg">{item.edition}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No images found for this edition.</p>
          </div>
        )}
      </div>
    </div>
  );
}

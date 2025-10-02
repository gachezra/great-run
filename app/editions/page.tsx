'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EditionCard from '@/components/EditionCard';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase } from '@/lib/supabase';

interface Edition {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
  created_at: string;
}

export default function EditionsPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditions();
  }, []);

  async function fetchEditions() {
    setLoading(true);
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setEditions(data);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Editions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore the incredible journeys we&apos;ve undertaken, the landscapes we&apos;ve traversed, and the causes we&apos;ve supported.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {editions.map((edition, index) => (
                <EditionCard
                  key={edition.id}
                  title={edition.title}
                  excerpt={edition.excerpt}
                  featuredImage={edition.featured_image}
                  slug={edition.slug}
                  index={index}
                />
              ))}
            </div>
          </AnimatedSection>
        )}

        {!loading && editions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No editions found. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

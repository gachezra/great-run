'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase } from '@/lib/supabase';
import { ExternalLink } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website: string;
  display_order: number;
}

export default function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSponsors();
  }, []);

  async function fetchSponsors() {
    setLoading(true);
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) {
      setSponsors(data);
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
            Our Valued{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Partners
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our events are made possible by the generous support of our sponsors. These organizations share our commitment to excellence and community impact.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatedSection>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-effect rounded-2xl p-8 flex flex-col items-center justify-center min-h-[250px] group"
                >
                  <div className="relative w-full h-32 mb-6">
                    <Image
                      src={sponsor.logo_url}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {sponsor.name}
                  </h3>
                  {sponsor.website && (
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {!loading && sponsors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No sponsors yet. Interested in partnering with us?</p>
          </div>
        )}

        <AnimatedSection delay={0.6} className="mt-20">
          <div className="glass-effect rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Become a Partner</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join us in making a difference. Partner with The Great Run and help us support meaningful causes while connecting with passionate automotive enthusiasts.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-blue-500/50"
            >
              Get in Touch
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

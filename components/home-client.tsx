'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, DollarSign } from 'lucide-react';
import dynamic from 'next/dynamic';
import EditionCard from '@/components/EditionCard';
import AnimatedSection from '@/components/AnimatedSection';
import { supabase } from '@/lib/supabase';

const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

interface Edition {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
}

interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website: string;
}

export default function HomeClient() {
  const [latestEditions, setLatestEditions] = useState<Edition[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    fetchLatestEditions();
    fetchSponsors();
  }, []);

  async function fetchLatestEditions() {
    const { data, error } = await supabase
      .from('editions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) {
      setLatestEditions(data);
    }
  }

  async function fetchSponsors() {
    const { data, error } = await supabase
      .from('sponsors')
      .select('*')
      .order('display_order', { ascending: true });

    if (data) {
      setSponsors(data);
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Experience the Drive.{' '}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Fuel the Cause.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Join a community of passionate drivers on epic journeys across scenic landscapes, all while making a difference.
              </p>
              <Link href="/editions">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow"
                >
                  <span>Explore the Next Event</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/4e5f5c3d-8b0e-4a5a-9e5a-8f3d4c5e6f7a/8K9L0M1N2O.json"
                  style={{ height: '400px', width: '100%' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      <AnimatedSection className="py-24 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Passion for Driving</h3>
              <p className="text-gray-400">
                Experience the thrill of the open road with fellow automotive enthusiasts
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Community Impact</h3>
              <p className="text-gray-400">
                Join a movement that brings together drivers to support meaningful causes
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Charitable Giving</h3>
              <p className="text-gray-400">
                Every kilometer traveled helps support local communities and charities
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={0.3}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Petrol Heads with a Cause!
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                The Great Run isn&apos;t just a road trip; it&apos;s a mission. Founded in 2010, we bring together automotive enthusiasts for unforgettable mid to long-distance driving events. Every kilometer traveled helps support local community projects and charities. We are proud to be &quot;Petrol Heads with a Cause!&quot;
              </p>
              <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                Since our first event, we&apos;ve explored thousands of kilometers and raised over $200,000 for various causes, including children&apos;s education, wildlife conservation, and healthcare initiatives.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest Editions</h2>
            <p className="text-xl text-gray-400">
              Explore our most recent driving adventures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {latestEditions.map((edition, index) => (
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

          <div className="text-center mt-12">
            <Link href="/editions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:border-blue-500/50 transition-all"
              >
                <span>View All Editions</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Valued Partners</h2>
            <p className="text-xl text-gray-400">
              Supporting our mission to make a difference
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {sponsors.map((sponsor) => (
              <motion.a
                key={sponsor.id}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="glass-effect rounded-xl p-6 flex items-center justify-center min-h-[120px] hover:border-blue-500/50 transition-all"
              >
                <Image
                  src={sponsor.logo_url}
                  alt={sponsor.name}
                  width={200}
                  height={100}
                  className="max-w-full h-auto"
                />
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/sponsors">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-2 mx-auto transition-colors"
              >
                <span>View All Partners</span>
                <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

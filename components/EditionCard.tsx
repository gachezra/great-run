'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface EditionCardProps {
  title: string;
  excerpt: string;
  featuredImage: string;
  slug: string;
  index?: number;
}

export default function EditionCard({ title, excerpt, featuredImage, slug, index = 0 }: EditionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={featuredImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      </div>

      <div className="p-6 relative">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{excerpt}</p>

        <Link
          href={`/editions/${slug}`}
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span className="font-medium">Read More</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="absolute top-4 right-4">
        <div className="bg-blue-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white text-sm font-semibold">Featured</span>
        </div>
      </div>
    </motion.div>
  );
}

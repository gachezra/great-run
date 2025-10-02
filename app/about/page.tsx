'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { Heart, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            More Than a Drive -{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Our Story
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Petrol Heads with a Cause
          </p>
        </motion.div>

        <AnimatedSection className="mb-20">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Journey</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Since our first event in 2010, The Great Run has been dedicated to two things: a passion for driving and a commitment to charity. What started as a small gathering of friends has grown into a premier driving event that has explored thousands of kilometers and raised over $200,000 for various causes.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Our events have supported children&apos;s education, wildlife conservation, and healthcare initiatives across multiple communities. Every edition brings together automotive enthusiasts who share a common belief: that our passion can be a powerful force for good.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our team is a group of dedicated volunteers who work tirelessly to organize unforgettable experiences. We meticulously plan routes that showcase stunning landscapes, coordinate with local charities, and ensure every participant has an incredible journey while making a meaningful impact.
                </p>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg"
                  alt="The Great Run Journey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-400" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">$200K+</h3>
              <p className="text-gray-400">Raised for Charity</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-blue-400" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">18</h3>
              <p className="text-gray-400">Editions Completed</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-400" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-400">Participants</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 text-center"
            >
              <div className="bg-blue-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-blue-400" size={40} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">15+</h3>
              <p className="text-gray-400">Charities Supported</p>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Mission</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-500/10 rounded-2xl p-6 mb-4">
                  <h3 className="text-xl font-semibold text-white mb-3">Create Experiences</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Organize unforgettable driving events that challenge and inspire, bringing together automotive enthusiasts from all backgrounds.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/10 rounded-2xl p-6 mb-4">
                  <h3 className="text-xl font-semibold text-white mb-3">Build Community</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Foster a supportive community of drivers who share a passion for the open road and a commitment to making a difference.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/10 rounded-2xl p-6 mb-4">
                  <h3 className="text-xl font-semibold text-white mb-3">Give Back</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Channel our collective passion into tangible support for worthy causes, creating lasting positive impact in communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.6} className="mt-20">
          <div className="glass-effect rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Us</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re a seasoned road warrior or new to driving events, we welcome you to join our community. Together, we can make every kilometer count.
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

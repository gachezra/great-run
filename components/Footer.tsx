import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              The Great Run
            </h3>
            <p className="text-gray-400 mb-4">
              Petrol Heads with a Cause! Join us on epic journeys across scenic landscapes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/editions" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Editions
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Sponsors
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>123 Victory Lane, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={20} className="flex-shrink-0" />
                <a href="mailto:info@thegreatrun.org" className="hover:text-blue-400 transition-colors">
                  info@thegreatrun.org
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={20} className="flex-shrink-0" />
                <a href="tel:+254700123456" className="hover:text-blue-400 transition-colors">
                  +254 700 123 456
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Our Impact</h4>
            <div className="space-y-3">
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">$200K+</p>
                <p className="text-sm text-gray-400">Raised for Charity</p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-3xl font-bold text-blue-400">18</p>
                <p className="text-sm text-gray-400">Editions Completed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} The Great Run. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

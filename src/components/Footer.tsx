import { Mail, Phone, MapPin } from 'lucide-react';
import { cities } from '../data/spaces';

export function Footer() {
  const popularCities = cities.slice(0, 6);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center text-white">
                SH
              </div>
              <span className="text-xl text-white">SPACEHAAT</span>
            </div>
            <p className="text-sm mb-4">
              India's trusted coworking and virtual office aggregator. Find your perfect workspace across major cities.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:hello@spacehaat.com" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Mail size={16} />
                hello@spacehaat.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <Phone size={16} />
                +91 123 456 7890
              </a>
            </div>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-white mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-sm">
              {popularCities.map((city) => (
                <li key={city.id}>
                  <a
                    href={`/coworking-space-in-${city.slug}`}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    Coworking Space in {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#cities" className="hover:text-indigo-400 transition-colors">
                  All Cities
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; 2024 SPACEHAAT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

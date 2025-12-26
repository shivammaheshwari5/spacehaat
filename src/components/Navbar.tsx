import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center text-white">
              SH
            </div>
            <span className="text-xl text-gray-900">SPACEHAAT</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Home
            </a>
            <a href="#cities" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Cities
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Contact
            </a>
            <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
              List Your Space
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Home
              </a>
              <a href="#cities" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Cities
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition-colors">
                How It Works
              </a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Contact
              </a>
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                List Your Space
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

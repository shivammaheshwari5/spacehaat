import { useState } from 'react';
import { CheckCircle, Search, FileText, Phone, ArrowRight, Star, MapPin } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { SpaceCard } from '../components/SpaceCard';
import { EnquiryModal } from '../components/EnquiryModal';
import { cities, spaces, Space, faqs } from '../data/spaces';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function HomePage() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | undefined>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const featuredSpaces = spaces.filter((space) => space.featured);

  const handleEnquireClick = (space: Space) => {
    setSelectedSpace(space);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
              Find Your Perfect Workspace
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Discover premium coworking spaces and virtual offices across India's top cities
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">500+</div>
              <div className="text-indigo-200 text-sm">Verified Spaces</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">11</div>
              <div className="text-indigo-200 text-sm">Major Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">10K+</div>
              <div className="text-indigo-200 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">100%</div>
              <div className="text-indigo-200 text-sm">Free Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section id="cities" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Explore Coworking Spaces by City</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect workspace in India's top business destinations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {cities.map((city) => {
              const citySpaces = spaces.filter((s) => s.city === city.name);
              return (
                <a
                  key={city.id}
                  href={`/coworking-space-in-${city.slug}`}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1629652320041-c2c555e68101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGluZGlhfGVufDF8fHx8MTc2NjE5NDM5MHww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-white mb-1">{city.name}</h3>
                      <p className="text-sm text-gray-200">{citySpaces.length} Spaces</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Featured Coworking Spaces</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium workspaces with best-in-class amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} onEnquireClick={handleEnquireClick} />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#cities"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              View All Spaces
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Why Choose SPACEHAAT?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect workspace
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-gray-900 mb-2">Verified Spaces</h3>
              <p className="text-gray-600">
                All spaces are personally verified and quality-checked by our team
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-gray-900 mb-2">Easy Comparison</h3>
              <p className="text-gray-600">
                Compare multiple spaces side-by-side to find your perfect match
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-gray-900 mb-2">Free Consultation</h3>
              <p className="text-gray-600">
                Get expert advice and personalized recommendations at no cost
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always here to help you find the right space
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your ideal workspace in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-gray-900 mb-3">Search & Browse</h3>
                <p className="text-gray-600">
                  Explore hundreds of verified coworking spaces and virtual offices across major Indian cities
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-gray-900 mb-3">Compare & Shortlist</h3>
                <p className="text-gray-600">
                  Compare amenities, pricing, and locations to find spaces that match your requirements
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-gray-900 mb-3">Enquire & Book</h3>
                <p className="text-gray-600">
                  Submit an enquiry and our team will connect you with the best offers and schedule site visits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands of businesses across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'Tech Startup Founder',
                text: 'SPACEHAAT made finding a coworking space in Bangalore incredibly easy. The team was professional and helped us get the best deal!',
              },
              {
                name: 'Priya Sharma',
                company: 'Freelance Designer',
                text: 'I needed a virtual office address in Mumbai and SPACEHAAT provided excellent options within my budget. Highly recommend!',
              },
              {
                name: 'Amit Patel',
                company: 'Marketing Agency Owner',
                text: 'The comparison feature saved us so much time. We found a perfect office in Gurugram with all the amenities we needed.',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <span className="text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaqIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Ready to Find Your Perfect Workspace?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Get free consultation and best offers from verified spaces
          </p>
          <button
            onClick={() => setEnquiryModalOpen(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:shadow-2xl transition-all text-lg inline-flex items-center gap-2"
          >
            Get Free Consultation
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        space={selectedSpace}
      />
    </div>
  );
}

import { useState } from 'react';
import { ChevronRight, MapPin, Users, IndianRupee, Wifi, Car, Coffee, Building, CheckCircle, Phone, Mail } from 'lucide-react';
import { spaces, Space, faqs } from '../data/spaces';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { SimpleCarousel } from '../components/SimpleCarousel';

interface SpaceDetailPageProps {
  spaceSlug: string;
}

export function SpaceDetailPage({ spaceSlug }: SpaceDetailPageProps) {
  const space = spaces.find((s) => s.slug === spaceSlug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    seats: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Space Not Found</h1>
          <a href="/" className="text-indigo-600 hover:text-indigo-700">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const getImageUrl = (query: string) => {
    const imageMap: Record<string, string> = {
      'coworking office': 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2MTk0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'modern workspace': 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2MTk0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'office interior': 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2MTk0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'virtual office': 'https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwb2ZmaWNlJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2NjE5NDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'private office': 'https://images.unsplash.com/photo-1746021375246-7dc8ab0583f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwZXhlY3V0aXZlJTIwb2ZmaWNlfGVufDF8fHx8MTc2NjE5NDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'business workspace': 'https://images.unsplash.com/photo-1639539420800-41be0c3a6d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjYxNjYyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'startup office': 'https://images.unsplash.com/photo-1572025442506-64f9e3525c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2MTk0MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    };
    
    return imageMap[query] || imageMap['coworking office'];
  };

  const amenityIcons: Record<string, any> = {
    'High-Speed WiFi': Wifi,
    'WiFi': Wifi,
    'Parking': Car,
    'Cafeteria': Coffee,
    'Meeting Rooms': Building,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry submitted:', { ...formData, space: space.name });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        seats: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
            <ChevronRight size={16} />
            <a
              href={`/coworking-space-in-${space.city.toLowerCase()}`}
              className="hover:text-indigo-600 transition-colors"
            >
              {space.city}
            </a>
            <ChevronRight size={16} />
            <span className="text-gray-900">{space.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <SimpleCarousel>
                {space.images.map((image, index) => (
                  <div key={index} className="relative h-96">
                    <ImageWithFallback
                      src={getImageUrl(image)}
                      alt={`${space.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </SimpleCarousel>
            </div>

            {/* Space Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-gray-900 mb-2">{space.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <span>{space.location}</span>
                  </div>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg">
                  {space.type}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 border-y border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Starting From</div>
                  <div className="flex items-center gap-1 text-2xl text-gray-900">
                    <IndianRupee size={20} />
                    {space.pricePerSeat.toLocaleString('en-IN')}
                    <span className="text-sm text-gray-500">/seat/mo</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Capacity</div>
                  <div className="flex items-center gap-2 text-xl text-gray-900">
                    <Users size={20} />
                    {space.seats} seats
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Location</div>
                  <div className="text-gray-900">{space.microMarket}</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-gray-900 mb-3">About This Space</h3>
                <p className="text-gray-600 leading-relaxed">{space.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {space.amenities.map((amenity, index) => {
                  const Icon = amenityIcons[amenity] || CheckCircle;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                        <Icon className="text-indigo-600" size={20} />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Plans */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 mb-4">Pricing Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">Hot Desk</div>
                  <div className="text-2xl text-gray-900 mb-1">
                    ₹{Math.floor(space.pricePerSeat * 0.8).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-500 mb-4">per seat/month</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Flexible seating
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Basic amenities
                    </li>
                  </ul>
                </div>
                <div className="border-2 border-indigo-600 rounded-lg p-4 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs">
                    Popular
                  </div>
                  <div className="text-sm text-gray-500 mb-2">Dedicated Desk</div>
                  <div className="text-2xl text-gray-900 mb-1">
                    ₹{space.pricePerSeat.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-500 mb-4">per seat/month</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Fixed dedicated desk
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      All amenities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Storage space
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-2">Private Cabin</div>
                  <div className="text-2xl text-gray-900 mb-1">
                    ₹{Math.floor(space.pricePerSeat * 1.5).toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-500 mb-4">per seat/month</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Private office space
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Premium amenities
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      Custom branding
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 mb-4">Location & Nearby</h3>
              <div className="mb-4">
                <div className="flex items-start gap-2 text-gray-700 mb-2">
                  <MapPin size={20} className="text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <div>{space.location}</div>
                    <div className="text-sm text-gray-500">{space.microMarket}, {space.city}</div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p>Map View</p>
                </div>
              </div>

              <div>
                <h4 className="text-gray-900 mb-3">Nearby Landmarks</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {space.nearbyLandmarks.map((landmark, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.slice(0, 4).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-2 ${
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
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Enquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-xl text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 text-sm">
                      We'll get back to you within 24 hours with the best offers.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-gray-900 mb-4">Get Best Offers</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-sm"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-sm"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-sm"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-sm"
                          placeholder="Your company"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">
                          Seats Required <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="seats"
                          value={formData.seats}
                          onChange={handleChange}
                          required
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-sm"
                          placeholder="10"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none resize-none text-sm"
                          placeholder="Your requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg hover:shadow-lg transition-all"
                      >
                        Submit Enquiry
                      </button>

                      <div className="pt-4 border-t border-gray-200 space-y-2">
                        <a
                          href="tel:+911234567890"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          <Phone size={16} />
                          +91 123 456 7890
                        </a>
                        <a
                          href="mailto:hello@spacehaat.com"
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                          <Mail size={16} />
                          hello@spacehaat.com
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
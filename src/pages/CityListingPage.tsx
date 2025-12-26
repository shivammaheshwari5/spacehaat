import { useState, useMemo } from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { SpaceCard } from '../components/SpaceCard';
import { Filters, FilterState } from '../components/Filters';
import { EnquiryModal } from '../components/EnquiryModal';
import { spaces, Space } from '../data/spaces';

interface CityListingPageProps {
  citySlug: string;
}

export function CityListingPage({ citySlug }: CityListingPageProps) {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<Space | undefined>();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    seats: '',
    spaceTypes: [],
    amenities: [],
  });

  // Get city data
  const cityName = citySlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Coworking Space In ', '');

  // Filter spaces by city
  const citySpaces = useMemo(() => {
    return spaces.filter((space) => space.city.toLowerCase() === cityName.toLowerCase());
  }, [cityName]);

  // Apply filters
  const filteredSpaces = useMemo(() => {
    return citySpaces.filter((space) => {
      // Price filter
      if (space.pricePerSeat < filters.priceRange[0] || space.pricePerSeat > filters.priceRange[1]) {
        return false;
      }

      // Seats filter
      if (filters.seats && space.seats < parseInt(filters.seats)) {
        return false;
      }

      // Space type filter
      if (filters.spaceTypes.length > 0 && !filters.spaceTypes.includes(space.type)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          space.amenities.includes(amenity)
        );
        if (!hasAllAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [citySpaces, filters]);

  const handleEnquireClick = (space: Space) => {
    setSelectedSpace(space);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </a>
            <ChevronRight size={16} />
            <span className="text-gray-900">Coworking Space in {cityName}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={24} className="text-indigo-300" />
            <h1 className="text-3xl md:text-4xl text-white">
              Coworking Space in {cityName}
            </h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-3xl">
            Discover {citySpaces.length}+ premium coworking spaces and virtual offices in {cityName}. 
            Find verified workspaces with flexible plans, modern amenities, and prime locations.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>{citySpaces.filter(s => s.type === 'Coworking').length} Coworking Spaces</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>{citySpaces.filter(s => s.type === 'Virtual Office').length} Virtual Offices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>{citySpaces.filter(s => s.type === 'Private Office').length} Private Offices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Filters onFilterChange={setFilters} />
          </aside>

          {/* Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600">
                  Showing <span className="text-gray-900">{filteredSpaces.length}</span> of{' '}
                  <span className="text-gray-900">{citySpaces.length}</span> spaces
                </p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Space Cards Grid */}
            {filteredSpaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpaces.map((space) => (
                  <SpaceCard key={space.id} space={space} onEnquireClick={handleEnquireClick} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="text-gray-400" size={32} />
                </div>
                <h3 className="text-gray-900 mb-2">No spaces found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 20000],
                      seats: '',
                      spaceTypes: [],
                      amenities: [],
                    })
                  }
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-gray-900">
              Premium Coworking Spaces in {cityName}
            </h2>
            <p className="text-gray-600">
              {cityName} has emerged as one of India's leading business hubs, attracting startups, freelancers, 
              and established companies alike. SPACEHAAT brings you a curated selection of the best coworking 
              spaces and virtual offices in {cityName}, offering flexible workspace solutions that cater to 
              diverse business needs.
            </p>
            <p className="text-gray-600">
              Whether you're looking for a hot desk, dedicated desk, private cabin, or virtual office address, 
              our platform makes it easy to compare options, check amenities, and find the perfect workspace 
              that fits your budget and requirements. All our listed spaces are verified and offer world-class 
              facilities including high-speed internet, meeting rooms, cafeteria, parking, and more.
            </p>
            <p className="text-gray-600">
              Explore coworking spaces across popular areas in {cityName} and get the best deals with free 
              consultation from our expert team. Submit an enquiry today and let us help you find your ideal 
              workspace in {cityName}.
            </p>
          </div>
        </div>
      </section>

      {/* Related Cities */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-900 mb-6">
            Explore Other Cities
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Gurugram', 'Bangalore', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi', 'Noida', 'Chennai']
              .filter((city) => city !== cityName)
              .map((city) => (
                <a
                  key={city}
                  href={`/coworking-space-in-${city.toLowerCase()}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors"
                >
                  {city}
                </a>
              ))}
          </div>
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

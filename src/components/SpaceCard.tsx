import { MapPin, Users, Wifi, Car, Coffee, Building } from 'lucide-react';
import { Space } from '../data/spaces';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SpaceCardProps {
  space: Space;
  onEnquireClick: (space: Space) => void;
}

const amenityIcons: Record<string, any> = {
  'High-Speed WiFi': Wifi,
  'WiFi': Wifi,
  'Parking': Car,
  'Cafeteria': Coffee,
  'Meeting Rooms': Building,
};

export function SpaceCard({ space, onEnquireClick }: SpaceCardProps) {
  const getImageUrl = (query: string) => {
    // Map query to actual Unsplash images
    const imageMap: Record<string, string> = {
      'coworking office': 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2MTk0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'modern workspace': 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzY2MTk0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'virtual office': 'https://images.unsplash.com/photo-1764727291644-5dcb0b1a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwb2ZmaWNlJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2NjE5NDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'private office': 'https://images.unsplash.com/photo-1746021375246-7dc8ab0583f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwZXhlY3V0aXZlJTIwb2ZmaWNlfGVufDF8fHx8MTc2NjE5NDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'business workspace': 'https://images.unsplash.com/photo-1639539420800-41be0c3a6d03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjYxNjYyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'startup office': 'https://images.unsplash.com/photo-1572025442506-64f9e3525c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwb2ZmaWNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY2MTk0MzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    };
    
    return imageMap[query] || imageMap['coworking office'];
  };

  const displayAmenities = space.amenities.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={getImageUrl(space.images[0])}
          alt={space.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-indigo-700">
            {space.type}
          </span>
        </div>
        {/* Featured Badge */}
        {space.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name & Location */}
        <a href={`/space/${space.slug}`}>
          <h3 className="text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {space.name}
          </h3>
        </a>
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
          <MapPin size={16} className="text-gray-400" />
          <span>{space.microMarket}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {displayAmenities.map((amenity, index) => {
            const Icon = amenityIcons[amenity];
            return (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-md"
              >
                {Icon && <Icon size={14} className="text-gray-500" />}
                <span>{amenity}</span>
              </div>
            );
          })}
        </div>

        {/* Seats */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <Users size={16} className="text-gray-400" />
          <span>Up to {space.seats} seats</span>
        </div>

        {/* Price & CTAs */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="text-xl text-gray-900">
              ₹{space.pricePerSeat.toLocaleString('en-IN')}
              <span className="text-sm text-gray-500">/seat/mo</span>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href={`/space/${space.slug}`}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm"
            >
              View Details
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                onEnquireClick(space);
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all text-sm"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

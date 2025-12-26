import { useState } from 'react';
import { Search, MapPin, Building, Users } from 'lucide-react';
import { cities } from '../data/spaces';

interface SearchBarProps {
  onSearch?: (city: string, spaceType: string, seats: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [seats, setSeats] = useState('');

  const handleSearch = () => {
    if (city) {
      window.location.href = `/coworking-space-in-${cities.find(c => c.name === city)?.slug}`;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* City Selection */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2">City</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Space Type */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2">Space Type</label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">All Types</option>
              <option value="Coworking">Coworking Space</option>
              <option value="Virtual Office">Virtual Office</option>
              <option value="Private Office">Private Office</option>
            </select>
          </div>
        </div>

        {/* Seats */}
        <div className="relative">
          <label className="block text-sm text-gray-700 mb-2">Seats</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              placeholder="Number of seats"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Search size={20} />
            <span>Find Your Workspace</span>
          </button>
        </div>
      </div>
    </div>
  );
}

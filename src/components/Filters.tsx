import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { amenitiesList } from '../data/spaces';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  seats: string;
  spaceTypes: string[];
  amenities: string[];
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 20000],
    seats: '',
    spaceTypes: [],
    amenities: [],
  });

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSpaceTypeToggle = (type: string) => {
    const newTypes = filters.spaceTypes.includes(type)
      ? filters.spaceTypes.filter((t) => t !== type)
      : [...filters.spaceTypes, type];
    const newFilters = { ...filters, spaceTypes: newTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    const newFilters = { ...filters, amenities: newAmenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 20000],
      seats: '',
      spaceTypes: [],
      amenities: [],
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg z-40 flex items-center gap-2"
      >
        <SlidersHorizontal size={20} />
        <span>Filters</span>
      </button>

      {/* Filter Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 lg:w-full bg-white 
          shadow-xl lg:shadow-none rounded-r-2xl lg:rounded-xl
          z-50 lg:z-0 p-6 overflow-y-auto
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-gray-900">Filters</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h3 className="text-gray-900">Filters</h3>
          <button
            onClick={handleReset}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Reset All
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <label className="block text-sm text-gray-700 mb-3">
            Price Range (per seat/month)
          </label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Max"
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{filters.priceRange[0].toLocaleString('en-IN')}</span>
              <span>₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <label className="block text-sm text-gray-700 mb-3">Seats Required</label>
          <input
            type="number"
            value={filters.seats}
            onChange={(e) => {
              const newFilters = { ...filters, seats: e.target.value };
              setFilters(newFilters);
              onFilterChange(newFilters);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            placeholder="Enter number of seats"
          />
        </div>

        {/* Space Type */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <label className="block text-sm text-gray-700 mb-3">Space Type</label>
          <div className="space-y-2">
            {['Coworking', 'Virtual Office', 'Private Office'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.spaceTypes.includes(type)}
                  onChange={() => handleSpaceTypeToggle(type)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-3">Amenities</label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {amenitiesList.slice(0, 10).map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Apply Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-lg"
        >
          Apply Filters
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

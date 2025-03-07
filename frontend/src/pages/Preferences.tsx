
import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    categories: {
      shirts: true,
      pants: true,
      shoes: true,
      accessories: false,
      outerwear: true
    },
    sizes: {
      xs: false,
      s: true,
      m: true,
      l: false,
      xl: false
    },
    priceRange: [20, 200]
  });

  const handleCategoryToggle = (category: keyof typeof preferences.categories) => {
    setPreferences({
      ...preferences,
      categories: {
        ...preferences.categories,
        [category]: !preferences.categories[category]
      }
    });
  };

  const handleSizeToggle = (size: keyof typeof preferences.sizes) => {
    setPreferences({
      ...preferences,
      sizes: {
        ...preferences.sizes,
        [size]: !preferences.sizes[size]
      }
    });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...preferences.priceRange];
    newRange[index] = newValue;
    
    // Ensure min <= max
    if (index === 0 && newValue > preferences.priceRange[1]) {
      newRange[1] = newValue;
    } else if (index === 1 && newValue < preferences.priceRange[0]) {
      newRange[0] = newValue;
    }
    
    setPreferences({
      ...preferences,
      priceRange: newRange
    });
  };

  return (
    <PageLayout>
      <div className="py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Preferences</h1>
        <p className="text-center text-muted-foreground mb-10">Customize your discover feed</p>
        
        <div className="space-y-12">
          {/* Categories Section */}
          <section className="glass-morphism p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {Object.entries(preferences.categories).map(([category, isSelected]) => (
                <div 
                  key={category}
                  onClick={() => handleCategoryToggle(category as keyof typeof preferences.categories)}
                  className={`cursor-pointer p-4 rounded-lg border border-white/10 text-center transition-all ${
                    isSelected ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="capitalize">{category}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Sizes Section */}
          <section className="glass-morphism p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Sizes</h2>
            <div className="flex flex-wrap gap-4">
              {Object.entries(preferences.sizes).map(([size, isSelected]) => (
                <div 
                  key={size}
                  onClick={() => handleSizeToggle(size as keyof typeof preferences.sizes)}
                  className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-full border border-white/10 uppercase transition-all ${
                    isSelected ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {size}
                </div>
              ))}
            </div>
          </section>
          
          {/* Price Range Section */}
          <section className="glass-morphism p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Price Range</h2>
            <div className="px-4">
              <div className="flex justify-between mb-2">
                <span>${preferences.priceRange[0]}</span>
                <span>${preferences.priceRange[1]}</span>
              </div>
              <div className="relative mb-6 pt-4">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={preferences.priceRange[0]}
                  onChange={(e) => handleSliderChange(e, 0)}
                  className="absolute w-full appearance-none bg-transparent h-1 cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={preferences.priceRange[1]}
                  onChange={(e) => handleSliderChange(e, 1)}
                  className="absolute w-full appearance-none bg-transparent h-1 cursor-pointer"
                />
                <div className="absolute w-full h-1 bg-white/10 rounded"></div>
                <div 
                  className="absolute h-1 bg-white/40 rounded" 
                  style={{ 
                    left: `${(preferences.priceRange[0] / 500) * 100}%`, 
                    width: `${((preferences.priceRange[1] - preferences.priceRange[0]) / 500) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </section>
          
          <div className="flex justify-center">
            <button className="px-8 py-3 rounded-lg glass-morphism hover:bg-white/10 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Preferences;
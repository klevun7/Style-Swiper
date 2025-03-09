"use client"

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PreferenceSlider from "@/components/PreferenceSlider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data for clothing types and sizes
const clothingTypes = [
  "Tops", "Bottoms", "Dresses", "Outerwear", 
  "Footwear", "Accessories", "Activewear"
];

const sizeCategories = {
  tops: ["XS", "S", "M", "L", "XL", "XXL"],
  bottoms: ["24", "26", "28", "30", "32", "34", "36", "38"],
  shoes: ["5", "6", "7", "8", "9", "10", "11", "12"]
};

const Preferences = () => {
  // Price range state
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  
  // Selected clothing types state
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // Size states
  const [selectedTopSizes, setSelectedTopSizes] = useState<string[]>([]);
  const [selectedBottomSizes, setSelectedBottomSizes] = useState<string[]>([]);
  const [selectedShoeSizes, setSelectedShoeSizes] = useState<string[]>([]);

  // Load preferences from local storage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setPriceRange(preferences.priceRange || [0, 200]);
      setSelectedTypes(preferences.selectedTypes || []);
      setSelectedTopSizes(preferences.selectedTopSizes || []);
      setSelectedBottomSizes(preferences.selectedBottomSizes || []);
      setSelectedShoeSizes(preferences.selectedShoeSizes || []);
    }
  }, []);

  // Handle toggling clothing type selection
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Handle toggling size selection
  const toggleSize = (size: string, category: 'tops' | 'bottoms' | 'shoes') => {
    switch (category) {
      case 'tops':
        if (selectedTopSizes.includes(size)) {
          setSelectedTopSizes(selectedTopSizes.filter(s => s !== size));
        } else {
          setSelectedTopSizes([...selectedTopSizes, size]);
        }
        break;
      case 'bottoms':
        if (selectedBottomSizes.includes(size)) {
          setSelectedBottomSizes(selectedBottomSizes.filter(s => s !== size));
        } else {
          setSelectedBottomSizes([...selectedBottomSizes, size]);
        }
        break;
      case 'shoes':
        if (selectedShoeSizes.includes(size)) {
          setSelectedShoeSizes(selectedShoeSizes.filter(s => s !== size));
        } else {
          setSelectedShoeSizes([...selectedShoeSizes, size]);
        }
        break;
    }
  };

  // Format price for display
  const formatPrice = (value: number) => `$${value}`;

  // Save all preferences
  const savePreferences = () => {
    const preferences = {
      priceRange,
      selectedTypes,
      selectedTopSizes,
      selectedBottomSizes,
      selectedShoeSizes
    };
    
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    toast({
      title: "Preferences saved",
      description: "Your shopping preferences have been updated.",
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Your Preferences</h1>
        <p className="text-gray-600 mb-8">Customize what you see while swiping</p>
        
        <div className="preference-container">
          <div className="preference-section">
            <h2 className="text-xl font-semibold mb-4">Price Range</h2>
            <PreferenceSlider
              title="Set your budget"
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              formatValue={formatPrice}
            />
          </div>
          
          <div className="preference-section">
            <h2 className="text-xl font-semibold mb-4">Clothing Types</h2>
            <p className="text-gray-600 text-sm mb-3">Select the categories you're interested in</p>
            <div className="flex flex-wrap gap-2">
              {clothingTypes.map(type => (
                <Badge
                  key={type}
                  variant={selectedTypes.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer py-1.5 px-3 ${
                    selectedTypes.includes(type) 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="preference-section">
            <h2 className="text-xl font-semibold mb-4">Your Sizes</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tops</h3>
              <div className="flex flex-wrap gap-2">
                {sizeCategories.tops.map(size => (
                  <Badge
                    key={size}
                    variant={selectedTopSizes.includes(size) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTopSizes.includes(size) 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleSize(size, 'tops')}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Bottoms</h3>
              <div className="flex flex-wrap gap-2">
                {sizeCategories.bottoms.map(size => (
                  <Badge
                    key={size}
                    variant={selectedBottomSizes.includes(size) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedBottomSizes.includes(size) 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleSize(size, 'bottoms')}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Shoes</h3>
              <div className="flex flex-wrap gap-2">
                {sizeCategories.shoes.map(size => (
                  <Badge
                    key={size}
                    variant={selectedShoeSizes.includes(size) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedShoeSizes.includes(size) 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleSize(size, 'shoes')}
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={savePreferences} 
            className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Preferences;

import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import MotionCard from '../components/ui/motion-card';
import { toast } from "sonner";

// Empty data structure
const emptyItemTemplate = {
  id: 1,
  image: "",
  title: "",
  brand: "",
  price: ""
};

const Discover = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeRight = () => {
    // In a real app, this would add to wishlist
    toast.success("Added to wishlist");
  };

  const handleSwipeLeft = () => {
    // In a real app, this would skip the item
    toast.info("Item skipped");
  };

  return (
    <PageLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-10 text-center">Discover</h1>
        <div className="max-w-md mx-auto relative min-h-[600px]">
          <MotionCard
            image=""
            title=""
            brand=""
            price=""
            onSwipeRight={handleSwipeRight}
            onSwipeLeft={handleSwipeLeft}
          />
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              onClick={handleSwipeLeft}
              className="px-8 py-3 rounded-full glass-morphism hover:bg-white/10 transition-colors"
            >
              Skip
            </button>
            <button 
              onClick={handleSwipeRight}
              className="px-8 py-3 rounded-full glass-morphism hover:bg-white/10 transition-colors"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Discover;
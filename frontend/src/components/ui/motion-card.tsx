
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface MotionCardProps {
  image: string;
  title: string;
  brand: string;
  price: string;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

const MotionCard = ({ image, title, brand, price, onSwipeRight, onSwipeLeft }: MotionCardProps) => {
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isSwiping) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startX;
    setOffsetX(delta);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    if (offsetX > 100) {
      setSwipeDirection('right');
      onSwipeRight();
    } else if (offsetX < -100) {
      setSwipeDirection('left');
      onSwipeLeft();
    }
    
    setTimeout(() => {
      setOffsetX(0);
      setIsSwiping(false);
      setSwipeDirection(null);
    }, 500);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSwipeDirection('right');
    onSwipeRight();
    
    setTimeout(() => {
      setOffsetX(0);
      setIsSwiping(false);
      setSwipeDirection(null);
    }, 500);
  };

  const getCardStyle = () => {
    if (swipeDirection === 'right') {
      return 'animate-swipe-right';
    } else if (swipeDirection === 'left') {
      return 'animate-swipe-left';
    } else {
      return '';
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-xl glass-morphism w-full max-w-md mx-auto transition-transform ${getCardStyle()}`}
      style={{
        transform: offsetX ? `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)` : 'none',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove as any}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove as any}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[500px] object-cover"
          loading="lazy"
        />
        <button 
          onClick={handleLike}
          className="absolute bottom-4 right-4 glass-morphism p-2 rounded-full hover:scale-110 transition-transform"
        >
          <Heart className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground mb-2">{brand}</p>
        <p className="text-white font-medium">{price}</p>
      </div>
    </div>
  );
};

export default MotionCard;
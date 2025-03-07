
import { useState } from 'react';

interface WishItemProps {
  image: string;
  title: string;
  brand: string;
  price: string;
  stores: Array<{
    name: string;
    inStock: boolean;
    price: string;
  }>;
}

const WishItem = ({ image, title, brand, price, stores }: WishItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-morphism rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-up">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-52 md:h-auto">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground mb-1">{brand}</p>
          <p className="text-white font-medium mb-4">{price}</p>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="self-start px-4 py-2 rounded glass-morphism text-sm font-medium transition-all hover:bg-white/10"
          >
            {isExpanded ? 'Hide Stores' : 'View Stores'}
          </button>
          
          {isExpanded && (
            <div className="mt-4 space-y-3 animate-fade-in">
              <h4 className="text-sm font-medium mb-2">Available at:</h4>
              {stores.map((store, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                  <span>{store.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className={store.inStock ? 'text-green-400' : 'text-red-400'}>
                      {store.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span>{store.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishItem;
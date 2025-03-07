import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import WishItem from '../components/ui/wish-item';

const Wishlist = () => {
  const [wishlist] = useState([]);

  return (
    <PageLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2 text-center">My Wishlist</h1>
        <p className="text-center text-muted-foreground mb-10">Items you've liked are saved here</p>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your wishlist is empty</p>
            <button className="mt-4 px-6 py-2 glass-morphism rounded hover:bg-white/10 transition-colors">
              Start Discovering
            </button>
          </div>
        ) : (
          <div className="space-y-6">
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Wishlist;
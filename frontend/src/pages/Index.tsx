
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient leading-tight">
            Style Swipe
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover your perfect style with a simple swipe. Fashion discovery reimagined.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/discover')}
              className="glass-morphism px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Start Discovering
            </button>
          </div>
        </div>
        
        <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full transition-opacity duration-1000 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Discover</h3>
            <p className="text-muted-foreground">
              Swipe through curated fashion items tailored to your preferences.
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Save</h3>
            <p className="text-muted-foreground">
              Build your wishlist with items you love for easy access later.
            </p>
          </div>
          
          <div className="glass-morphism p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Shop</h3>
            <p className="text-muted-foreground">
              Find where your favorite items are available and at what price.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
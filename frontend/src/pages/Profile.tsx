
import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import AuthForm from '../components/ui/auth-form';

const Profile = () => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  // This would be populated from authentication state in a real app
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  // Mock user data
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinedDate: 'January 2023',
    itemsLiked: 42
  };

  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    setIsAuthenticated(true);
  };

  return (
    <PageLayout>
      <div className="py-8 max-w-3xl mx-auto">
        {isAuthenticated ? (
          <div className="space-y-10">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center text-2xl mb-4">
                {userData.name.split(' ').map(name => name[0]).join('')}
              </div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground mt-1">Member since {userData.joinedDate}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Account Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Password</p>
                    <p>••••••••</p>
                  </div>
                  <button className="text-sm text-white hover:underline">
                    Change Password
                  </button>
                </div>
              </div>
              
              <div className="glass-morphism rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Stats</h2>
                <div className="text-center p-4 glass-morphism bg-black rounded-lg">
                  <p className="text-3xl font-bold">{userData.itemsLiked}</p>
                  <p className="text-sm text-muted-foreground">Items Liked</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="px-8 py-3 rounded-lg glass-morphism hover:bg-white/10 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="py-10">
            <AuthForm 
              mode={authMode} 
              onToggleMode={toggleAuthMode} 
              onSubmit={handleFormSubmit}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Profile;

import { useState } from 'react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
  onSubmit?: (formData: any) => void;
}

const AuthForm = ({ mode, onToggleMode, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would handle authentication
    console.log('Form submitted:', formData);
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="glass-morphism rounded-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'signin' ? 'Sign In' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full p-3 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-white/20"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full p-3 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-white/20"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full p-3 rounded-md bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-white/20"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 glass-morphism bg-black font-medium rounded-md hover:bg-white/10 transition-colors"
        >
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {mode === 'signin' 
            ? "Don't have an account?" 
            : "Already have an account?"}
          <button
            onClick={onToggleMode}
            className="ml-2 text-white hover:underline focus:outline-none"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
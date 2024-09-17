import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context value
interface AuthContextType {
  user: string | null;
  handleSignIn: (username: string, password: string) => Promise<void>;
  handleSignUp: (username: string, password: string) => Promise<void>;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  // Dummy authentication functions
  const handleSignIn = async (username: string, password: string) => {
    // Implement your sign-in logic here, e.g., call an API
    if (username === 'test' && password === 'password') {
      setUser(username);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleSignUp = async (username: string, password: string) => {
    // Implement your sign-up logic here, e.g., call an API
    if (username && password) {
      // For demonstration, we simply set the user
      setUser(username);
    } else {
      throw new Error('Failed to sign up');
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };

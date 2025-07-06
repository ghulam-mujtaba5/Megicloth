"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
  lastLogin: string;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface UserProfile extends User {
  addresses: Address[];
  preferences: {
    newsletter: boolean;
    marketing: boolean;
    notifications: boolean;
  };
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<{ success: boolean; error?: string }>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<{ success: boolean; error?: string }>;
  removeAddress: (id: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Mock user data for development
const mockUser: UserProfile = {
  id: '1',
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+92 300 1234567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'customer',
  isEmailVerified: true,
  createdAt: '2024-01-01T00:00:00Z',
  lastLogin: new Date().toISOString(),
  addresses: [
    {
      id: '1',
      type: 'home',
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main Street',
      city: 'Karachi',
      state: 'Sindh',
      postalCode: '75000',
      country: 'Pakistan',
      phone: '+92 300 1234567',
      isDefault: true,
    }
  ],
  preferences: {
    newsletter: true,
    marketing: false,
    notifications: true,
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('megicloth_token');
        if (token) {
          // In a real app, validate token with backend
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('megicloth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'user@example.com' && password === 'password') {
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('megicloth_token', token);
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration
      const newUser: UserProfile = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        role: 'customer',
        isEmailVerified: false,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        addresses: [],
        preferences: {
          newsletter: true,
          marketing: false,
          notifications: true,
        },
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('megicloth_token', token);
      setUser(newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('megicloth_token');
    setUser(null);
    router.push('/');
  }, [router]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => prev ? { ...prev, ...data } : null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  }, [user]);

  const addAddress = useCallback(async (address: Omit<Address, 'id'>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      };
      
      setUser(prev => prev ? {
        ...prev,
        addresses: [...prev.addresses, newAddress]
      } : null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to add address' };
    }
  }, [user]);

  const updateAddress = useCallback(async (id: string, address: Partial<Address>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      setUser(prev => prev ? {
        ...prev,
        addresses: prev.addresses.map(addr => 
          addr.id === id ? { ...addr, ...address } : addr
        )
      } : null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update address' };
    }
  }, [user]);

  const removeAddress = useCallback(async (id: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      setUser(prev => prev ? {
        ...prev,
        addresses: prev.addresses.filter(addr => addr.id !== id)
      } : null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to remove address' };
    }
  }, [user]);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send reset email' };
    }
  }, []);

  const resetPassword = useCallback(async (token: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to reset password' };
    }
  }, []);

  const verifyEmail = useCallback(async (token: string) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(prev => prev ? { ...prev, isEmailVerified: true } : null);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to verify email' };
    }
  }, [user]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    updateAddress,
    removeAddress,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 
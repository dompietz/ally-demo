import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  username: string | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  username: null,
  loading: true,
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (user: User) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (error || !profile?.full_name) {
      setUsername(user.email || 'Nutzer');
    } else {
      setUsername(profile.full_name);
    }
  };

  const init = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) {
      console.error('Auth fetch error:', error?.message);
      setLoading(false);
      return;
    }

    const user = session.user;
    setUser(user);
    await loadProfile(user);
    setLoading(false);
  };

  useEffect(() => {
    init();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      init();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const refreshUser = async () => {
    if (user) await loadProfile(user);
  };

  return (
    <AuthContext.Provider value={{ user, username, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

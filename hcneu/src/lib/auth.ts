// src/lib/auth.ts
import { supabase } from './supabase';

// ✅ Legacy: Signup + immediately insert into 'profiles' (used only if full name is known at signup)
export async function signUpWithProfile(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: insertError } = await supabase.from('profiles').insert({
      id: user.id,
      full_name: fullName,
    });

    if (insertError) throw insertError;
  }

  return data;
}

// ✅ New: Signup without touching the 'profiles' table (used in MultiStepSignup)
export async function signUpWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/confirm-success`
    }
  });

  if (error) throw error;
}



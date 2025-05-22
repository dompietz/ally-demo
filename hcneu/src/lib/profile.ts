// src/lib/profile.ts
import { supabase } from "./supabase";

export async function getProfile() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("No session");

  const { data, error } = await supabase
    .from("profiles")
    .select("full_name, diagnosis, diagnosis_date")
    .eq("id", session.user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(updates: {
  full_name: string;
  diagnosis: string;
  diagnosis_date: string;
}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("No session");

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", session.user.id);

  if (error) throw error;
}

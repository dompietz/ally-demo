import { supabase } from './supabase';

export async function getPreferences(): Promise<string[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Nicht eingeloggt");

  const { data, error } = await supabase
    .from("profiles")
    .select("content_preferences")
    .eq("id", session.user.id)
    .single();

  if (error) throw error;
  return data.content_preferences || [];
}

export async function updatePreferences(preferences: string[]): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Nicht eingeloggt");

  const { error } = await supabase
    .from("profiles")
    .update({ content_preferences: preferences })
    .eq("id", session.user.id);

  if (error) throw error;
}

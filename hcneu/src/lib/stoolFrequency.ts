import { supabase } from './supabase';

export interface StoolFrequencyEntry {
  id: number;
  date: string;
  times_of_day: string[];
  count: number;
  properties: string[];
  notes: string | null;
  shared_with_team: boolean;
}

export async function fetchStoolFrequency(): Promise<StoolFrequencyEntry[]> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const { data, error } = await supabase
    .from('stool_frequency')
    .select('id, date, times_of_day, count, properties, notes, shared_with_team')
    .eq('user_id', session.user.id)
    .order('date', { ascending: false });

  if (error) throw error;
  return (data as StoolFrequencyEntry[]) || [];
}

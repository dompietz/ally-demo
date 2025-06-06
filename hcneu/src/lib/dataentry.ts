import { supabase } from './supabase';
import type { EntryFormValues } from '../components/dataentry/DataEntryForm';

export async function saveDataEntry(values: EntryFormValues) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const { error } = await supabase.from('entries').insert({
    user_id: session.user.id,
    date: values.date,
    symptoms: values.symptoms,
    notes: values.notes,
  });

  if (error) throw error;
}

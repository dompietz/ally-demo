// src/lib/dataentry.ts
import { supabase } from './supabase';
import type { EntryFormValues } from '../components/dataentry/DataEntryForm';

export async function saveDataEntry(values: EntryFormValues) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const user_id = session.user.id;

  // 1. Check if an entry already exists for this user and date
  const { data: existing, error: fetchError } = await supabase
    .from('stool_frequency')
    .select('id')
    .eq('user_id', user_id)
    .eq('date', values.date)
    .maybeSingle();

  if (fetchError) throw fetchError;

  const payload = {
    user_id,
    date: values.date,
    times_of_day: values.times_of_day,
    count: values.count,
    properties: values.properties,
    notes: values.notes,
    shared_with_team: values.shared_with_team,
  };

  let result;

  if (existing) {
    // 2. Update existing row
    result = await supabase
      .from('stool_frequency')
      .update(payload)
      .eq('id', existing.id);
  } else {
    // 3. Insert new row
    result = await supabase
      .from('stool_frequency')
      .insert(payload);
  }

  if (result.error) throw result.error;
}

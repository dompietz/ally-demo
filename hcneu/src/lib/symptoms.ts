import { supabase } from './supabase';
import type { SymptomFormValues } from '../components/dataentry/SymptomForm';

export async function saveSymptomEntry(values: SymptomFormValues) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const user_id = session.user.id;

  const { data: existing, error: fetchError } = await supabase
    .from('symptoms')
    .select('id')
    .eq('user_id', user_id)
    .eq('date', values.date)
    .maybeSingle();

  if (fetchError) throw fetchError;

  const payload = {
    user_id,
    date: values.date,
    severity: values.severity,
    notes: values.notes,
    shared_with_team: values.shared_with_team,
  };

  let result;

  if (existing) {
    result = await supabase
      .from('symptoms')
      .update(payload)
      .eq('id', existing.id);
  } else {
    result = await supabase
      .from('symptoms')
      .insert(payload);
  }

  if (result.error) throw result.error;
}

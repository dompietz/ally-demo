import { supabase } from './supabase';
import type { SymptomFormValues } from '../components/dataentry/SymptomForm';

export async function saveSymptomEntry(values: SymptomFormValues) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const user_id = session.user.id;

  const { error } = await supabase
    .from('symptoms')
    .insert({
      user_id,
      date: values.date,
      symptoms: values.symptoms,
      notes: values.notes,
      shared_with_team: values.shared_with_team,
    });

  if (error) throw error;
}

import { supabase } from './supabase';
import type { SymptomFormValues } from '../components/dataentry/SymptomForm';

export async function saveSymptomEntry(values: SymptomFormValues) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const user_id = session.user.id;

  const result = await supabase.from('symptom_entries').insert({
    user_id,
    notes: values.notes,
    shared_with_team: values.shared_with_team,
    details: values.details,
    intensity: values.intensity,
    locations: values.locations,
    times_of_day: values.times_of_day,
    timeframe: values.timeframe,
    symptom_type: values.symptom_type,
  });

  if (result.error) throw result.error;
}

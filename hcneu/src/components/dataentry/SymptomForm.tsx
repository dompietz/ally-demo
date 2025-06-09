import React from 'react';
import { useForm } from 'react-hook-form';
import { saveSymptomEntry } from '../../lib/symptoms';

export interface SymptomFormValues {
  date: string;
  symptoms: string[];
  notes: string;
  shared_with_team: boolean;
}

interface Props {
  onClose: () => void;
}

const SymptomForm: React.FC<Props> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<SymptomFormValues>({
    defaultValues: {
      date: '',
      symptoms: [],
      notes: '',
      shared_with_team: false,
    },
  });

  const onSubmit = async (data: SymptomFormValues) => {
    try {
      await saveSymptomEntry(data);
      onClose();
    } catch (err) {
      console.error('Fehler beim Speichern', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Datum
        <input type="date" {...register('date')} />
      </label>
      <label>
        Symptome
        <input type="text" {...register('symptoms')} />
      </label>
      <label>
        Notizen
        <textarea rows={3} {...register('notes')} />
      </label>
      <div>
        <label>
          <input
            type="radio"
            value="true"
            {...register('shared_with_team', {
              setValueAs: (v) => v === 'true',
            })}
          />
          Mit Team teilen
        </label>
        <label>
          <input
            type="radio"
            value="false"
            {...register('shared_with_team', {
              setValueAs: (v) => v === 'true',
            })}
          />
          Privat
        </label>
      </div>
      <button type="submit">Speichern</button>
    </form>
  );
};

export default SymptomForm;

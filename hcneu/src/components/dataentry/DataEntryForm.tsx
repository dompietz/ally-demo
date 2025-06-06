import React from 'react';
import { useForm } from 'react-hook-form';
import { saveDataEntry } from '../../lib/dataentry';

export interface EntryFormValues {
  date: string;
  symptoms: string;
  notes: string;
}

interface Props {
  onClose: () => void;
}

const DataEntryForm: React.FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EntryFormValues>({
    defaultValues: { date: '', symptoms: '', notes: '' },
  });

  const onSubmit = async (data: EntryFormValues) => {
    try {
      await saveDataEntry(data);
      reset();
      onClose();
    } catch (err) {
      console.error('Failed to save entry', err);
    }
  };

  return (
    <div className="data-entry-overlay" onClick={onClose}>
      <form
        className="data-entry-form"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Neuer Eintrag</h2>

        <label>
          Datum
          <input type="date" {...register('date', { required: 'Datum wählen' })} />
          {errors.date && <span className="error-message">{errors.date.message}</span>}
        </label>

        <label>
          Symptome
          <input type="text" placeholder="Symptome" {...register('symptoms')} />
        </label>

        <label>
          Notizen
          <textarea placeholder="Notizen" rows={4} {...register('notes')} />
        </label>

        <div className="actions">
          <button type="button" onClick={onClose}>Abbrechen</button>
          <button type="submit">Speichern</button>
        </div>
      </form>
    </div>
  );
};

export default DataEntryForm;

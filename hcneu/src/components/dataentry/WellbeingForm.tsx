import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { saveWellbeingEntry } from '../../lib/wellbeing';

export interface WellbeingFormValues {
  date: string;
  rating: number;
  notes: string;
  shared_with_team: boolean;
}

interface Props {
  onClose: () => void;
}

const steps = ['Datum', 'Bewertung', 'Notizen', 'Datenschutz'];

const WellbeingForm: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [customDate, setCustomDate] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [dateError, setDateError] = useState('');
  const { width, height } = useWindowSize();

  const { register, handleSubmit, reset, setValue, watch } = useForm<WellbeingFormValues>({
    defaultValues: {
      date: '',
      rating: 0,
      notes: '',
      shared_with_team: false,
    },
  });

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  const onSubmit = async (data: WellbeingFormValues) => {
    try {
      await saveWellbeingEntry(data);
      setShowConfetti(true);
      setShowForm(false);
      setTimeout(() => {
        setShowConfetti(false);
        reset();
        onClose();
      }, 1800);
    } catch (err) {
      console.error('Fehler beim Speichern', err);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  const handleNextStep = () => {
    if (step === 0 && !watch('date')) {
      setDateError('Bitte wähle ein Datum aus.');
      return;
    }
    setDateError('');
    setStep((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {showForm && (
        <motion.div
          className="data-entry-overlay"
          onClick={() => {
            setShowForm(false);
            setTimeout(onClose, 300);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            className="data-entry-form tile-base"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="form-inner">
              <h2 className="form-title">{steps[step]}</h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  className="form-content"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 0 && (
                    <div className="date-options">
                      <button
                        type="button"
                        className="input-group"
                        onClick={() => {
                          setCustomDate('');
                          setValue('date', today);
                        }}
                      >
                        Heute
                      </button>
                      <button
                        type="button"
                        className="input-group"
                        onClick={() => {
                          setCustomDate('');
                          setValue('date', yesterday);
                        }}
                      >
                        Gestern
                      </button>
                      <label className="input-group date">
                        Anderes Datum wählen
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => {
                            setCustomDate(e.target.value);
                            setValue('date', e.target.value);
                          }}
                        />
                      </label>
                      {dateError && <p className="form-error">{dateError}</p>}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="counter-wrapper">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setValue('rating', Math.max(0, watch('rating') - 1))}
                      >
                        –
                      </button>
                      <span className="count-display">{watch('rating')}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setValue('rating', watch('rating') + 1)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <label className="input-group">
                      <textarea rows={3} placeholder="Notizen (optional)" {...register('notes')} />
                    </label>
                  )}

                  {step === 3 && (
                    <>
                      <label className="checkbox-row">
                        <input type="checkbox" {...register('shared_with_team')} />
                        Mit Behandlungsteam teilen
                      </label>
                      <p className="disclaimer-text">Diese Information erscheint im Arztbericht.</p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="form-navigation">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                  className="btn back-btn"
                >
                  Zurück
                </button>

                {step < steps.length - 1 ? (
                  <button type="button" className="btn next-btn" onClick={handleNextStep}>
                    Weiter
                  </button>
                ) : (
                  <button type="submit" className="btn next-btn">
                    Speichern
                  </button>
                )}
              </div>
            </div>
          </motion.form>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={350}
          gravity={0.5}
          tweenDuration={300}
        />
      )}
    </AnimatePresence>
  );
};

export default WellbeingForm;

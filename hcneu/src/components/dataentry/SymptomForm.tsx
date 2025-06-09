import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { saveSymptomEntry } from '../../lib/symptoms';

export interface SymptomFormValues {
  notes: string;
  shared_with_team: string;
  details: string[];
  intensity: number;
  locations: string[];
  times_of_day: string[];
  timeframe: string[];
  symptom_type: string;
}

interface Props {
  onClose: () => void;
}

const steps = [
  'Notizen',
  'Art',
  'Intensität',
  'Lokalisation',
  'Tageszeit',
  'Zeitraum',
  'Typ',
];

const SymptomForm: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const { width, height } = useWindowSize();

  const { register, handleSubmit, reset, setValue, watch } = useForm<SymptomFormValues>({
    defaultValues: {
      notes: '',
      shared_with_team: 'false',
      details: [],
      intensity: 0,
      locations: [],
      times_of_day: [],
      timeframe: [],
      symptom_type: 'symptom',
    },
  });

  const onSubmit = async (data: SymptomFormValues) => {
    try {
      await saveSymptomEntry({
        ...data,
        shared_with_team: data.shared_with_team === 'true',
      });
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
                    <>
                      <label className="input-group">
                        <textarea rows={3} placeholder="Notizen (optional)" {...register('notes')} />
                      </label>
                      <div className="checkbox-list">
                        <label className="checkbox-row">
                          <input type="radio" value="false" {...register('shared_with_team')} />
                          Nur für mich
                        </label>
                        <label className="checkbox-row">
                          <input type="radio" value="true" {...register('shared_with_team')} />
                          Auch für mein Behandlungsteam
                        </label>
                        <p className="disclaimer-text">Taucht in Bericht auf oder nicht</p>
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <div className="checkbox-list">
                      {['Letzter Eintrag', 'Drückend', 'Pochend', 'Aufgebläht', 'Stechend', 'Ziehend', 'Krampfend'].map((d) => (
                        <label className="checkbox-row" key={d}>
                          <input type="checkbox" value={d} {...register('details')} />
                          {d}
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 2 && (
                    <div className="counter-wrapper">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setValue('intensity', Math.max(0, watch('intensity') - 1))}
                      >
                        –
                      </button>
                      <span className="count-display">{watch('intensity')}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setValue('intensity', watch('intensity') + 1)}
                      >
                        +
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="checkbox-list">
                      {['Kopf', 'Oberkörper', 'Darm', 'Magen'].map((l) => (
                        <label className="checkbox-row" key={l}>
                          <input type="checkbox" value={l} {...register('locations')} />
                          {l}
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="checkbox-list">
                      {['Jetzt', 'Ohne Tageszeit', 'Vormittags', 'Mittags', 'Abends'].map((t) => (
                        <label className="checkbox-row" key={t}>
                          <input type="checkbox" value={t} {...register('times_of_day')} />
                          {t}
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 5 && (
                    <div className="checkbox-list">
                      {['Letzter Eintrag', 'Heute', 'Gestern', 'Diese Woche', 'Zeitraum eintragen'].map((tf) => (
                        <label className="checkbox-row" key={tf}>
                          <input type="checkbox" value={tf} {...register('timeframe')} />
                          {tf}
                        </label>
                      ))}
                    </div>
                  )}

                  {step === 6 && (
                    <div className="checkbox-list">
                      {['Letzten Eintrag', 'Ganz klar – Symptom', 'Eindeutig – eine Nebenwirkung', 'Ich bin mir unsicher'].map((ty) => (
                        <label className="checkbox-row" key={ty}>
                          <input type="radio" value={ty} {...register('symptom_type')} />
                          {ty}
                        </label>
                      ))}
                      <p className="disclaimer-text">Artikel Hilfe: Wie kann ich unterscheiden?</p>
                    </div>
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

export default SymptomForm;

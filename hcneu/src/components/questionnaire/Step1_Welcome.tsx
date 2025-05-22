// src/components/questionnaire/Step1_Welcome.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type { Answers } from "./Questionnaire";
import "./Questionnaire.css";

interface Props {
  defaultValues: Answers;
  onNext: (part: Partial<Answers>) => void;
}

export default function Step1_Welcome({ defaultValues, onNext }: Props) {
  useEffect(() => {
    console.log("👋 Step1_Welcome mounted");
    console.log("🧪 defaultValues:", defaultValues);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Answers>({ defaultValues });

  const submit = (data: Answers) =>
    onNext({
      name: data.name.trim(),
      diagnosis: data.diagnosis,
      date: data.date,
    });

  if (!defaultValues) return <div>⚠️ Keine Eingabewerte übergeben</div>;

  return (
    <div className="quiz-scene">
      <div className="glowing-background">
        <div className="blurred-gradient" />
        <div className="grainy-overlay" />
      </div>

      <motion.form
        className="quiz-wrapper"
        onSubmit={handleSubmit(submit)}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="quiz-title">Personalisierung</h1>

        {/* ───────── Name ───────── */}
        <p className="quiz-sub">Wie dürfen wir dich nennen?</p>
        <div className="input-group">
          <input
            type="text"
            placeholder="Dein Name"
            {...register("name", {
              required: "Bitte gib deinen Namen ein",
              minLength: {
                value: 2,
                message: "Der Name muss mindestens 2 Zeichen enthalten",
              },
            })}
          />
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        {/* ───────── Diagnosis ───────── */}
        <p className="quiz-sub">Welcher Diagnose-Typ trifft zu?</p>
        <label className="input-group select">
          <select {...register("diagnosis")}>
            <option value="Morbus Crohn">Morbus Crohn</option>
            <option value="Colitis Ulcerosa">Colitis Ulcerosa</option>
          </select>
        </label>

        {/* ───────── Date ───────── */}
        <p className="quiz-sub">Wann wurde die Diagnose gestellt?</p>
        <label className="input-group date">
          <input
            type="date"
            {...register("date", { required: true })}
          />
        </label>

        {/* CTA */}
        <button type="submit" className="primary-btn">
          Weiter
        </button>

        {/* Progress Bar */}
        <div className="quiz-progress">
          <span style={{ "--percent": "33%" } as React.CSSProperties} />
        </div>
      </motion.form>
    </div>
  );
}

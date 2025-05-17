import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import type { Answers } from "./Questionnaire";
import "./Questionnaire.css"; // ← ① bring in the shared styles

const allTopics = [
  "Ernährung",
  "Stress",
  "Medikamente",
  "Schlaf",
  "Bewegung",
  "Schub-Vorbeugung",
  "Rezepte",
  "Alltagstipps",
  "Reisen",
  "Studien",
];

interface Props {
  defaultValues: Answers;
  onNext: (part: Partial<Answers>) => void;
}

export default function Step2({ defaultValues, onNext }: Props) {
  const { register, handleSubmit } = useForm<Answers>({ defaultValues });
  const submit = (d: Answers) => onNext({ topics: d.topics });

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
        <p className="quiz-sub">Welche&nbsp;Themen interessieren&nbsp;dich?</p>

        <div className="topics-grid">
          {allTopics.map((t) => (
            <label key={t} className="checkbox-row topic-card">
              <input type="checkbox" value={t} {...register("topics")} />
              <span>{t}</span>
            </label>
          ))}
        </div>

        <button className="primary-btn" type="submit">
          Weiter
        </button>

        <div className="quiz-progress">
          <span style={{ "--percent": "66%" } as React.CSSProperties} />
        </div>
      </motion.form>
    </div>
  );
}

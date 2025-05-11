import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Step1 from "./Step1_Welcome";
import Step2 from "./Step2_Topics";
import Step3 from "./Step3_Disclaimer";
import Loading from "./LoadingScreen";

export interface Answers {
  name: string;
  diagnosis: "Morbus Crohn" | "Colitis Ulcerosa";
  date: string;           // ISO string
  topics: string[];
  disclaimerAccepted: boolean;
}

export default function Questionnaire() {
  const [step,    setStep]    = useState(0);          // 0-3 (+ loading)
  const [answers, setAnswers] = useState<Answers>({
    name: "",
    diagnosis: "Morbus Crohn",
    date: "",
    topics: [],
    disclaimerAccepted: false,
  });

  /* helper to merge partial answer + advance */
  const next = (partial: Partial<Answers>) => {
    setAnswers(prev => ({ ...prev, ...partial }));
    setStep(s => s + 1);
  };

  /* when final step done show loading → dashboard */
  if (step === 3) return <Loading answers={answers} />;

  return (
    <div className="q-wrapper">
      <AnimatePresence mode="wait">
        {step === 0 && <Step1 key={0} defaultValues={answers} onNext={next} />}
        {step === 1 && <Step2 key={1} defaultValues={answers} onNext={next} />}
        {step === 2 && <Step3 key={2} defaultValues={answers} onNext={next} />}
      </AnimatePresence>
    </div>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Answers } from "./Questionnaire";
import "./LoadingScreen.css";

interface Props {
  answers: Answers;
}

export default function LoadingScreen({ answers: _answers }: Props) {
  const nav = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => nav("/dashboard"), 4000);
    return () => clearTimeout(id);
  }, [nav]);

  return (
    <motion.div
      className="q-loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="q-loading-content">
        <svg className="loading-spinner" viewBox="0 0 50 50">
          <circle
            className="loading-circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
        <p className="loading-caption">Deine Erfahrung wird personalisiert …</p>
      </div>
    </motion.div>
  );
}

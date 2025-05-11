import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Answers } from "./Questionnaire";

/* keep the prop so Questionnaire can still pass it,
   but prefix it with an underscore so TS treats it as “used”. */
interface Props { answers: Answers }

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
      <h2>Deine Erfahrung wird personalisiert …</h2>
      {/* 👉 SVG animation lives here */}
    </motion.div>
  );
}

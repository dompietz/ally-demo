import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import type { Answers } from "./Questionnaire";
import "./LoadingScreen.css";

interface Props {
  answers: Answers;
}

export default function LoadingScreen({ answers }: Props) {
  const nav = useNavigate();

  useEffect(() => {
    const updateProfile = async () => {
      const {
        data: { session },
        error: sessionError
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("Session error:", sessionError);
        return;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: answers.name,
          diagnosis: answers.diagnosis,
          diagnosis_date: answers.date,
          content_preferences: answers.topics, // ✅ new field for JSONB array
          onboarding_complete: true
        })
        .eq("id", session.user.id);

      if (error) {
        console.error("Update profile error:", error.message);
      }
    };

    updateProfile();

    const id = setTimeout(() => nav("/dashboard"), 4000);
    return () => clearTimeout(id);
  }, [answers, nav]);

  return (
    <motion.div className="q-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="q-loading-content">
        <svg className="loading-spinner" viewBox="0 0 50 50">
          <circle className="loading-circle" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        </svg>
        <p className="loading-caption">Deine Erfahrung wird personalisiert …</p>
      </div>
    </motion.div>
  );
}

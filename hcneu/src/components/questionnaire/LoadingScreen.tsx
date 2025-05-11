import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Answers } from "./Questionnaire";
import "./Questionnaire.css";      // already contains colours / fonts
import "./LoadingScreen.css";      // << new (see below)

interface Props { answers: Answers }

export default function LoadingScreen({ answers }: Props) {
  const nav = useNavigate();

  /* fake processing time ≈ 4 s */
  useEffect(() => {
    /* TODO: send `answers` to your backend here */
    const id = setTimeout(() => nav("/dashboard"), 4000);
    return () => clearTimeout(id);
  }, [nav]);

  return (
    <motion.div
      className="loading-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* SVG with animated stroke */}
      <motion.svg
        className="loading-line"
        viewBox="0 0 451.05 240.99"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={13}
        stroke="url(#allyGradient)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 3.4,          // stroke draws for ~3.4 s
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="allyGradient" x1="0" y1="120.49" x2="451.05" y2="120.49" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8ccab0"/>
            <stop offset=".3" stopColor="#92b0bc"/>
            <stop offset=".58" stopColor="#9997ca"/>
            <stop offset=".74" stopColor="#91b3bb"/>
            <stop offset=".9" stopColor="#8bc7b2"/>
            <stop offset="1" stopColor="#8aceaf"/>
          </linearGradient>
        </defs>

        {/* --- Ally wave path (unchanged) --- */}
        <motion.path
          d="M6.5,105.67c6.43-1.06,18.52-2.56,33.32-1.03,66.14,6.82,86.21,64.91,120.66,60.11,40.37-5.62,100.25-111.86,60.06-147.83-9.78-8.76-29.27-14.64-42.92-4.03-14.42,11.21-23.26,38.24-17.69,61.64,4.98,20.92,20.63,41.33,35.78,59.62,9.02,10.89,37.85,47.74,50.52,47.63,7.47-.07,43.4-38.04,52.38-48.13,16.66-18.71,31.06-39.02,35.09-59.04,4.93-24.5-3.54-47.87-16.31-58.69-12.79-10.84-29.82-13.52-44.75-1.79-45.7,35.89,26.51,159.74,63.62,159.14,27.49-.45,23.64-84.6,27.49-82.75,3.04,1.46,4.89,53.05,18.41,71.8,11.35,15.73,25.87,17.61,42.85,1.43,23.84-22.72,5.34-74.28,4.73-74.18-.64.1,36.1,111.86-3.81,138.99-11.88,8.07-27.83,6.81-42.71,2.62"
        />
      </motion.svg>

      <p className="loading-caption">Deine&nbsp;Erfahrung wird&nbsp;personalisiert …</p>
    </motion.div>
  );
}

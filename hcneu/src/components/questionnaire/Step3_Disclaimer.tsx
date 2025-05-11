/* ────────────────────────────────
   src/components/questionnaire/Step3_Disclaimer.tsx
   ──────────────────────────────── */
   import { useForm } from "react-hook-form";
   import { motion } from "framer-motion";
   import type { Answers } from "./Questionnaire";
   import "./Questionnaire.css";           // shared design tokens
   
   interface Props {
     defaultValues: Answers;
     onNext: (data: Partial<Answers>) => void;
   }
   
   export default function Step3_Disclaimer({ defaultValues, onNext }: Props) {
     const { register, handleSubmit } = useForm<Answers>({ defaultValues });
     const submit = () => onNext({ disclaimerAccepted: true });
   
     return (
       /* glow + centring wrapper (same as previous steps) */
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
           <h1 className="quiz-title">Haftungsausschluss</h1>
   
           {/* body copy gets a max-width so it doesn’t span edge to edge */}
           <p className="disclaimer-text">
             Ally ist kein Medizinprodukt. Die bereitgestellten Informationen
             dienen nicht zur Diagnose&nbsp;oder&nbsp;Behandlung. Deine Daten
             bleiben DSGVO-konform gesichert und werden niemals verkauft.
           </p>
   
           <label className="checkbox-row">
             <input
               type="checkbox"
               {...register("disclaimerAccepted", { required: true })}
             />
             <span>
               Ich habe den Hinweis gelesen&nbsp;und&nbsp;akzeptiere&nbsp;ihn.
             </span>
           </label>
   
           <button type="submit" className="primary-btn">
             Setup abschließen
           </button>
   
           {/* progress bar – 3 / 3  */}
           <div className="quiz-progress">
             <span style={{ "--percent": "100%" } as React.CSSProperties} />
           </div>
         </motion.form>
       </div>
     );
   }
   
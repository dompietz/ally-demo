import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      console.log("🔐 Session:", session);
      if (error || !session) {
        console.warn("⚠️ No valid session found. Redirecting to /login");
        setRedirectPath("/login");
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      // ✅ Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("onboarding_complete")
        .eq("id", userId)
        .maybeSingle();

      console.log("👤 Profile fetch result:", profile);

      if (profileError) {
        console.error("❌ Profile fetch failed:", profileError.message);
        setRedirectPath("/login");
        setLoading(false);
        return;
      }

      if (!profile) {
        console.warn("🆕 No profile found. Creating one now...");
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({ id: userId, onboarding_complete: false });

        if (insertError) {
          console.error("❌ Failed to insert profile:", insertError.message);
          setRedirectPath("/login");
          setLoading(false);
          return;
        }

        setRedirectPath("/questionnaire");
        setLoading(false);
        return;
      }

      // ✅ Profile exists: route based on onboarding status
      if (!profile.onboarding_complete) {
        console.warn("🛑 Onboarding incomplete. Redirecting to /questionnaire");
        setRedirectPath("/questionnaire");
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return null;
  if (redirectPath) return <Navigate to={redirectPath} replace />;

  return children;
};

export default ProtectedRoute;

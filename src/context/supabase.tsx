import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "lib/supabase";

interface SupabaseContextType {
  session: Session | null;
  //   setSession: (session: Session) => void;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
}

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SupabaseContext.Provider value={{ session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;

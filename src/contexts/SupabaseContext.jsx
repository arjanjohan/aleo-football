// SupabaseContext.js
import { createClient } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";

// Initialize Supabase client
const supabase = createClient(
  "https://xquuoulttgkeegwflrzd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxdXVvdWx0dGdrZWVnd2ZscnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMDU4ODYsImV4cCI6MjAxNTc4MTg4Nn0.QSThhxN8lKYhXorDSN6dORXr6d7X09Ka-8ZjRuzc3o8"
);

// Create a context
const SupabaseContext = createContext();

// Create a provider component
export const SupabaseProvider = ({ children }) => {
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  );
};

// Create a custom hook to use the Supabase context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};

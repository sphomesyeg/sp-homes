"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface CityContextType {
  city: string | null;
  setCity: (city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCityState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCity");
    if (stored) {
      setCityState(stored); 
    }
  }, []);

  const setCity = (city: string) => {
    setCityState(city);
    localStorage.setItem("selectedCity", city); // Store plain string
  };

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};

"use client";
import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

interface NavigationProps {
  active: string;
  setActive: (value: string) => void;
}



export const NavigationContext = createContext<NavigationProps>({
  active: "/",
  setActive: () => {},
});

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  console.log("NavigationProvider path:", path);

  const [active, setActive] = useState(path || "/");

  return (
    <NavigationContext.Provider value={{ active, setActive }}>
      {children}
    </NavigationContext.Provider>
  )
    
};


export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
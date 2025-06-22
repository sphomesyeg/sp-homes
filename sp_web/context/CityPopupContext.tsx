"use client"
import { createContext, useContext, useState } from "react";

interface CityPopupProps {
  isCityOpen: boolean;
  setCityOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export const CityPopupContext = createContext<CityPopupProps>({
  isCityOpen: false,
  setCityOpen: ()=> {}
})


export const CityPopupProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCityOpen, setCityOpen] = useState<boolean>(false);

  return (
    <CityPopupContext.Provider value={{ isCityOpen, setCityOpen }}>
      {children}
    </CityPopupContext.Provider>
  );
};



export const useCityPopup = () => {
  const context = useContext(CityPopupContext);
  if (!context) {
    throw new Error("useCityPopup must be used within a CityPopupProvider");
  }
  return context;
};
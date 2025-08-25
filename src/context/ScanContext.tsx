import React, { createContext, useState, useContext, ReactNode } from "react";

type ScanContextType = {
  currentIntroScreenIndex: number;
  setCurrentIntroScreenIndex: (index: number) => void;
};

const defaultContext: ScanContextType = {
  currentIntroScreenIndex: 0,
  setCurrentIntroScreenIndex: () => {},
};

const ScanContext = createContext<ScanContextType>(defaultContext);

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [currentIntroScreenIndex, setCurrentIntroScreenIndex] = useState(0);

  return (
    <ScanContext.Provider
      value={{ currentIntroScreenIndex, setCurrentIntroScreenIndex }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export const useScanContext = () => useContext(ScanContext);

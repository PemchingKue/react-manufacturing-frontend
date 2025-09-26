import { createContext } from "react";
import { useState } from "react";

const PartContext = createContext();

function PartProvider({ children }) {
  const [screwUsed, setScrewUsed] = useState(false);
  const [socketUsed, setSocketUsed] = useState(false);
  const [cbHousingUsed, setCbHousingUsed] = useState(false);
  const [casebackFinished, setCasebackFinished] = useState(false);

  return (
    <PartContext.Provider
      value={{
        screwUsed,
        setScrewUsed,
        socketUsed,
        setSocketUsed,
        cbHousingUsed,
        setCbHousingUsed,
        casebackFinished,
        setCasebackFinished,
      }}
    >
      {children}
    </PartContext.Provider>
  );
}

export { PartProvider, PartContext };

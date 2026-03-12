import { createContext, useContext, useEffect, useState } from "react";
import { getUnitsService } from "../services/auth.service";
import type { IUnit, IUnitContextType } from "../types/general.types";

const UnitContext = createContext<IUnitContextType | null>(null);

export const UnitProvider = ({ children }: { children: React.ReactNode }) => {

  const [units, setUnits] = useState<IUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>(() => {
    return localStorage.getItem("selectedUnit") || "";
  });

  const updateSelectedUnit = (unitId: string) => {
    setSelectedUnit(unitId);
    localStorage.setItem("selectedUnit", unitId);
  };

  const clearUnit = () => {
    setSelectedUnit("");
    localStorage.removeItem("selectedUnit");
  };

  useEffect(() => {

    const fetchUnits = async () => {
      try {
        const response = await getUnitsService();
        setUnits(response);
      } catch (err) {
        console.log("Unit Service Error", err);
      }
    };

    fetchUnits();

  }, []);

  return (
    <UnitContext.Provider value={{ units, selectedUnit, setSelectedUnit:updateSelectedUnit,clearUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);

  if (!context) {
    throw new Error("useUnit must be used within UnitProvider");
  }

  return context;
};
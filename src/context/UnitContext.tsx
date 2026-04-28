import { createContext, useContext, useEffect, useState } from "react";
import { getUnitsService } from "../services/auth.service";
import type { IUnit, IUnitContextType } from "../types/general.types";
import { useAuth } from "./AuthContext";
import { LoaderContext } from "./LoaderProvider";

const UnitContext = createContext<IUnitContextType | null>(null);

export const UnitProvider = ({ children }: { children: React.ReactNode }) => {

  const { setLoading } : any = useContext(LoaderContext);
  const { token } = useAuth()
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

    if(!token) return;

    const fetchUnits = async () => {
      try {
        setLoading(true);
        const response = await getUnitsService();
        setUnits(response.units);
      } catch (err) {
        console.log("Unit Service Error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();

  }, [token]);

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
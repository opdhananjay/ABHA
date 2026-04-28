import { createContext, useState } from "react";
import Loader from "../components/Loader/Loader";

type LoaderContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

type LoaderProviderProps = {
  children: any;
};

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
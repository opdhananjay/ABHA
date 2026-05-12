import { useLocation } from "react-router-dom";
import AbhaCard from "../../components/Card/AbhaCard";

const AbhaCardPage = () => {

  const location = useLocation();

  const { abhaNumber,transactionId } = location.state || {};

  console.log('abha card page landed',abhaNumber,transactionId);

  return <AbhaCard abhaNumber={abhaNumber || "91-3241-1134-1735"} transactionId={transactionId || "f65f194a-20ca-4550-b18c-3addc9dc97c7"} />;
  
};

export default AbhaCardPage;
import { useLocation } from "react-router-dom";
import AbhaCard from "../../components/Card/AbhaCard";

const AbhaCardPage = () => {

  const location = useLocation();

  const { abhaNumber,transactionId } = location.state || {};

  return <AbhaCard abhaNumber={abhaNumber} transactionId={transactionId} />;
  
};

export default AbhaCardPage;
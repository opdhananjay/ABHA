import { useLocation } from "react-router-dom";
import AbhaCard from "../../components/Card/AbhaCard";

const AbhaCardPage = () => {

  const location = useLocation();

  const { abhaNumber,transactionId } = location.state || {};

  console.log('abha card page landed',abhaNumber,transactionId);

  return <AbhaCard abhaNumber={"91-1787-3068-2840"} transactionId={"4e62807e-45bd-4018-8960-aeb5f6ec3340"} />;
  
};

export default AbhaCardPage;
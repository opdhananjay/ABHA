import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}:{children:React.ReactNode}) => {
    
    const { token } = useAuth();

    console.log('token',token);

    if(!token){
        return <Navigate to="/" replace />
    }

    return children;

}

export default ProtectedRoutes;
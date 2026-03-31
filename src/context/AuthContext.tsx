import { createContext, useContext, useEffect, useState } from "react";
import type { IAuthContextType, ILoginForm } from "../types/login.types";
import { loginService } from "../services/auth.service";

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
    
    const [token,setToken] = useState<string | null>(localStorage.getItem("token"));

    // Restore token on app loads 
    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }
    },[]);

    const login = async (data:ILoginForm) => {
        const response = await loginService(data);
        console.log("Login response", response);
        // var response = {
        //     "id": "2",
        //     "username": "dhananjay",
        //     "password": "pass123",
        //     "token": "xyz789token",
        //     "success": true
        // }
        if(response.success && response.statusCode == 200){
            setToken(response.data[3]);
            localStorage.setItem('token', response.token);
        }
        return response;
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem("selectedUnit");
    }

    return (
           <AuthContext.Provider value={{ token, login, logout }}>
                {children}
           </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context =  useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
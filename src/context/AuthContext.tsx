import { createContext, useContext, useState } from "react";
import type { AuthContextType, LoginForm } from "../types/login.types";
import { loginService } from "../services/auth.service";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
    
    const [token,setToken] = useState(null);

    const login = async (data:LoginForm) => {
        const response = await loginService(data);
        console.log("Login response", response);
        if(response.success && response.token){
            setToken(response.token);
            localStorage.setItem('token', response.token);
        }
        return response;
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
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
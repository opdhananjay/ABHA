import { createContext, useContext, useEffect, useState } from "react";
import type { IAuthContextType, ILoginForm } from "../types/login.types";
import { loginService } from "../services/auth.service";
import { LoaderContext } from "./LoaderProvider";

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
    
    const [token,setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user,setUser] = useState<string | null>(localStorage.getItem("user"));
    const { setLoading } : any = useContext(LoaderContext);

    // Restore token on app loads 
    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        const userName  = localStorage.getItem('user');
        if(user){
            setUser(userName);
        }
        if(storedToken){
            setToken(storedToken);
        }
    },[]);

    const login = async (data:ILoginForm) => {

        try{
            setLoading(true);
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
                setToken(response.data.data[3]);
                setUser(response.data.userId);
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', response.data.userId);
            }
          
            return response;
        }
        catch(err:any){
            console.log('err',err);
        }
        finally{
            setLoading(false);
        }
    }

    const logout = () => {
        setLoading(true);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem("selectedUnit");
        localStorage.removeItem("user");
        setLoading(false);
    }

    return (
           <AuthContext.Provider value={{ token, login, logout, user }}>
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
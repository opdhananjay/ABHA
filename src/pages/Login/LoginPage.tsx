import React, { useEffect, useState } from 'react'
import type { ILoginForm } from '../../types/login.types';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUnit } from '../../context/UnitContext';

const LoginPage = () => {

    const {clearUnit} = useUnit();
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formdata,setFormData] = useState<ILoginForm>({
        username:"",
        password:""
    });

    const [errors,setErrors] = useState({
        username:"",
        password:""
    });

    const [loginError,setLoginError] = useState<string | null>(null); // server errors

    const validateForm = ():boolean => {
        let valid = true;
        const newErrors = {username:"",password:""};
        if(formdata.username.trim() === ""){
            newErrors.username = "Username is required";
            valid = false;
        }
        if(formdata.password.trim() === ""){
            newErrors.password = "Password is required";
            valid = false;
        }
        setErrors(newErrors);
        return valid;   
    }

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Login clicked", formdata);

        setLoginError(null);
       
        if(!validateForm()){
            return;
        }

        try {
            const res  = await login(formdata);
            if(res.success){
                navigate('/unitsubscription');
                //navigate('/module');
                 
            }
            else {
                setLoginError(res.message || "Login failed");
                // clear form
                setFormData({
                    username: "",
                    password: ""
                });
            }
        }
        catch(err){
            setLoginError("Something went wrong. Please try again.");
            // clear form
            setFormData({
                username: "",
                password: ""
            });
        }
    }

    useEffect(()=>{
        clearUnit();
    },[]);

    return (
        <div className="flex justify-center items-center min-h-screen px-2">
            
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                
               <div className="text-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Login
                    </h1>
                    <p className="text-sm text-gray-500">
                        (Ayushman Bharat Digital Mission)
                    </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>

                    <div>
                        <input type="text" placeholder="Username" className="border rounded p-2 w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
                        name='username' value={formdata.username} 
                        onChange={(e)=>{
                            setFormData({...formdata,username:e.target.value})
                            setErrors({...errors,username:""})
                        }}
                        />
                       {errors.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
                    </div>
                    
                    <div>
                        <input type="password" placeholder="Password" className="border rounded p-2 w-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
                        name='password' value={formdata.password} 
                        onChange={(e)=>{
                            setFormData({...formdata,password:e.target.value})
                            setErrors({...errors,password:""})
                        }}
                        />

                        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                    </div>
                    
                    <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer">
                        Login
                    </button>

                    {loginError && <p className='text-red-500 text-sm text-center'>{loginError}</p>}

                </form>

            </div>

        </div>
    )
}

export default LoginPage;
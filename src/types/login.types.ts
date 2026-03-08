export interface LoginForm {
    username:string;
    password:string
}

export interface AuthContextType{
    token:string | null;
    login:(data:LoginForm) => any;
    logout:() => void;
}

export interface LoginResponse{
    token?:string;
    message?:string;
    success:boolean;
}
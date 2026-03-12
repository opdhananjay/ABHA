export interface ILoginForm {
    username:string;
    password:string
}

export interface IAuthContextType{
    token:string | null;
    login:(data:ILoginForm) => any;
    logout:() => void;
}

export interface ILoginResponse{
    token?:string;
    message?:string;
    success:boolean;
}
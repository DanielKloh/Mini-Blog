import { useContext, createContext } from "react";

interface User{
    uid:String,
    displayName:String,
}

const AuthContext = createContext<User>({
    uid: "",
    displayName: ""
})

export function AuthProvider({children,value}:any)  {
    return( <AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}

export function useAuthValue(){
    return useContext(AuthContext);
}
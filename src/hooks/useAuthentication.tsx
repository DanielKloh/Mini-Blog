import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import {db} from "../firebase/config";


export const useAuthentication = () => {

    db;
    const[error, setError] = useState(String);
    const[loading, setLoading] = useState(false);

    //clean
    const [cancelled,setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled()  {
        if(cancelled){
            return;
        }
    }

    const createUser = async (data:any) => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            const { user }:any = createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user,{
                displayName:data.name
            });

            setLoading(false);

            return user;

        } catch (error:any) {console.log("fjsalfjlksdjlf");
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage = "";

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";

            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";

            }else if (error.message.includes("auth/invalid-email")) {
                systemErrorMessage = "E-mail Invalido.";
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }
      
            setError(systemErrorMessage);

        }

        
    };

    useEffect(() => {
        setCancelled(true);
    },[]);

        return{auth,createUser,error,loading}
    }

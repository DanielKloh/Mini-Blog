import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut, AuthError } from "firebase/auth";
import { useState, useEffect } from "react";
import {db} from "../firebase/config";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";


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

        } catch (error:any) {
            let systemErrorMessage = "";

        if (typeof error === 'string') {
            systemErrorMessage = error; // Se for uma string, trata como mensagem de erro
        } else if (error instanceof Error && typeof error.message === 'string') {
        if (error.message.includes("auth/email-already-in-use")) {
            systemErrorMessage = "Email em uso";
        } else {
            systemErrorMessage = "Ocorreu um erro";
        }
        } else {
            systemErrorMessage = "Ocorreu um erro desconhecido";
        }
      
            setError(systemErrorMessage);

        }        
    };

    const login = async(data:any) => {

        checkIfIsCancelled();

        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage = "";

            if (typeof error === 'string') {
                systemErrorMessage = error; // Se for uma string, trata como mensagem de erro
            } else if (error instanceof Error && typeof error.message === 'string') {

            if (error.message.includes("auth/invalid-credential")) {
                systemErrorMessage = "Login ou senha incorretos";
            } else {
                systemErrorMessage = "Ocorreu um erro";
            }
            } else {
                systemErrorMessage = "Ocorreu um erro desconhecido";
            }

    setLoading(false);
    setError(systemErrorMessage);

        }
    }

    const logout = () => {
        checkIfIsCancelled();

        signOut(auth);
    }

    useEffect(() => {
        setCancelled(true);
    },[]);

        return{auth,createUser,error,loading,logout,login}
    }

import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";



const initialState ={
    loading:null,
    error:null
};

const updateReducer = (state:any, action:any) => {
    switch (action.type) {
        case "LOADING":
          return { loading: true, error: null };
        case "UPDATE_DOC":
          return { loading: false, error: null };
        case "ERROR":
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    
}

export const useUpdateDocument = (docCollection:string) => {

  const [response, dispatch] = useReducer(updateReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action:any) => {

      if(!cancelled){
          dispatch(action);
      }
  }

  const updateDocument = async(id:any, data:any) =>{
    
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {

        const docRef = await doc(db, docCollection, id);

        const updateDocument = await updateDoc(docRef, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updateDocument,
      });

    } catch (error:any) {
      console.log(error);
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
    }, []);
  
    return { updateDocument, response };
}
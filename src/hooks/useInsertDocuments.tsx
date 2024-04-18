import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";


interface Document {
  // Defina a estrutura do documento aqui
  title : String,
  image : String,
  body : String,
  tagsArray : Array<string>,
  uid : String,
  createdBy : String,
}

const initialState ={
    loading:null,
    error:null
};

const insertReducer = (state:any, action:any) => {
    switch (action.type) {
        case "LOADING":
          return { loading: true, error: null };
        case "INSERTED_DOC":
          return { loading: false, error: null };
        case "ERROR":
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    
}

export const useInsertDocuments = (docCollection:string) => {

  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action:any) => {

      if(!cancelled){
          dispatch(action);
      }
  }

  const insertDocument = async(document:Document) =>{
    
    checkCancelBeforeDispatch({ type: "LOADING" });

    try {
        const newDocument = {...document, createdAt: typeof  Timestamp.now};

        const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });

    } catch (error:any) {
      console.log(error);
      checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
    }, []);
  
    return { insertDocument, response };
}
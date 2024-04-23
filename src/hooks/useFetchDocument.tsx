import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { DocumentData, DocumentSnapshot, doc, getDoc } from "firebase/firestore";

interface Post {
    body: string,  
    createdAt: string,
    createdBy: string,    
    image: string,   
    tagsArray: [string],    
    title: string,
    uid  :string
  }
  
  

export const useFetchDocument = (docCollection:string, id:any) => {

    const [document, setDocument] = useState<Post | null>(null);;
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadDocument(){
            if(cancelled) return;

            setLoading(true);

            try {
                const docRef = await doc(db, docCollection, id);
                const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);
                
                
                setDocument(docSnap.data() as Post);
                
                setLoading(false);

            } catch (error:any) {
                console.log(error);                
                setLoading(false);
                setError(error.message)
            }

            
        }

        loadDocument();

    },[docCollection,id, cancelled]);

    useEffect( () => {
        return setCancelled(true);
    },[]);

    return {document, loading ,error};

}
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore";

export const useFetchDocuments = (docCollection:string, search:any = null, uid:any = null) => {

    const [document, setDocument] = useState(Array);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {

        async function loadData(){
            if(cancelled) return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let q;

                if(search){
                    q = await query(collectionRef, where("tagsArray","array-contains",search),orderBy("createdAt","desc"));
                }else{
                    q = await query(collectionRef, orderBy("createdAt","desc"));
                }

                await onSnapshot(q, (querySnapshot:any) => {
                    setDocument(
                        querySnapshot.docs.map((doc:any) => ({
                            id:doc.id, ...doc.data(),
                        }))
                    );
                });

                setLoading(false);

            } catch (error:any) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        }

        loadData();

    },[docCollection, document, search, uid, cancelled]);

    useEffect( () => {
        return setCancelled(true);
    },[]);

    return {document, loading ,error};

}
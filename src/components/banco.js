import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';






export function getProduct (id){
    const [ data, setData ] = useState([]);
    

    useEffect(() => {
        getDocs(collection(db, 'anuncios')).then(
            (docSnap) => {
                const users = [];
                docSnap.forEach((doc) => {
                    users.push({ 
                        ...doc.data(), 
                        id: doc.id
                    })
                })
                setData(users);
            });
    },);
    return data.find((data)=data.id == id);
}

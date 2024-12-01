import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
//====================================================================
import { useAppDispatch } from "../../../../../redux";
import { FirebaseCollectionEnum, TCustomerItem } from "../../../../../types";
import { db } from "../../../../../config";
import { setCustomers } from "../../../redux/slices";

export function useFirebaseCustomerListener() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Customer);
        onSnapshot(collectionRef, ({ docs }) => {
            const data: TCustomerItem[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id,
                    at: { created: row.at.created?.toDate() }
                } as TCustomerItem);
            });
            dispatch(setCustomers(data))
        });
    }, [dispatch])
}


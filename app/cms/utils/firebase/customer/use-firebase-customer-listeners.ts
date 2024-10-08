import { useEffect } from "react";
import { useAppDispatch } from "../../../../../redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseCollectionEnum, TCustomerItem, IConsult } from "../../../../../types";
import { db } from "../../../../../config";
import { setConsultation, setCustomers } from "../../../redux/slices";

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

export function useFirebaseConsultationListener() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Consultation);
        const q = query(collectionRef, orderBy('at.created', 'desc'))
        onSnapshot(q, ({ docs }) => {
            const data: IConsult[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id,
                    at: { created: row.at.created?.toDate() }
                } as IConsult);
            });
            dispatch(setConsultation(data))
        });
    }, [dispatch])
}

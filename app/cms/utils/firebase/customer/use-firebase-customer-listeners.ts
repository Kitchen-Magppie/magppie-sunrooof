import { useEffect } from "react";
import { useAppDispatch } from "../../../../../redux";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseCollectionEnum, TCustomerComponentItem } from "../../../../../types";
import { db } from "../../../../../config";
import { setConsultation, setCustomerSiteComponent } from "../../../redux/slices";
import { IConsult } from "../../../../../types/consultation";

export function useFirebaseCustomerListener() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Component);

        onSnapshot(collectionRef, ({ docs }) => {
            const data: TCustomerComponentItem[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id,
                    at: { created: row.at.created?.toDate() }
                } as TCustomerComponentItem);
            });
            dispatch(setCustomerSiteComponent(data))
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

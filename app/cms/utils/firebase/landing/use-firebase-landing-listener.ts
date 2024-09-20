import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch } from "../../../../../redux";
import { FirebaseCollectionEnum, TCustomerComponentItem } from "../../../../../types";
import { db } from "../../../../../config/firebase.config";
import { setLanding } from "../../../redux/slices";

export function useFirebaseLandingListener() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Landing);
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
            dispatch(setLanding(data))
        });
    }, [dispatch])
}

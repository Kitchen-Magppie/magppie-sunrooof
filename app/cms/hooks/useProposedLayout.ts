import { useEffect } from "react"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
//====================================================================
import { _, FirebaseCollectionEnum, IProposedLayoutItem } from "../../../types"
import { db } from "../../../config"
import { setProposedLayouts, useAppDispatch } from "../../../redux"

export function useProposedLayoutAction() {
    return ({
        add: (row: Omit<IProposedLayoutItem, 'id'>) => {
            addDoc(collection(db, COLLECTION), _.omit(row, ['id']))
        },
    })
}

export function useProposedLayoutListener() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.ProposedLayout);
        onSnapshot(collectionRef, ({ docs }) => {
            const data: IProposedLayoutItem[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id
                } as IProposedLayoutItem);
            });
            dispatch(setProposedLayouts(data))

        });
    }, [dispatch])
}

const COLLECTION = FirebaseCollectionEnum.ProposedLayout

import { useCallback, useEffect } from "react"
import { addDoc, collection, onSnapshot, writeBatch, doc } from "firebase/firestore"
//====================================================================
import { _, FirebaseCollectionEnum, IProposedLayoutItem } from "../../../types"
import { db } from "../../../config"
import { setProposedLayouts, useAppDispatch } from "../../../redux"

export function useProposedLayoutAction() {
    const add = useCallback((row: Omit<IProposedLayoutItem, 'id' | 'at'>) => {
        return addDoc(collection(db, COLLECTION), _.omit({
            ...row,
            at: { created: new Date() }
        }, ['id']))
    }, [])
    return ({
        add,
        batch: {
            remove: (arr: string[]) => {
                const batch = writeBatch(db)

                arr?.forEach((id) => {

                    const docRef = doc(db, '/proposed-layouts', id)
                    batch.delete(docRef)
                });
                return batch.commit()
            }
        }

    })
}
// export function useProposedLayoutAction() {
//     const add = useCallback(async (row: Omit<IProposedLayoutItem, 'id' | 'at'>) => {
//         const results = await addDoc(collection(db, COLLECTION), _.omit({
//             ...row,
//             at: { created: new Date() }
//         }, ['id']))
//         return results.id;
//     }, [])

//     return ({ add })
// }

export function useProposedLayoutListener() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.ProposedLayout);
        onSnapshot(collectionRef, ({ docs }) => {
            const data: IProposedLayoutItem[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                row.id = doc.id
                row.at.created = row?.at?.created?.toDate()
                data.push(row as IProposedLayoutItem);
            });
            dispatch(setProposedLayouts(data))

        });
    }, [dispatch])
}

const COLLECTION = FirebaseCollectionEnum.ProposedLayout

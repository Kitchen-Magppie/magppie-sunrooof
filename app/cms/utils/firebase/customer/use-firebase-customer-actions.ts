import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { TComponentItem, _, FirebaseCollectionEnum } from "../../../../../types"
import { db } from "../../../../../config"

export function useFirebaseCustomerSiteComponentAction() {
    return ({
        add: (row: Omit<TComponentItem, 'id'>) => {
            addDoc(collection(db, FirebaseCollectionEnum.Landing), _.omit(row, ['id']))
        },
        edit: (row: TComponentItem) => {
            updateDoc(doc(db, `${FirebaseCollectionEnum.Landing}/${row.id}`), _.omit(row, ['id']))
        },
        remove: (id: string) => {
            const docRef = doc(db, `${FirebaseCollectionEnum.Landing}/${id}`)
            deleteDoc(docRef)
        },
    })
}


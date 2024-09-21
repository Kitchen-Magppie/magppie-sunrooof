import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { _, FirebaseCollectionEnum, TCustomerComponentItem } from "../../../../../types"
import { db } from "../../../../../config"

export function useFirebaseCustomerSiteComponentAction() {
    return ({
        add: (row: Omit<TCustomerComponentItem, 'id'>) => {
            addDoc(collection(db, FirebaseCollectionEnum.Landing), _.omit(row, ['id']))
        },
        edit: (row: TCustomerComponentItem) => {
            updateDoc(doc(db, `${FirebaseCollectionEnum.Landing}/${row.id}`), _.omit(row, ['id']))
        },
        remove: (id: string) => {
            const docRef = doc(db, `${FirebaseCollectionEnum.Landing}/${id}`)
            deleteDoc(docRef)
        },
    })
}


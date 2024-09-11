import { addDoc, collection, deleteDoc, doc } from "firebase/firestore"
import _ from "lodash"
import { TComponentItem } from "../../../../../types/component"
import { db } from "../../../../../config/firebase.config"

export function useFirebaseCustomerSiteComponentActions() {
    return ({
        add: (row: TComponentItem) => {
            addDoc(collection(db, NAME), _.omit(row, ['id']))
        },
        remove: (id: string) => {
            const docRef = doc(db, `${NAME}/${id}`)
            deleteDoc(docRef)
        },
    })
}


const NAME = 'customer-site-components'

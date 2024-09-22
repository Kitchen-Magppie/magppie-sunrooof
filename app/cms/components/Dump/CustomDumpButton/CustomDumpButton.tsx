import { _, FirebaseCollectionEnum } from "../../../../../types"
import { db, firestore } from "../../../../../config"
// import { _LANDING_COMPONENTS } from "../../../../../types"
// import { FAQ_COMPONENT_ITEM } from "../../../../../mocks"

import { DEFAULT_CUSTOMER } from "../../../mocks"

export default function CustomDumpButton() {
    return <button onClick={() => {
        const { addDoc, collection } = firestore
        addDoc(collection(db, FirebaseCollectionEnum.Customer), _.omit(DEFAULT_CUSTOMER, ['id']))
        // []?.forEach((row) => {
        //     addDoc(collection(db, 'landing'), _.omit(row, ['id']))
        // })
    }}>
        Call
    </button>
}

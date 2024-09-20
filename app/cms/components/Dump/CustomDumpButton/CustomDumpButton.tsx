import _ from "lodash"
import { db, firestore } from "../../../../../config"
// import { _LANDING_COMPONENTS } from "../../../../../types"
// import { FAQ_COMPONENT_ITEM } from "../../../../../mocks"

export default function CustomDumpButton() {
    return <button onClick={() => {
        const { addDoc, collection } = firestore
        // addDoc(collection(db, 'landing'), _.omit(FAQ_COMPONENT_ITEM, ['id']))
        []?.forEach((row) => {
            addDoc(collection(db, 'landing'), _.omit(row, ['id']))
        })
    }}>
        Call
    </button>
}

import { useCallback, useMemo } from "react"
import { auth, db, firestore } from "../../../../config/firebase.config";
import { TKitchen } from "../../types/Kitchen";
import _ from "lodash";

export function useFirebaseCmsAuthAction() {
    const q = auth.getAuth()
    return useMemo(() => ({
        signIn: (row: TCredential) => auth?.signInWithEmailAndPassword(q, row.email, row.password),
        signUp: (row: TCredential) => auth?.createUserWithEmailAndPassword(q, row.email, row.password),
        signOut: () => {
            auth?.signOut(q)
        }
    }), [q])
}

export function useFirebaseCmsKitchenAction() {

    const add = useCallback((item: Partial<TKitchen>) => {
        const { addDoc, collection } = firestore
        addDoc(collection(db, 'kitchens'), _.omit(item, ['id', 'createdAt']))
    }, [])

    const edit = useCallback((item: Partial<TKitchen & { id: string }>) => {
        const { doc, updateDoc } = firestore;
        if (item?.id?.length) {
            const docRef = doc(db, `kitchens/${item.id}`);
            updateDoc(docRef, _.omit(item, ['id', 'createdAt']));
        }
    }, [])
    const remove = useCallback((id: string) => {
        const { doc, deleteDoc } = firestore;
        const docRef = doc(db, `kitchens/${id}`);
        deleteDoc(docRef)
    }, [])

    return ({ add, edit, remove });
}

type TCredential = { email: string, password: string }



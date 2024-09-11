import { useCallback, useMemo } from 'react'
import { auth, db, firestore } from '../../../../../config/firebase.config'
import _ from 'lodash'
import { ISuperUser } from '../../../types/SuperUser'

export function useFirebaseCmsAuthAction() {
    const q = auth.getAuth()
    return useMemo(
        () => ({
            signIn: (row: TCredential) =>
                auth?.signInWithEmailAndPassword(q, row.email, row.password),
            signUp: (row: TCredential) =>
                auth?.createUserWithEmailAndPassword(
                    q,
                    row.email,
                    row.password
                ),
            signOut: () => {
                auth?.signOut(q)
            },
        }),
        [q]
    )
}

export function useFirebaseCmsUserAction() {
    const add = useCallback((item: Partial<ISuperUser>) => {
        const { addDoc, collection } = firestore
        addDoc(collection(db, 'super-users'), item)
    }, [])

    const edit = useCallback((item: Partial<ISuperUser & { id: string }>) => {
        const { doc, updateDoc } = firestore
        if (item?.id?.length) {
            const docRef = doc(db, `super-users/${item.id}`)
            updateDoc(docRef, _.omit(item, ['id', 'createdAt']))
        }
    }, [])

    const remove = useCallback((id: string) => {
        const { doc, deleteDoc } = firestore
        const docRef = doc(db, `super-users/${id}`)
        deleteDoc(docRef)
    }, [])

    return { add, edit, remove }
}

type TCredential = { email: string; password: string }

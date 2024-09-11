import { useMemo } from "react"
import { auth } from "../../config/firebase.config";

export function useFirebaseActionAuth() {
    const q = auth.getAuth()
    return useMemo(() => ({
        signIn: (row: TCredential) => auth?.signInWithEmailAndPassword(q, row.email, row.password),
        signUp: (row: TCredential) => auth?.createUserWithEmailAndPassword(q, row.email, row.password),
    }), [q])
}

type TCredential = { email: string, password: string }

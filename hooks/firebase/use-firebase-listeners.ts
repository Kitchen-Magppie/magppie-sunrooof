import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//====================================================================

import { auth } from "../../config/firebase.config";
import { useAppDispatch } from "../../redux";
const { getAuth, onAuthStateChanged } = auth;
export function useFirebaseAuth() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const q = getAuth()
        onAuthStateChanged(q, (user) => {
            // let result: IUser | null = null
            if (user?.email) {
                console.log(user)
                // result = {
                //     ...INIT_USER,
                //     id: _.get(user, 'reloadUserInfo.localId'),
                //     email: user?.email
                // }
            }
            // dispatch(setUser(result))
        });
    }, [dispatch, navigate]);
}


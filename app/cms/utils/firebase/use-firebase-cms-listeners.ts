import { useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, Timestamp, } from 'firebase/firestore';
//====================================================================

import { db, auth } from "../../../../config/firebase.config"
import { useAppDispatch } from '../../../../redux';
import { setSuperUsers } from '../../redux/slices/SuperUser.slice';
import { INIT_SUPER_USER, ISuperUser } from '../../types/SuperUser';
import { setAuth, setAuthSignOut } from '../../redux/slices/Auth.slice';
import { TKitchen } from '../../types/Kitchen';
import { setKitchens } from '../../redux/slices/Kitchen.slice';
import { TProject } from '../../types/Project';
import { setProjects } from '../../redux/slices/Project.slice';
import { FirebaseCollectionEnum, TCustomerItem } from '../../../../types';
import { setCustomerSiteComponent } from '../../redux/slices';
const { getAuth, onAuthStateChanged } = auth;

export function useFirebaseCmsAuthListener() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const q = getAuth()
        onAuthStateChanged(q, (user) => {
            if (user?.email?.length) {
                const id = user.uid
                getDoc(doc(db, FirebaseCollectionEnum.SuperUser, id)).then((doc) => {
                    dispatch(setAuth({
                        ...INIT_SUPER_USER,
                        id,
                        email: user.email,
                        ...doc.data()
                    } as ISuperUser))
                })
            } else {
                console.log('Not logged-in')
                dispatch(setAuthSignOut(undefined))
            }
        });
    }, [dispatch]);
}

export const useFirebaseCmsSuperUsersListener = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.SuperUser);

        onSnapshot(collectionRef, ({ docs }) => {
            const data: ISuperUser[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...INIT_SUPER_USER,
                    ...row,
                    id: doc.id
                } as ISuperUser);
            });
            dispatch(setSuperUsers(data))

        });
    }, [dispatch])
}



export const useFirebaseCmsKitchensListener = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Kitchen);

        onSnapshot(collectionRef, ({ docs }) => {
            const data: TKitchen[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id
                } as TKitchen);
            });
            dispatch(setKitchens(data))

        });
    }, [dispatch])
}



export function useFirebaseCmsSiteComponentListener() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Component);

        onSnapshot(collectionRef, ({ docs }) => {
            const data: TCustomerItem[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id,
                    at: {
                        created: (row.at.created as Timestamp).toDate(),
                        updated: (row.at.updated as Timestamp).toDate(),
                    }
                } as TCustomerItem);
            });
            dispatch(setCustomerSiteComponent(data))

        });
    }, [dispatch])
}

export const useFirebaseCmsProjectsListener = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const collectionRef = collection(db, FirebaseCollectionEnum.Project);

        onSnapshot(collectionRef, ({ docs }) => {
            const data: TProject[] = [];
            docs?.forEach((doc) => {
                const row = doc.data();
                data.push({
                    ...row,
                    id: doc.id
                } as TProject);
            });
            dispatch(setProjects(data))

        });
    }, [dispatch])
}

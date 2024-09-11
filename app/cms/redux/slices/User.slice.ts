import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISuperUser } from '../../types/SuperUser';
import { FirebaseCollectionEnum } from '../../../../types';


interface IUserSlice {
    value: ISuperUser[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IUserSlice = {
    loading: true,
    status: 'loading',
    error: null,
    value: []
};

type TAction = PayloadAction<ISuperUser[]>

const UserSlice = createSlice({
    name: FirebaseCollectionEnum.User,
    initialState,
    reducers: {
        setUsers: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const { setUsers } = UserSlice.actions;

export const UserReducer = UserSlice.reducer

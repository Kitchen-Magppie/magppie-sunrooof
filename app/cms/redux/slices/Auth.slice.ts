import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISuperUser } from '../../types/SuperUser';


interface IAuthSlice {
    value?: ISuperUser;
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IAuthSlice = {
    loading: true,
    status: 'loading',
    error: null,
};

type TAction = PayloadAction<ISuperUser>
const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setAuthLoading: (state, action?: PayloadAction<boolean>) => {
            state.status = action.payload ? 'loading' : 'success';
            state.loading = action.payload;
        },
        setAuth: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
        setAuthSignOut: (state) => {
            state.status = 'success';
            state.loading = false;
            state.value = undefined;
        },
    },
});

export const { setAuth, setAuthSignOut, setAuthLoading } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISuperUser } from '../../types/SuperUser';


interface ISuperUserSlice {
    value: ISuperUser[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: ISuperUserSlice = {
    loading: true,
    status: 'loading',
    error: null,
    value: []
};

type TAction = PayloadAction<ISuperUser[]>

const SuperUserSlice = createSlice({
    name: 'SuperUsers',
    initialState,
    reducers: {
        setSuperUsers: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const { setSuperUsers } = SuperUserSlice.actions;

export const SuperUserReducer = SuperUserSlice.reducer

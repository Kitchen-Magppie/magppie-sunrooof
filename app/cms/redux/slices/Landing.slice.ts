import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//====================================================================
import { FirebaseCollectionEnum, TCustomerItem } from '../../../../types';

interface ILandingSlice {
    value: TCustomerItem[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: ILandingSlice = {
    loading: true,
    value: [],
    // value: _LANDING_COMPONENTS,
    status: 'loading',
    error: null,
};

type TAction = PayloadAction<TCustomerItem[]>
const LandingSlice = createSlice({
    name: FirebaseCollectionEnum.Landing,
    initialState,
    reducers: {
        setLanding: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const { setLanding } = LandingSlice.actions;

export const LandingReducer = LandingSlice.reducer

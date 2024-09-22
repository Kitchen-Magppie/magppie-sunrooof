import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCustomerItem } from '../../../../types';


interface ICustomerSlice {
    value: TCustomerItem[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: ICustomerSlice = {
    loading: true,
    value: [],
    status: 'loading',
    error: null,
};

type TAction = PayloadAction<TCustomerItem[]>
const CustomerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {
        setCustomers: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const {
    setCustomers
} = CustomerSlice.actions;

export const CustomerReducer = CustomerSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCustomerItem } from '../../../../types/component';


interface ICustomerSiteComponentSlice {
    value: TCustomerItem[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: ICustomerSiteComponentSlice = {
    loading: true,
    value: [],
    status: 'loading',
    error: null,
};

type TAction = PayloadAction<TCustomerItem[]>
const CustomerSiteComponentSlice = createSlice({
    name: 'CustomerSiteComponent',
    initialState,
    reducers: {
        setCustomerSiteComponent: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const {
    setCustomerSiteComponent
} = CustomerSiteComponentSlice.actions;

export const CustomerSiteComponentReducer = CustomerSiteComponentSlice.reducer

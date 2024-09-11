import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TKitchen } from '../../types/Kitchen';



interface IKitchenSlice {
    value: TKitchen[];
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IKitchenSlice = {
    loading: true,
    status: 'loading',
    error: null,
    value: []
};

type TAction = PayloadAction<TKitchen[]>
const KitchensSlice = createSlice({
    name: 'Kitchens',
    initialState,
    reducers: {
        setKitchens: (state, action: TAction) => {
            state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },
    },
});

export const { setKitchens } = KitchensSlice.actions;

export const KitchenReducer = KitchensSlice.reducer

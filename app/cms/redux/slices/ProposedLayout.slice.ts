import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//====================================================================
import { IProposedLayoutItem } from '../../types';
import { FirebaseCollectionEnum } from '../../../../types';

interface IProposedLayoutSlice {
    value?: IProposedLayoutItem[];
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IProposedLayoutSlice = {
    loading: true,
    error: null,
};

type TAction = PayloadAction<IProposedLayoutItem[]>
const ProposedLayoutSlice = createSlice({
    name: FirebaseCollectionEnum.ProposedLayout,
    initialState,
    reducers: {
        setProposedLayouts: (state, action: TAction) => {
            state.loading = false;
            state.value = action.payload;
        },

    },
});

export const { setProposedLayouts } = ProposedLayoutSlice.actions;

export const ProposedLayoutReducer = ProposedLayoutSlice.reducer

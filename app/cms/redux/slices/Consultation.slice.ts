import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConsult } from "../../../../types/consultation";
import { FirebaseCollectionEnum } from '../../../../types';

interface IConsultationSlice {
    value?: IConsult[];
    // status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IConsultationSlice = {
    loading: true,
    // status: 'loading',
    error: null,
};

type TAction = PayloadAction<IConsult[]>
const ConsultationSlice = createSlice({
    name: FirebaseCollectionEnum.Consultation,
    initialState,
    reducers: {
        setConsultationLoading: (state, action?: PayloadAction<boolean>) => {
            // state.status = action.payload ? 'loading' : 'success';
            state.loading = action.payload;
        },
        setConsultation: (state, action: TAction) => {
            // state.status = 'success';
            state.loading = false;
            state.value = action.payload;
        },

    },
});

export const { setConsultation, setConsultationLoading } = ConsultationSlice.actions;

export const ConsultationReducer = ConsultationSlice.reducer

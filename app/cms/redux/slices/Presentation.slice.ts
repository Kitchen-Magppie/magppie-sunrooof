import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPresentation = {
    file?: File,
}

interface IPresentationSlice {
    value?: TPresentation;
    status: 'loading' | 'success' | 'failed';
    loading: boolean,
    error: null | string | undefined;
}

const initialState: IPresentationSlice = {
    loading: true,
    status: 'loading',
    error: null,
};

const PresentationSlice = createSlice({
    name: 'Presentation',
    initialState,
    reducers: {
        setPresentationFile: (state, action?: PayloadAction<File | undefined>) => {
            state.status = action.payload ? 'loading' : 'success';
            state.value.file = action.payload;
        },
    },
});

export const { setPresentationFile } = PresentationSlice.actions;

export const PresentationReducer = PresentationSlice.reducer

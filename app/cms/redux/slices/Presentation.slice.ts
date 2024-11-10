import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPresentation = {
    file?: File,
    title: string,
    name: string,
    // sunrooofCount: number,
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
        setPresentationData: (state, action?: PayloadAction<TPresentation>) => {
            state.status = action.payload ? 'loading' : 'success';
            state.value = action.payload
        },
        setPresentationFile: (state, action?: PayloadAction<File | undefined>) => {
            state.status = action.payload ? 'loading' : 'success';
            if (state.value && 'file' in state.value) {
                state.value.file = action.payload
            } else {
                state.value = { ...state.value, file: action.payload }
            }
        },
        setPresentationTitle: (state, action?: PayloadAction<string>) => {
            state.status = action.payload ? 'loading' : 'success';
            if (state.value && 'file' in state.value) {
                state.value.title = action.payload
            } else {
                state.value = { ...state.value, title: action.payload }
            }
        },
        setPresentationName: (state, action?: PayloadAction<string>) => {
            state.status = action.payload ? 'loading' : 'success';
            if (state.value && 'file' in state.value) {
                state.value.name = action.payload
            } else {
                state.value = { ...state.value, name: action.payload }
            }
        },
    },
});

export const { setPresentationData } = PresentationSlice.actions;

export const PresentationReducer = PresentationSlice.reducer

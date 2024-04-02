import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allNotes: null,
    deletedNotes: null,
    archivedNotes: null,
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setAllNotes(state, action) {
            state.allNotes = action.payload
        },
        setDeletedNotes(state, action) {
            state.deletedNotes = action.payload
        }, 
        setArchivedNotes(state, action) {
            state.archivedNotes = action.payload
        }
    },
});

export const { setAllNotes, setDeletedNotes, setArchivedNotes } = notesSlice.actions;
export default notesSlice.reducer;
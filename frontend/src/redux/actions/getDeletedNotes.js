import axios from "axios";
import { setDeletedNotes } from "../slices/notesSlice"

const getDeletedNotes = (userId) => {
    const endpoint = axios.defaults.baseURL + "note/deleted/" + userId;
   
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint)
            const data = response.data;

            return dispatch(setDeletedNotes(data));
        } catch (error) {
            console.error(error);

            if (error.response.status === 404) {
                dispatch(setDeletedNotes([]));
            }
        };
    };
};

export default getDeletedNotes;
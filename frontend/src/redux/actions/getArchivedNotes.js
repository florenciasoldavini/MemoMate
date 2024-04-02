import axios from "axios";
import { setArchivedNotes } from "../slices/notesSlice"

const getArchivedNotes = (userId) => {
    const endpoint = axios.defaults.baseURL + "note/archived/" + userId;
   
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint)
            const data = response.data;

            return dispatch(setArchivedNotes(data));
        } catch (error) {
            console.error(error);

            if (error.response.status === 404) {
                dispatch(setArchivedNotes([]));
            }
        };
    };
};

export default getArchivedNotes;
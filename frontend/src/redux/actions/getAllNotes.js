import axios from "axios";
import { setAllNotes } from "../slices/notesSlice";

const getAllNotes = (userId, filters) => {
    const endpoint = axios.defaults.baseURL + "note/" + userId;
    const serializedFilters = JSON.stringify(filters);

    console.log("filters: ", filters);
   
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint, { params: { filters: serializedFilters } });
            const data = response.data;

            return dispatch(setAllNotes(data));
        } catch (error) {
            console.error(error);

            if (error.response.status === 404) {
                dispatch(setAllNotes([]));
            }
        };
    };
};

export default getAllNotes;

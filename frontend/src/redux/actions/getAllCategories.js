import axios from "axios";
import { setAllCategories } from "../slices/categoriesSlice";

const getAllCategories = (userId) => {
    const endpoint = axios.defaults.baseURL + "category/" + userId;
   
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint)
            const data = response.data;

            return dispatch(setAllCategories(data));
        } catch (error) {
            console.error(error);

            if (error.response.status === 404) {
                dispatch(setAllCategories([]));
            }
        };
    };
};

export default getAllCategories;
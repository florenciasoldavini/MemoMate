import axios from "axios";

const createNote = async (userId, categoryName) => {
    const endpoint = axios.defaults.baseURL + "category/" + userId;

    try {
        await axios.post(endpoint, {categoryName})

        const creationStatus = {
            status: "Success",
            message: "Category successfully created"
        };

        return creationStatus;
    } catch (error) {
        console.error(error);
    };
};

export default createNote;
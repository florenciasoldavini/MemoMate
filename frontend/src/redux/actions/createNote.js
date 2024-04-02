import axios from "axios";

const createNote = async (userId, note) => {
    const endpoint = axios.defaults.baseURL + "note/" + userId;

    try {
        await axios.post(endpoint, {note})

        const creationStatus = {
            status: "Success",
            message: "Note successfully created"
        };

        return creationStatus;
    } catch (error) {
        console.error(error);
    };
};

export default createNote;
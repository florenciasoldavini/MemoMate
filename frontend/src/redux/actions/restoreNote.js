import axios from "axios";

const restoreNote = async (noteId) => {
    const endpoint = axios.defaults.baseURL + "note/restore/" + noteId;

    try {
        await axios.put(endpoint)

        return
    } catch (error) {
        console.error(error);
    };
};

export default restoreNote;
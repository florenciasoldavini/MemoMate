import axios from "axios";

const deleteNote = async (noteId) => {
    const endpoint = axios.defaults.baseURL + "note/delete/" + noteId;

    try {
        await axios.put(endpoint)

        return
    } catch (error) {
        console.error(error);
    };
};

export default deleteNote;
import axios from "axios";

const unarchiveNote = async (noteId) => {
    const endpoint = axios.defaults.baseURL + "note/unarchive/" + noteId;

    try {
        await axios.put(endpoint)

        return
    } catch (error) {
        console.error(error);
    };
};

export default unarchiveNote;
import axios from "axios";

const archiveNote = async (noteId) => {
    const endpoint = axios.defaults.baseURL + "note/archive/" + noteId;

    try {
        await axios.put(endpoint)

        return
    } catch (error) {
        console.error(error);
    };
};

export default archiveNote;
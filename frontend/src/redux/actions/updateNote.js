import axios from "axios";

const updateNote = async (noteId, note) => {
    const endpoint = axios.defaults.baseURL + "note/" + noteId;

    console.log(noteId);
    console.log(note);

    try {
        await axios.put(endpoint, {note})

        const updateStatus = {
            status: "Success",
            message: "Note successfully created"
        };

        return updateStatus;
    } catch (error) {
        console.error(error);
    };
};

export default updateNote;
const restoreNoteController = require('../../controllers/noteControllers/restoreNoteController');

const restoreNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        if(!noteId) {
            return res.status(400).json({ error: "ID is required" });
        }

        const noteRestored = await restoreNoteController(noteId);

        if(!noteRestored) {
            throw new Error('Failed to restore Note');
        }

        res.status(200).json(noteRestored);

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        return res.status(500).json({ error: error.message });
    }
};

module.exports = restoreNote;
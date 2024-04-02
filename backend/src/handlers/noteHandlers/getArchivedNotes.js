const getArchivedNotesController = require('../../controllers/noteControllers/getArchivedNotesController');

const getDeletedNotes = async (req, res) => {
    try {
        const { userId } = req.params;

        const notesFound = await getArchivedNotesController(userId);

        if(!notesFound || notesFound.length === 0) {
            return res.status(404).json({ error: "No Notes found" });
        }

        res.status(200).json(notesFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = getDeletedNotes;
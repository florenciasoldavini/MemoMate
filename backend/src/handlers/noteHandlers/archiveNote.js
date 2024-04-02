const archiveNoteController = require('../../controllers/noteControllers/archiveNoteController');

const archiveNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        const noteArchived = await archiveNoteController(noteId);

        if(!noteArchived) {
            throw new Error('Failed to archive Note');
        }        
        
        res.status(200).json({
            message: "Note archived successfully",
            noteArchived 
        });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        return res.status(500).json({ error: error.message });
    }
};

module.exports = archiveNote;

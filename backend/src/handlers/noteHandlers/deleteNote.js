const deleteNoteController = require('../../controllers/noteControllers/deleteNoteController');

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;

        const noteDeleted = await deleteNoteController(noteId);

        if(!noteDeleted) {
            throw new Error('Failed to delete Note');
        }        
        
        res.status(200).json({
            message: "Note deleted successfully",
            noteDeleted 
        });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        return res.status(500).json({ error: error.message });
    }
};

module.exports = deleteNote;

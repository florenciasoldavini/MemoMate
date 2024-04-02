const { Note } = require('../../db');

const restoreNoteController = async (noteId) => {
    try {
        const noteFound = await Note.findByPk(noteId);

        if (!noteFound) {
            const error = new Error("Note not found for restoration");
            error.statusCode = 404; 
            throw error;
        }

        if (!noteFound.deleted) {
            const error = new Error("Cannot restore Note because it's not deleted");
            error.statusCode = 400; 
            throw error;
        }
        
        await noteFound.update({
            deleted: false 
        });

        return noteFound;

    } catch (error) {
        console.error('Error restoring Note:', error);
        throw error;
    }
}

module.exports = restoreNoteController;
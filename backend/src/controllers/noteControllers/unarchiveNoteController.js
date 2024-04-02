const { Note } = require('../../db');

const unarchiveNoteController = async (noteId) => {
    try {
        const noteFound = await Note.findByPk(noteId);

        if (!noteFound) {
            const error = new Error("Note not found for unarchiving");
            error.statusCode = 404; 
            throw error;
        }

        if (!noteFound.archived) {
            const error = new Error("Cannot unarchive Note because it's not archived");
            error.statusCode = 400; 
            throw error;
        }
        
        await noteFound.update({
            archived: false 
        });

        return noteFound;

    } catch (error) {
        console.error('Error unarchiving Note:', error);
        throw error;
    }
}

module.exports = unarchiveNoteController;
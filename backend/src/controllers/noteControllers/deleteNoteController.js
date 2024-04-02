const { Note } = require('../../db');

const deleteNoteController = async (noteId) => {
    try {
        const noteFound = await Note.findByPk(noteId);

        if (!noteFound) {
            const error = new Error("Note not found for deleting");
            error.statusCode = 404; 
            throw error;
        }

        if (noteFound.deleted) {
            const error = new Error("Note is already deleted");
            error.statusCode = 400;
            throw error;
        }

        await noteFound.update( 
            { deleted: true }, 
        );

        return noteFound;

    } catch (error) {
        console.error('Error deleting Note:', error);
        throw error;
    };
};

module.exports = deleteNoteController;
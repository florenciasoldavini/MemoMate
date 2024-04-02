const { Note } = require('../../db');

const archiveNoteController = async (noteId) => {
    try {
        const noteFound = await Note.findByPk(noteId);

        if (!noteFound) {
            const error = new Error("Note not found for archiving");
            error.statusCode = 404; 
            throw error;
        }

        if (noteFound.archived) {
            const error = new Error("Note is already archived");
            error.statusCode = 400;
            throw error;
        }

        await noteFound.update( 
            { archived: true }, 
        );

        return noteFound;

    } catch (error) {
        console.error('Error archiving Note:', error);
        throw error;
    };
};

module.exports = archiveNoteController;
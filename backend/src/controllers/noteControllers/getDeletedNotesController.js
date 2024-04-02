const { Note } = require("../../db");

const getDeletedNotesController = async (userId) => {
    try {
        const notesFound = await Note.findAll({
            where: {
                UserId: userId,
                deleted: true
            },
        });

        return notesFound;

    } catch (error) {
        console.error("Error searching deleted Notes: ", error);
        throw error;
    };
};

module.exports = getDeletedNotesController;
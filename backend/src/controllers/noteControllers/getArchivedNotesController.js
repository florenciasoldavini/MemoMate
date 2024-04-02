const { Note } = require("../../db");

const getArchivedNotesController = async (userId) => {
    try {
        const notesFound = await Note.findAll({
            where: {
                UserId: userId,
                deleted: false,
                archived: true
            },
        });

        return notesFound;

    } catch (error) {
        console.error("Error searching archived Notes: ", error);
        throw error;
    };
};

module.exports = getArchivedNotesController;
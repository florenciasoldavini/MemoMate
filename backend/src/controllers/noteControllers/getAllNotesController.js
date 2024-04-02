const { Note, Category } = require("../../db");
const { Op } = require("sequelize"); // Import Op from sequelize

const getAllNotesController = async (userId, filters) => {
    try {
        let notesFound = await Note.findAll({
            where: {
                UserId: userId,
                deleted: false,
                archived: false,
            },
            include: [{
                model: Category,
                attributes: ['name'],
                through: { attributes: [] }, // Exclude the join table attributes from the result
            }],
        });

        if (filters && filters.length) {
            notesFound = notesFound.filter(note => {
                return note.Categories.some(category => filters.includes(category.name));
            });
        }

        return notesFound;
    } catch (error) {
        console.error("Error searching Notes: ", error);
        throw error;
    };
};

module.exports = getAllNotesController;

const { Note, Category } = require("../../db");

const postNoteController = async (title, content, userId) => {
    try {
        const noteFound = await Note.findOne({
            where: {
                title,
                deleted: false
            }
        });

        if (noteFound) {
            const error = new Error('Note already exists');
            error.statusCode = 409;
            throw error;
        }

        const noteCreated = await Note.create({
            title,
            content,
            UserId: userId
        });

        return noteCreated;
    } catch (error) {
        console.error("Error creating Note: ", error);
        throw error;
    };
};

module.exports = postNoteController;

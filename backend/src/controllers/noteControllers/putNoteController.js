const { Note, Category } = require("../../db");
const note = require("../../models/note");

const putNoteController = async (title, content, tags, noteId) => {
    try {
        const noteFound = await Note.findOne({
            where: {
                id: noteId
            }
        });

        if (!noteFound) {
            const error = new Error("Note not found for deleting");
            error.statusCode = 404;
            throw error;
        }

        if (title !== noteFound.title || content !== noteFound.content) { 
            await Note.update({
                title,
                content,
            }, {
                where: {
                    id: noteId
                }
            });
        }

        if (tags) {
            await noteFound.setCategories([]);

            for (const categoryName of tags) {
                const categoryFound = await Category.findOne({
                    where: {
                        name: categoryName, 
                        deleted: false
                    }
                });
    
                if (categoryFound) {
                    await noteFound.addCategory(categoryFound);
                } else {
                    console.log(`Category "${categoryName}" not found.`);
                };
            }
        };

        const noteUpdated = await Note.findOne({
            where: {
                id: noteId
            }
        });


        return noteUpdated;
    } catch (error) {
        console.error("Error updating Note: ", error);
        throw error;
    };
};

module.exports = putNoteController;

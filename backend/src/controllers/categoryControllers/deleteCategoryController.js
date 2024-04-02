const { Category } = require("../../db");

const deleteCategoryController = async () => {
    try {
        const categoryFound = await Category.findByPk(categoryId);

        if (!categoryFound) {
            const error = new Error('No Category found for deleting');
            error.statusCode = 409; 
            throw error;
        }
        
        if (categoryFound.deleted) {
            const error = new Error("Category already deleted");
            error.statusCode = 400; 
            throw error;
        }

        await categoryFound.update(
            { deleted: true }
        );

        return categoryFound;

    } catch (error) {
        console.error("Error deleting Category: ", error);
        throw error;
    }
};

module.exports = deleteCategoryController;
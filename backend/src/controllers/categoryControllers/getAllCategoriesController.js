const { Category } = require("../../db");

const getAllCategoriesController = async (userId) => {
    try {
        const categoriesFound = await Category.findAll({
            where: {
                UserId: userId,
                deleted: false
            },
        });

        return categoriesFound;

    } catch (error) {
        console.error("Error searching Categories: ", error);
        throw error;
    };
};

module.exports = getAllCategoriesController;
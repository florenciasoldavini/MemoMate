const { Category } = require("../../db");

const postCategoryController = async (categoryName, userId) => {
    try {
        const categoryFound = await Category.findOne(
            {
                where: {
                    name: categoryName,
                    deleted: false
                }
            }
        );

        if (categoryFound) {
            const error = new Error('Category already exists');
            error.statusCode = 409;
            throw error;
        }

        const categoryCreated = await Category.create({
            name: categoryName,
            UserId: userId
        }); 

        console.log(categoryCreated);

        return categoryCreated;
    } catch (error) {
        console.error("Error creating Category: ", error);
        throw error;
    };
};

module.exports = postCategoryController;
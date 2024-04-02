const getAllCategoriesController = require('../../controllers/categoryControllers/getAllCategoriesController');

const getAllCategories = async (req, res) => {
    try {
        const { userId } = req.params;

        const categoriesFound = await getAllCategoriesController(userId);

        if(!categoriesFound || categoriesFound.length === 0) {
            return res.status(404).json({ error: "No Categories found" });
        }

        res.status(200).json(categoriesFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = getAllCategories;
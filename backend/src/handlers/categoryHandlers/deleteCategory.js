const deleteCategoryController = require('../../controllers/categoryControllers/deleteCategoryController');

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const categoryDeleted = await deleteCategoryController(categoryId);

        if(!categoryDeleted) {
            throw new Error('Failed to delete Category');
        }

        res.status(200).json(categoryDeleted);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        return res.status(500).json({ error: error.message });    
    };
};

module.exports = deleteCategory;

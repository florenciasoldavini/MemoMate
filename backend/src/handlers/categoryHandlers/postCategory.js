const postCategoryController = require('../../controllers/categoryControllers/postCategoryController');

const postCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const { userId } = req.params;

        const categoryCreated = await postCategoryController(categoryName, userId);

        if(!categoryCreated) {
            return res.status(404).json({ error: "No Category created" });
        }

        res.status(200).json(categoryCreated);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        } 
        
        return res.status(500).json({ error: error.message });    
    }
};

module.exports = postCategory;

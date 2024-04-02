const { Router } = require("express");
const categoryRouter = Router();
const getAllCategories = require('../handlers/categoryHandlers/getAllCategories');
const postCategory = require('../handlers/categoryHandlers/postCategory');
const putCategory = require('../handlers/categoryHandlers/putCategory');
const deleteCategory = require('../handlers/categoryHandlers/deleteCategory');

categoryRouter.get('/:userId', getAllCategories);

categoryRouter.post('/:userId', postCategory);

categoryRouter.put('/delete/:categoryId', deleteCategory);

categoryRouter.put('/:categoryId', putCategory);


module.exports = categoryRouter;
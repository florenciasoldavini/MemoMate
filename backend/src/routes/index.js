const { Router } = require("express");
const router = Router();
const categoryRouter = require('./categoryRouter');
const noteRouter = require('./noteRouter');
const userRouter = require('./userRouter');

router.use('/category', categoryRouter);

router.use('/note', noteRouter);

router.use('/user', userRouter);

module.exports = router;


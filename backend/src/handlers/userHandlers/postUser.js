const postUserController = require("../../controllers/userControllers/postUserController");

const postUser = async (req, res) => {
    try {
        const { name, email, password, photo } = req.body;

        const newUser = await postUserController(
            name,
            email,
            password,
            photo
        );

        res.status(201).json(newUser);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
};

module.exports = postUser;
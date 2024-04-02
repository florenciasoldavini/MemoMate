const getAllUsersController = require('../../controllers/userControllers/getAllUsersController');

const getAllUsers = async (_, res) => {
    try {
        const usersFound = await getAllUsersController();

        if(!usersFound || usersFound.length === 0) {
            return res.status(404).json({ error: "No Users found" });
        }

        res.status(200).json(usersFound);
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};

module.exports = getAllUsers;
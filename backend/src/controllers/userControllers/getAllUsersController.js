const { User, Category, Note } = require("../../db");

const getAllUsersController = async () => {
    try {   
        const usersFound = await User.findAll({
            where: { deleted: false },
            include: [
                { model: Category },
                { model: Note },      
            ]
        });

        return usersFound;

    } catch (error) {
        console.error("Error searching Users: ", error);
        throw error;
    };
};

module.exports = getAllUsersController;
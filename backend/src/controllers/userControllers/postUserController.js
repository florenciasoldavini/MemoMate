const { User } = require('../../db');
const bcrypt = require('bcrypt');

const postUserController = async (name, email, password, photo) => {
    try {
        const userFound = await User.findOne({
            where: { 
                email
             }
        });

        if(userFound && !userFound.deleted) {
            const error = new Error('This email is already registered');
            error.statusCode = 409; 
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            photo,
        });

        const newUserFiltered = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            photo: newUser.photo,
        };
        
        return newUserFiltered;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

module.exports = postUserController;
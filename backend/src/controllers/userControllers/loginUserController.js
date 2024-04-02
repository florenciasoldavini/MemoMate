const { User } = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const loginUser = async (email, password) => {
    try {
        const userFound = await User.findOne({
            where: {
                email
            }
        });


        if (!userFound) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        if (userFound.deleted) {
            const error = new Error("Cannot login a deleted User");
            error.statusCode = 400;
            throw error;
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password);

        if (!passwordMatch) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }

        const payload = { id: userFound.id, userName: userFound.name }

        const options = { expiresIn: '1d' }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            options
        );

        const userFoundFiltered = {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            image: userFound.image,
        }

        return { token, userFoundFiltered };
    } catch (error) {
        console.error('Error logging user in:', error);
        throw error;
    }
}

module.exports = loginUser;
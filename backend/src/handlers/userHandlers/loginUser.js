const loginUserController = require('../../controllers/userControllers/loginUserController');

const loginUser = async (req, res) => {
    try {
        const { userInfo } = req.body;
        const { email, password } = userInfo;

        const loginCreated = await loginUserController(email, password);

        res.header('auth-token', loginCreated.token).json({
            message: 'Authenticated user',
            token: loginCreated.token,
            user: loginCreated.userFoundFiltered,
        });

    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
}

module.exports = loginUser
const bcrypt = require('bcrypt');
const { User } = require("../db");

async function populateUsers() {
    try {
        const user = {
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            password: await bcrypt.hash("password1", 10), // Hasheamos la contraseña
            image: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
        }

        const existingUser = await User.findOne({
            where: {
                email: user.email
            }
        });

        if (!existingUser) {
            await User.create(user);
        }

        console.log("Users table populated successfully");
    } catch (error) {
        // check if error is a SequelizeUniqueConstraintError
        if (error.name === "SequelizeUniqueConstraintError") {
            console.log("Users table already populated");
            return;
        }
        console.error("Error populating users database");
    };
};

module.exports = populateUsers;
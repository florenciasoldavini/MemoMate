const server = require("./src/server");
const { conn } = require("./src/db.js");
require("dotenv").config();
const PORT = process.env.PORT;
const populateUsers = require("./src/seeder/populateUsers.js");

conn.sync({ force: true })
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }).then(() => populateUsers())

const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const CategoryModel = require("./models/category");
const NoteModel = require("./models/note");
const UserModel = require("./models/user");

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false,
        native: false,
    }
);

CategoryModel(sequelize);
NoteModel(sequelize);
UserModel(sequelize);

const { Category, Note, User } = sequelize.models;

// Define the through model
const NoteCategory = sequelize.define('NoteCategory', {
    // You can define additional fields here if needed
   });

User.hasMany(Note); 
Note.belongsTo(User);

User.hasMany(Category); 
Category.belongsTo(User); 

Note.belongsToMany(Category, { through: NoteCategory });
Category.belongsToMany(Note, { through: NoteCategory });

module.exports = {
    conn: sequelize,
    Category,
    Note, 
    User
};
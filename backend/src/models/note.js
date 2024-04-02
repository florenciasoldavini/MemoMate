const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Note',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: "New note"
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: ""
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        timestamps: false
    });
};


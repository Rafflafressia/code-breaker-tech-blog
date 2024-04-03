const {User} = require('../models');

const userData = [
    {
        username: "John",
        password: "password123",
        email: "john.doe@email.com",
    },
    {
        username: "John",
        password: "password123",
        email: "john.doe@email.com",
    },
    {
        username: "John",
        password: "password123",
        email: "john.doe@email.com",
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    mongoDB: process.env.MongoDB,
    PORT : 4000,
};

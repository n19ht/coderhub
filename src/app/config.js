const dotenv = require('dotenv')

dotenv.config()
module.exports = {
    APP_PORT,
    MYSQL_HOTS,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    APP_HOST
} = process.env
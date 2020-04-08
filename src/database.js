const mongoose = require('mongoose');
const colors = require('colors');
require('./config/config');

async function connect() {
    try {
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log(`${colors.yellow('DATABSE IS CONNECTED')}`);
    } catch (error) {
        throw error
    };
};

module.exports = { connect };
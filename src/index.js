const { app } = require('./server');
const colors = require('colors');
require('./config/config');
const { connect } = require('./database');

async function main() {
    //Database connection
    connect(); 
    //Start Server
    await app.listen(process.env.PORT);
    console.log(`${colors.magenta('Server on port:')} ${colors.green(process.env.PORT)}`);
};

main();
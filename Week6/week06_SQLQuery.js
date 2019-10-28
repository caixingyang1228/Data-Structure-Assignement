const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


// AWS RDS POSTGRESQL INSTANCE
const db_credentials = new Object({
   user: "xingyang",
   password: process.env.AWSRDS_PW,
   host: "data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com",
   database: "aa",
   port: 5432,
});

const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query the entire contents of a table: 
var thisQuery = `SELECT address FROM aalocations`;


client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});
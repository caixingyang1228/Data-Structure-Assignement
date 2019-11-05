//Lets Get Started
// 1. Create for dependencies i.e. pg, cTable, dotenv
const { Client } = require('pg');
const cTable = require('console.table');
const dotenv = require('dotenv'); 
dotenv.config();

//2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'xingyang';
db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//3. Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

//4. Sample SQL statement to check the table 
var thisQuery = "SELECT * FROM tempsensor;"; // print all values
var secondQuery = "SELECT COUNT (*) FROM tempsensor;"; // print the number of rows
var thirdQuery = "SELECT temperature, COUNT (*) FROM tempsensor GROUP BY temperature;"; // print the number of rows for each sensorValue


    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
        }
    });
    
    client.query(secondQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
        }
    });
    
    client.query(thirdQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
        }
        client.end();
    });
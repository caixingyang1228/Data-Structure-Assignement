//Lets Get Started
// 1. Create two dependencies i.e. pg and dotenv
const { Client } = require('pg'); // npm install pg
const dotenv = require('dotenv'); // npm install dotenv
dotenv.config();

// 2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'xingyang';
db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;
// console.log(db_credentials.password);

// 3. Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// 4. SQL statement to create a table: 
var thisQuery = [];
// thisQuery +="CREATE TABLE aaData (Location_Id serial primary key, Zone int, Street_Address varchar(100), City varchar(10), State varchar(5),  Zipcode varchar(5), Latitude double precision, Longitude double precision, Accessibity boolean, Meeting_Name varchar(50), Meeting_Day varchar(50), Meeting_Start_Time time,  Meeting_End_Time time, Meeting_Time varchar(5),  Meeting_Type varchar(5));";

thisQuery +="CREATE TABLE aaData (Zone int, Street_Address varchar(100), City varchar(10), State varchar(5),  Zipcode varchar(5), Latitude double precision, Longitude double precision, Accessibity boolean, Meeting_Name varchar(50), Meeting_Day varchar(50), Meeting_Start_Time time,  Meeting_End_Time time, Meeting_Time varchar(5),  Meeting_Type varchar(5));";



// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE aaData;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
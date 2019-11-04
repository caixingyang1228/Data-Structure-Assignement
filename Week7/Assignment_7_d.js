//Lets Get Started
// 1. Create for dependencies i.e. pg, dotenv, async, fs
const { Client } = require('pg');
const dotenv = require('dotenv'); 
dotenv.config();
var async = require('async');
var fs = require('fs');

//2. AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'xingyang';
db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//3. Create a variable to read the json file.
var addressesForDb = fs.readFileSync("JSON/Assignment_7_b.json");
addressesForDb = JSON.parse(addressesForDb);
// console.log(addressesForDb.length);

//4. Connect to the AWS RDS Postgres database and insert values by creating async function inside an async function.
async.eachSeries(addressesForDb, function(value1, callback1) {
    async.eachSeries(value1.meetingDetail, function(value2, callback2) {
    // console.log(value1);
    // console.log(value2);
    
    // const client = new Client(db_credentials);
    // client.connect();
    
    var thisQuery = "INSERT INTO aaData VALUES ('" + value1.locationDetails.zone + "','" + value1.locationDetails.streetAddress + "','" + value1.locationDetails.city + "','" + value1.locationDetails.state + "','" + value1.locationDetails.zipcode + "','" + value1.geoLocation.latitude + "','" + value1.geoLocation.longitude + "','" + value1.accessibility + "','" + value1.meetingName.meetingName + "','" + value2.day + "','" + value2.startTime +"','" + value2.endTime +"','" + value2.time +"','" + value2.type +"');";
    console.log(thisQuery);
    

     
    setTimeout(callback2, 1000); 
    });
    setTimeout(callback1, 1000);
    });
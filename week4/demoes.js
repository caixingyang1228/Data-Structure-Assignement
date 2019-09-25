    const { Client } = require('pg');
    const dotenv = require('dotenv');
    dotenv.config({path: '../week4/.env'});
    const fs = require('fs');
    var async = require('async');
    
    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'xingyang';
    db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;
    
    
    // // Connect to the AWS RDS Postgres database
    // const client = new Client(db_credentials);
    // client.connect();
    
    // Sample SQL statement to create a table: 
    // var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
    // Sample SQL statement to delete a table: 
    // var thisQuery = "DROP TABLE aalocations;"; 
    
    var rawAddresses = fs.readFileSync('../week4/data.json');
    var addressesForDb = JSON.parse(rawAddresses);
    
    async.eachSeries(addressesForDb, function(value, callback) {
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.streetaddress.StreetAddress + "', '" + value.latitude + "', '" + value.longitude + "');";
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
        setTimeout(callback, 1000); 
    }); 
const { Client } = require('pg');
    const async = require('async');
    const dotenv = require('dotenv');
    dotenv.config();
    
    // AWS RDS POSTGRESQL INSTANCE
    var db_credentials = new Object();
    db_credentials.user = 'xingyang';
    db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
    db_credentials.database = 'aa';
    db_credentials.password = process.env.AWSRDS_PW;
    db_credentials.port = 5432;
    
    
    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();
    
    // Sample SQL statement to create a table: 
    var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";
    // Sample SQL statement to delete a table: 
    // var thisQuery = "DROP TABLE aalocations;"; 
    
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
# Weekly Assignment 4
**Requirement**
We need to continue working with the data that be scraped, parsed, and augmented in the previous three assignments. In this assignment, we need to write our AA data to a relational database.

The start code provide by [Aaron Hill](https://github.com/aaronxhill) can be found [here](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_04.md)

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

## Part One: Plan

"Draw a data model for the AA meetings data to be stored in a database."

I choose to use normalization data mode. It helps dividing the data into multiple tables to reduce data redundancy and inconsistency.

Hierarchy: AA meeting -->(Type-->Address/Time)/Address/Time

(../week4/diagram.png)

## Part Two: Create a table(s) in your database
**Be carefully** that the table is open(not drop).  Also `var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.lat + ", " + value.lng + ");";` follows the form of the table `var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";`.

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
        var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.address + "', " + value.lat + ", " + value.lng + ");";
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
        setTimeout(callback, 1000);
    });

### Part Three: Populate your database

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();

    // Sample SQL statement to query the entire contents of a table:
    var thisQuery = "SELECT * FROM aalocations;";

    client.query(thisQuery, (err, res) => {
        console.log(err, res.rows);
        client.end();
    });
    
### Part Four: Check your work

    null [ { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '305 7TH AVE New York NY ',
        lat: 40.7467107,
        long: -73.9935208 },
      { address: '1 W 53RD ST New York NY ',
        lat: 40.7608523,
        long: -73.9765938 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '133 W 46TH ST New York NY ',
        lat: 40.6589343,
        long: -73.9348705 },
      { address: '441 W 26TH ST New York NY ',
        lat: 40.7495486,
        long: -74.0015106 },
      { address: '446 W 33RD ST New York NY ',
        lat: 40.753496,
        long: -73.9989428 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '339 W 47TH ST New York NY ',
        lat: 40.7612077,
        long: -73.9891128 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '139 W 31ST ST New York NY ',
        lat: 40.647412,
        long: -73.9480599 },
      { address: '422 W 57TH ST New York NY ',
        lat: 40.7682311,
        long: -73.9868768 },
      { address: '211 W 30TH ST New York NY ',
        lat: 40.7486793956479,
        long: -73.9927286472649 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '1 W 53RD ST New York NY ',
        lat: 40.7608523,
        long: -73.9765938 },
      { address: '422 W 57TH ST New York NY ',
        lat: 40.7682311,
        long: -73.9868768 },
      { address: '7 W 55TH ST New York NY ',
        lat: 40.7618823,
        long: -73.9751297 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '729 7TH AVE New York NY ',
        lat: 40.7601119,
        long: -73.9837538 },
      { address: '538 W 47TH ST New York NY ',
        lat: 40.7634021,
        long: -73.9948352 },
      { address: '1000 TENTH AVE New York NY ',
        lat: 40.7700536177104,
        long: -73.9877635987168 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '307 W 26TH ST New York NY ',
        lat: 40.7474685,
        long: -73.9974137 },
      { address: '405 W 59TH ST New York NY ',
        lat: 40.7697538,
        long: -73.9857965 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '422 W 57TH ST New York NY ',
        lat: 40.7682311,
        long: -73.9868768 },
      { address: '133 W 46TH ST New York NY ',
        lat: 40.6589343,
        long: -73.9348705 },
      { address: '133 W 46TH ST New York NY ',
        lat: 40.6589343,
        long: -73.9348705 },
      { address: '303 W 42ND ST New York NY ',
        lat: 40.7575385,
        long: -73.9901368 },
      { address: '296 9TH AVE New York NY ',
        lat: 40.8228042471098,
        long: -73.8091987304391 },
      { address: '139 W 31ST ST New York NY ',
        lat: 40.647412,
        long: -73.9480599 },
      { address: '1 W 53RD ST New York NY ',
        lat: 40.7608523,
        long: -73.9765938 },
      { address: '484 W 43RD ST New York NY ',
        lat: 40.7599913,
        long: -73.9948326 },
      { address: '7 W 55TH ST New York NY ',
        lat: 40.7618823,
        long: -73.9751297 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '4 W 43RD ST New York NY ',
        lat: 40.7543885,
        long: -73.9812083 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '296 NINTH AVE New York NY ',
        lat: 40.8228042471098,
        long: -73.8091987304391 },
      { address: '1 W 53RD ST New York NY ',
        lat: 40.7608523,
        long: -73.9765938 },
      { address: '210 W 31ST ST New York NY ',
        lat: 40.7434762,
        long: -73.9789404 },
      { address: '422 W 57TH ST New York NY ',
        lat: 40.7682311,
        long: -73.9868768 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 },
      { address: '134 W 29TH ST New York NY ',
        lat: 40.7472463,
        long: -73.9917061 },
      { address: '1000 TENTH AVE New York NY ',
        lat: 40.7700536177104,
        long: -73.9877635987168 },
      { address: '446 W 33RD ST New York NY ',
        lat: 40.753496,
        long: -73.9989428 },
      { address: '423 W 46TH ST New York NY ',
        lat: 40.6483729,
        long: -74.009462 },
      { address: '252 W 46TH ST New York NY ',
        lat: 40.7593831,
        long: -73.9872329 } ]

1. Create a table with PostgreSQL  

 Create two dependencies i.e. pg and dotenv ; Connect it to the AWS RDS Postgres database  
  Creating a table containing temperature values and timestamp by SQL
    

```
var thisQuery = [];
thisQuery +="CREATE TABLE tempsensor (temperature double precision, time timestamp DEFAULT current_timestamp);";

```

2. Insert values using PM2 Runtime  
Using  [PM2 Runtime](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/), which is a process manager for Node.js. To install it, run:  
`npm install pm2 -g`

	Then, initialize a configuration file with:  
`pm2 init`

     Creating Variables for accessing Photon Particle    
     Creating a function that documents the temperature data by requesting information from URL and storing it in a variable  
    

```
var tempData = function() {
    request(device_url, function(error, response, body) {
        var data = JSON.parse(body).result;
        const client = new Client(db_credentials);
        client.connect();
        var thisQuery = "INSERT INTO tempsensor VALUES (" + data + ", DEFAULT);";
        console.log(thisQuery);
        
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

```

5.  Create a new row after every five minutes

```
setInterval(tempData, 300000);
```
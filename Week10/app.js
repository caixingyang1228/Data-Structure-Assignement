const dotenv = require('dotenv'); 
dotenv.config();

var express = require('express'), // npm install express
    app = express();

const { Pool } = require('pg');

var AWS = require('aws-sdk');


AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();
const moment = require('moment-timezone');


var now = moment.tz(Date.now(), "America/New_York");
var dayy = now.day();
var today_1 = now.format('dddd');
var today = today_1 + 's';


    var hourr = now.hour().toString();
    var min = now.minute().toString();
    
    var ampm = 'AM';
    if (hourr > 12) {
        hourr = hourr - 12;
        ampm = 'PM'
    }

    var current_time = hourr + ':' + min  
    

console.log(today);
console.log(current_time)



const { Client } = require('pg');

const handlebars = require('handlebars');
const fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'xingyang';
db_credentials.host = 'data-structures-new.cneq5f929dnd.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = "xingyang";
db_credentials.port = 5432;
//dotenv.config({path: '/home/ec2-user/environment/.env'});

app.get('/', function(req, res) {
   res.send(`<h1>Data Structures Final Project</h1>
            <ul>
            <li> <a href= /aaData> Aa Data </a></li>
            <li> <a href= /blog.html> Process Blog </a></li>
            <li> <a href= /sensor.html> Sensor Data </a></li>
            </ul>`);
});


var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA ">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="aa.css?v=1.0">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
       integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
       crossorigin=""/>
</head>
<body>
<div id="mapid"><div id="headline"> <h1>Meetings of AA</h1></div></div>
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
  <script>
  var data = 
  `;
  
var jx = `;
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidmlzLWludCIsImEiOiJjanI2NWppYTIwNGR2NDRwaGI1N2xzZXBxIn0.dmZ6dkYdM95wixqH0mQb_w'
    }).addTo(mymap);
    
    
    
                function popup (data) {
                        var html = '';
                        
                        for (var i=0; i<data.length; i++) {
                                
                                
                        if (i === 0) {
                            html += '<p class = "address">' + data[i].address + '</p>'
                            html += '<p class = "access">' + data[i].access + '</p>'
                        }
                                html += '<ul>'
                                    html += '<li class = "name">' + data[i].name + '</li>'
                                    html += '<li class = "type">' + data[i].types + '</li>'
                                    html += '<li class = "day">' + data[i].day + '</li>'
                                        html += '<ul>'
                                            html += '<li class = "time">' + data[i].time + '</li>'
                                        html += '</ul>'
                                html += '</ul>'
                }
                    console.log(html)
                    return html
                }
                
               for (var i=0; i<data.length; i++) {
                        L.marker( [data[i].latitude, data[i].longitude] ).bindPopup(popup(data[i].meetings), {maxHeight: 250}, {maxWidth: 100}).addTo(mymap);
                    }
            

                    
    </script>
    </body>6
    </html>`;

app.get('/', function(req, res) {
    res.send(`<h3>Code demo site</h3>`);
}); 

// respond to requests for /aa
app.get('/aaData', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    
    // SQL query 
    var thisQuery = `SELECT latitude, longitude, json_agg(json_build_object('name',meeting_name, 'address', street_address, 'time', meeting_start_time, 'day', meeting_day, 'types', meeting_type, 'access', accessibity)) as meetings
                 FROM aaData  
                 GROUP BY latitude, longitude;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        
        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('AA) responded to request for aa meeting data');
        }
    });
});

app.use(express.static('public'));


//2.NOSQL BLOG
//Query process blog by Connect to dynamodb
app.get('/processblog', async function (req, res) {
    if (req.query == {}){
        res.send(await processBlog());
    } else {
         res.send(await processBlog(req.query.start,req.query.end,req.query.category));
    }
});

//Create a function to query data by concepts 
 function processBlog(minDate, maxDate, category){
    return new Promise(resolve => {
        var output = {};
        
        minDate = minDate || "November 30, 2019"
        maxDate = maxDate || "August 2, 2019"; 
        category = category || 'all';

        output.blogpost = [];
        
        if (category != 'all'){
            var params = {
                TableName : "process.blog",
                KeyConditionExpression: "category = :categoryName and #dt between :minDate and :maxDate",
                ExpressionAttributeNames: {
                    "#dt" : "data"
                    // "artist" : "name"
                 },
                 
                ExpressionAttributeValues: { // the query values
                    ":categoryName": {S: category},
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()},
                }
            };
            
            dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "process.blog",
                ProjectionExpression: "name, website, category, careerStage, eventComplete",
                FilterExpression: "#dt between :minDate and :maxDate",
                ExpressionAttributeNames: {
                    "#dt" : "data"
                 },
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toLocaleString()},
                    ":maxDate": {S: new Date(maxDate).toLocaleString()}
                }
            };
            
            dynamodb.scan(params, onScan)

        }
        
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("Scan succeeded.");
                data.Items.forEach(function(item) {
                    console.log(item)
                    console.log("***** ***** ***** ***** ***** \n", item);
                      // use express to create a page with that data
                    output.blogpost.push({'name':item.name.S, 'website':item.website.S, 'careerStage':item.careerStage.S,'eventComplete':item.eventComplete.S });
                });
                console.log(output.blogpost);
    
                fs.readFile('blog-handlebars.html', 'utf8', (error, data) => {
                    var template = handlebars.compile(data);
                    var html = template(output);
                    resolve(html);
                });
            }
        };
    });
 }
 
    
//3.Temperature Sensor
const client = new Client(db_credentials);
client.connect();

//sensor data page
app.get('/sensor', function (req, res1) {
    // res1.send('<h3>this is the page for my sensor data</h3>');

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();


    // Sample SQL statement to query the entire contents of a table:
     var secondQuery = "SELECT * FROM tempsensor WHERE OrderDate='2019-12-01';"; 

    // var rows;

    console.log('test');

client.query(secondQuery, (err, res) => {
        if (err) { throw err }
        else {
            //console.table(res.rows);

            var data = JSON.stringify(res.rows)

            res1.send(res.rows)
        }
    });
});


// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
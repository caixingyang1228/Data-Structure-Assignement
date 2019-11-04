//Lets Get Started
// 1. Create for dependencies i.e. request, async, fs, dotenv
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// 2. Get TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;


// 3. Read the JSON file and parse the contents of the file.
var content = fs.readFileSync('JSON/Assignment_7_a.json');
content = JSON.parse(content);
// console.log(content);
// console.log(content.length);

//4. Remove empty objects from Array
var contentDefined = [];
content.forEach(contentObject => {
    // console.log(contentObject.locationDetails.streetAddress);
    if(contentObject.locationDetails != undefined) {
    //   console.log(contentObject.locationDetails.streetAddress); 
      contentDefined.push(contentObject);
    }
});

// console.log('***')
// console.log(contentDefined.length);
// console.log(contentDefined);

// 5. Created an empty array 
var meetingsData = [];

// 6. Use .eachSeries in the async module to iterate over an array and operate on each item in the array in series
async.eachSeries(contentDefined, function(value, callback) {
    var address = value.locationDetails.streetAddress;
    // console.log(address);
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + address.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&zip=' + value.zipCode;
    apiRequest += '&format=json&version=4.01';
    
// 7. Requesting the contents in the body of the link by using the request. 
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);

// 8. Create a variable containing an object which contains the required information from the body (Street Address, Longitude, Latitude)             
            var geoLocation = {};
            
            geoLocation.address = tamuGeo['InputAddress'];
            geoLocation.latitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
            geoLocation.longitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
            
            value.geoLocation = geoLocation;

// 9. Pushing the object in the empty array that we created at the begining of the file          
            meetingsData.push(value);
        }
    
    });
    
    setTimeout(callback, 2000);
    
// 10. Write a .json file containing the values of the array.  
}, function() {
    fs.writeFileSync('JSON/Assignment_7_b.json', JSON.stringify(meetingsData));
    console.log(meetingsData.length);
    console.log('*******************');
});
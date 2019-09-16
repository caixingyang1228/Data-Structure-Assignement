# Week3Assignment

**For the *name* and *location* data which has been organized by using `cheerio`, transfer the `txt` file to `json` file.**
 **Save to** [/Week2/data/m04.json](/Week2/data/m04.json)
 
    // Using Node.js, read the assigned AA text file and store the contents of the file in a variable
    
    var fs = require('fs');
    var cheerio = require('cheerio');
    
    // Load the AA text file from week01 into a variable, `dataset`
    var dataset = fs.readFileSync('../Week1/m04.txt');
    
    // Load `dataset` into a cheerio object
    var $ = cheerio.load(dataset);
    
    // Write the project titles to a text file
    var thesisTitles = [];
    
    // Select tag and use attribute to narrow down the requested data
    $('td').each(function(i, elem) {
        if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
            // thesisTitles += ($(elem).text()).trim() + '\n';
            var thisMeeting = {};
            thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
            thisMeeting.city = "New York";
            thisMeeting.state = "NY";
            thesisTitles.push(thisMeeting);
        }
    // Remove all unnecessary content by tag
        // $('b, div, span').remove();
    });
    
    fs.writeFileSync('../Week2/data/m04.json', JSON.stringify(thesisTitles));

**Setting environment variables using npm** `dotenv`**，below is** [w03.js](w03.js)

    // dependencies
    var request = require('request'); // npm install request
    var async = require('async'); // npm install async
    var fs = require('fs');
    const dotenv = require('dotenv'); // npm install dotenv
    
    // TAMU api key
    dotenv.config();
    const apiKey = process.env.TAMU_KEY;
    
    // Read address data from a new JSON file
    var rawaddress = fs.readFileSync('../Week3/m04.json');
    rawaddress = JSON.parse(rawaddress);
    
    // Geocode addresses
    var meetingsData = [];
    var addresses = [];
    
    // Add all elements to the end of an array, 'addresses'
    for (var i = 0; i<rawaddress.length; i++) {
    addresses.push(rawaddress[i]['streetAddress']);
    }
    
    // eachSeries in the async module iterates over an array and operates on each item in the array in series
    async.eachSeries(addresses, function(value, callback) {
        var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + value.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
        
        
        request(apiRequest, function(err, resp, body) {
            if (err) {throw err;}
            else {
                var tamuGeo = JSON.parse(body);
                console.log(tamuGeo['FeatureMatchingResultType']);
                meetingsData.push(tamuGeo);
            }
        });
        setTimeout(callback, 2000);
    }, function() {
        fs.writeFileSync('../Week3/data.json', JSON.stringify(meetingsData));
        console.log('*** *** *** *** ***');
        console.log('Number of meetings in this zone: ');
        console.log(meetingsData.length);
    });


The assignment was divided into 3 different sections.  
1. Parse and clean all relevant data from different files  
2. Geocode all the locations for all the zones  
3. Create a table with PostgreSQL and query the contents  


The intent was to create one table that contains all the information of each meeting, addreess, accessibility and zone as per my scematic model discussed in Assignment 4.  

**1. Parse and clean all relevant data from different files**  
    

```
var filePath = 'data/';
var fileNumber = [
    'm01',  
    'm02',  
    'm03',  
    'm04',  
    'm05',  
    'm06',  
    'm07',  
    'm08',  
    'm09',  
    'm10'
    ];
     fileNumber.forEach(file => {
     var content = fs.readFileSync('data/' + file + '.txt');

```

 I used if statement to target all the elements of the addresses in one attempt and creating a common object containing all the meeting details, addresses and accessibility details.  
    

```
 $('tr').each(function(j, trElem) {
            //let id = j;
            var allDetails = {};
            allDetails.id = j;
            $(trElem).children().each(function(i,elem) {
                
                //Contents:Zone, StreetAdress, City, State, Zipcode
                if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px'){
                    //Zone, Street Address, City, State, Zipcode
                    var thisLocation = {};
                    // thisLocation.id = j;
                    var zone = file.match(/\d+/);
                    thisLocation.zone = zone[0];
                    //thisLocation.zone = '05';
                    thisLocation.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0].split('(')[0].replace("East ", "E ").replace("E ", "East ").replace("Street ", "St ").replace("St ", "Street ");
                    thisLocation.city = 'New York';
                    thisLocation.state = 'NY';
                    thisLocation.zipcode = $(elem).html().split('<br>')[3].trim().substr(- 5);
                    allDetails.locationDetails = thisLocation;

```

Understanding Meeting Data Similarly cleaning the meeting data and then parsing information by understanding a pattern for day, start time, end time, meeting type. 
    

```
else if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3;width:350px;'){
                    var meetingDetail = $(elem).text().trim();
                    
                    meetingDetail = meetingDetail.replace(/[ \t]+/g, " ").trim();
                    meetingDetail = meetingDetail.replace(/[\r\n|\n]/g, " ").trim();
                    meetingDetail = meetingDetail.split("        ");
                        
                    var eachMeeting = [];    
                    for (var i=0; i<meetingDetail.length; i++){
                    var splitMeeting = {};
                    splitMeeting.id = j;
                    splitMeeting.day = meetingDetail[i].trim().split(' ')[0];
                    splitMeeting.startTime = meetingDetail[i].trim().split(' ')[2];
                    splitMeeting.endTime = meetingDetail[i].trim().split(' ')[5];
                    splitMeeting.time = meetingDetail[i].trim().split(' ')[3];
                    splitMeeting.type = meetingDetail[i].trim().split(' ')[9];
                    eachMeeting.push(splitMeeting)
                    allDetails.meetingDetail = eachMeeting     
                    }
                }
            });
                aaData.push(allDetails);

```

 Creating a function to removing empty files. 
    

```
var contentDefined = [];
aaData.forEach(aaDataObject => {
    // console.log(contentObject.locationDetails.streetAddress);
    if(aaDataObject.locationDetails != undefined) {
    //   console.log(contentObject.locationDetails.streetAddress); 
      contentDefined.push(aaDataObject);
    }
});

```

Creating a JSON Hence I ended up creating one json file containing an array, which contains multiple objects for each row (address). Hence I have an object containing location details(object), accessibility(object), meeting name(object) and meeting details.(objects within array)  
    

```
[{"id":4,
"locationDetails":{"zone":"01","streetAddress":"20 Cardinal Hayes Place","city":"New York","state":"NY","zipcode":"10007"},
"accessibility":false,
"meetingName":{"meetingName":"A DESIGN FOR LIVING"},
"meetingDetail":[{"id":4,"day":"Thursdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"OD"},
                 {"id":4,"day":"Tuesdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"B"}]}]

```

  
**2. Geocode all the locations for all the zones**  


    

```
async.eachSeries(contentDefined, function(value, callback) {
    var address = value.locationDetails.streetAddress;
    // console.log(address);
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + address.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&zip=' + value.zipCode;
    apiRequest += '&format=json&version=4.01';

```

 Requesting the contents in the body of the link by using the request.  
    

```
request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);

```

 Create a variable containing an object which contains the required information from the body (Street Address, Longitude, Latitude)  
      
    ``` var geoLocation = {};
    
    ```
         geoLocation.address = tamuGeo['InputAddress'];
         geoLocation.latitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Latitude'];
         geoLocation.longitude = tamuGeo['OutputGeocodes'][0]['OutputGeocode']['Longitude'];
         
         value.geoLocation = geoLocation;```
    
    ```
    

 Write a .json file containing the values of the array.  
    

```
[{"id":4,
"locationDetails":{"zone":"01","streetAddress":"20 Cardinal Hayes Place","city":"New York","state":"NY","zipcode":"10007"},
"accessibility":false,
"meetingName":{"meetingName":"A DESIGN FOR LIVING"},
"meetingDetail":[{"id":4,"day":"Thursdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"OD"},
                 {"id":4,"day":"Tuesdays","startTime":"7:00","endTime":"8:00","time":"AM","type":"B"}],
"geoLocation":{"address":{"StreetAddress":"20 CARDINAL HAYES PL New York NY undef","City":"New York","State":"NY"},
              "latitude":"40.7132514",
              "longitude":"-74.002398"}},

```

  
#### 3. Create a table with PostgreSQL and query the contents  

    

```
thisQuery +="CREATE TABLE aaData (Zone int, Street_Address varchar(100), City varchar(10), State varchar(5),  Zipcode varchar(5), Latitude double precision, Longitude double precision, Accessibity boolean, Meeting_Name varchar(50), Meeting_Day varchar(50), Meeting_Start_Time time,  Meeting_End_Time time, Meeting_Time varchar(5),  Meeting_Type varchar(5));";

```

  

1.  Create for dependencies i.e. pg, dotenv, async, fs  
    
2.  AWS RDS POSTGRESQL INSTANCE  
    
3.  Read the JSON and load it in a variable  
    
4.  Connect to the AWS RDS Postgres database and insert values  
    
5.  Use async.each series to iterate over each item in an array.  
    I have used async function within a async function as my meeting details are an array and it helps in iterate over each item to form content for the table  
    

```
async.eachSeries(addressesForDb, function(value1, callback1) {
    async.eachSeries(value1.meetingDetail, function(value2, callback2) {
    var thisQuery = "INSERT INTO aaData VALUES ('" + value1.locationDetails.zone + "','" + value1.locationDetails.streetAddress + "','" + value1.locationDetails.city + "','" + value1.locationDetails.state + "','" + value1.locationDetails.zipcode + "','" + value1.geoLocation.latitude + "','" + value1.geoLocation.longitude + "','" + value1.accessibility + "','" + value1.meetingName.meetingName + "','" + value2.day + "','" + value2.startTime +"','" + value2.endTime +"','" + value2.time +"','" + value2.type +"');";
    

```

###### [](https://github.com/salonieshah/data-structures/tree/master/Week07#c-query-the-content-of-the-table-)c. Query the content of the table  

1.  Create three dependencies i.e. pg, fs and dotenv  
    
2.  AWS RDS POSTGRESQL INSTANCE  
    
3.  Connect to the AWS RDS Postgres database<br  
    
4.  Sample SQL statement to query the entire contents of a table  
    

```
// var thisQuery = "SELECT * FROM aaData;";
var thisQuery = "SELECT latitude, longitude FROM aaData;";

client.query(thisQuery, (err, res) => {
    console.log(err, res.rows);
    // fs.writeFileSync('JSON/Assignment_7_e.json', JSON.stringify(res.rows)); //all aaData
    fs.writeFileSync('JSON/Assignment_7_f.json', JSON.stringify(res.rows)); //latitude and longitude
    client.end();
});

```
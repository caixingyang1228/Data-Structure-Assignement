//Lets Get Started
//1. Create two dependencies i.e. pg and dotenv
    var fs = require('fs');
    var cheerio = require('cheerio');
    
//2. Create an empty array
    var aaData =[];
    
//3. Load the meetings text file into a variable content    
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

//4. Load the meetings text file into a variable content
     var content = fs.readFileSync('data/' + file + '.txt');
    //console.log(content);
          
//5. Load `content` into cheerio object
    var $ = cheerio.load(content);
    



//6. Find the elements of a particular style which belongs to the item and push it into array. 
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
                    
                    //Accesibility       
                    var accessibility = false;
                    if ($(elem).html().includes('Wheelchair access')){
                      accessibility = 'true';
                    }
                    allDetails.accessibility = accessibility;  
            
                    //Meeting name         
                    var thisMeeting = {};    
                    thisMeeting.meetingName = $(elem).html().split('<br>')[1].split('-')[0].trim().split('(')[0].replace("&apos;","'"); //Last entry
                    allDetails.meetingName = thisMeeting;
                }
               
                // Meetings: Start time, End time, Meeting day, Meeting type
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
                    // splitMeeting.typeName = meetingDetail[i].trim().split(' ').splice(11);
                     console.log(splitMeeting);
                    // console.log(splitMeeting.typeName);
                     eachMeeting.push(splitMeeting);
                     console.log(eachMeeting);
                    // eachMeeting.uniqueMeeting = splitMeeting;
                    allDetails.meetingDetail = eachMeeting;
                    // console.log(allDetails.meetingDetail);      
                    }
                }
            });
                aaData.push(allDetails);
                console.log(aaData);
                
//7. Removing empty files
var contentDefined = [];
aaData.forEach(aaDataObject => {
    // console.log(contentObject.locationDetails.streetAddress);
    if(aaDataObject.locationDetails != undefined) {
    //   console.log(contentObject.locationDetails.streetAddress); 
      contentDefined.push(aaDataObject);
    }
});



//8. Create a json
                fs.writeFileSync('JSON/Assignment_7_a.json', JSON.stringify(contentDefined));
            });
    });
     
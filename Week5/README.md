# Weekly Assignment 5
### Part One: Plan
I use the schedule of artist talk that I am organizing this fall seamster as the dataset.  The date as `Partition key` and medium as `Sort key`. This
Here is the hierarchy of the data.  It is a denormalized data.
![Image description](https://github.com/caixingyang1228/Data-Structure-Assignement/blob/master/Week5/Process%20Blog.png?raw=true)

### Part Two: Create some data for the table in your database
 The start code provided [here](%28https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_05.md%29)

    var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-1";
    
    var dynamodb = new AWS.DynamoDB();
    
    var params = {};
    params.Item = blogEntries[0]; 
    params.TableName = "processblog";
    
    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
The following starter code creates several "Items" destined for DynamoDB, storing them in an array named `blogEntries`:

    var async = require('async');
    
    // Define blog entry
    
    var blogEntries = [];
    
    // Create categories for blog entry
    
    class BlogEntry {
    
    constructor(primaryKey, date, medium, careerStage, name, website, eventComplete) {
    
    this.pk = {};
    
    this.pk.N = primaryKey.toString();
    
    this.date = {}; // Partition key
    
    this.date.S = new Date(date).toDateString();
    
    this.medium = {}; // Sort key
    
    this.medium.S = medium;
    
    this.careerStage = {};
    
    this.careerStage.S = careerStage;
    
    this.name = {};
    
    this.name.S = name;
    
    this.website = {};
    
    this.website.S = website;
    
    this.eventComplete = {};
    
    this.eventComplete.BOOL = eventComplete;
    
    }
    
    }
    
    // Push data into blog entry
    
    blogEntries.push(new BlogEntry(0, '09/13/19', "Internet_Art", "Establish", "aaajiao", "https://eventstructure.com/aaajiao", true));
    
    blogEntries.push(new BlogEntry(1, '09/20/19', "Video_Art", "Emerging", "Hui_Tao", "https://edouardmalingue.com/artists/tao-hui/", true));
    
    blogEntries.push(new BlogEntry(2, '09/27/19', "Video_Art", "Emerging", "Ming_li", "https://www.artsy.net/artist/li-ming", true));
    
    blogEntries.push(new BlogEntry(3, '10/04/2019', "Performance", "Emerging", "Mountain_River_Jump! ", "http://yellowriver1985.com/files/MountainRiverJump201907-cnen-profile.pdf", false));
    
    blogEntries.push(new BlogEntry(4, '10/11/2019', "Installation", "Emerging", "Lu_Pingyuan ", "http://www.artlinkart.com/en/artist/exh_yr/f59awxtn", false));
    
    blogEntries.push(new BlogEntry(5, '10/25/2019', "Digital_Art", "Emerging", "Iris_Xingru_Long ", "http://www.artlinkart.com/en/artist/exh_yr/54aczyoj", false));
    
    blogEntries.push(new BlogEntry(6, '10/20/2019', "Sculpture", "Emerging", "Youyu_Ni", "https://www.niyouyu.com/solo-exhibition", false));
    
    blogEntries.push(new BlogEntry(7, '11/15/2019', "Performance", "Emerging", "Tianzhuo_Chen", "http://tianzhuochen.com/biography", false));
    
    blogEntries.push(new BlogEntry(8, '11/9/2019', "Video_Art", "Emerging", "Hsu_Che-Yu", "https://vimeo.com/user19276493", false));
    
    blogEntries.push(new BlogEntry(9, '11/9/2019', "Video_Art", "Emerging", "Hao_Jingban", "https://blindspotgallery.com/artist/hao-jingban-2/", false));
    
    console.log(blogEntries);
    
    
### Part Three: Populate your database
Use the [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/) to work with my DynamoDB table in Node.js. Install with:  
`npm install aws-sdk`

    // Use 'for' loop to push all the data into blog entry
        
        var params = {};
        
        var i = 0;
        
        for (i = 0; i < blogEntries.length; i++) {
        
        params.Item += blogEntries[i];
        
        }
        
        params.TableName = "process-blog";
        
        async.eachSeries(blogEntries, function(artistTalk, callback) {
        
        params.Item = artistTalk;
        
        dynamodb.putItem(params, function(err, data) {
        
        if (err) console.log(err, err.stack); // an error occurred
        
        else console.log(data); // successful response
        
        });
        
        setTimeout(callback, 2000);
        
        });

![enter image description here](https://github.com/caixingyang1228/Data-Structure-Assignement/blob/master/Week5/Screen_capture1.png?raw=true)
![enter image description here](https://github.com/caixingyang1228/Data-Structure-Assignement/blob/master/Week5/Screen_capture2.png?raw=true)
![enter image description here](https://github.com/caixingyang1228/Data-Structure-Assignement/blob/master/Week5/Screen_capture3.png?raw=true)



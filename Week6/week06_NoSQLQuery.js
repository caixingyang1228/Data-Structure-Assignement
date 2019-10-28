
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
// AWS.config.accessKeyId = hghfhghfhfh
// AWS.config.secretAccessKey = ghghghgh
AWS.config.region = "us-east-1";

// 2. Connect to dynamodb
var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "process.blog",
     KeyConditionExpression: "category = :categoryName and #datecolumn between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { "#datecolumn": "data"},
    ExpressionAttributeValues: { 
        ":categoryName": {S: "Video_Art"},
        ":minDate": {S: new Date("09/13/2019").toISOString()},
        ":maxDate": {S: new Date("11/9/2019").toISOString()},
    }
};


dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
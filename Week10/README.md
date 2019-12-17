**Through these three projects, I reviewed and summarized some of the skills and logic learned this semester. And systematically tried how to transform the data into an interactive interface.**

 

Due to limited time, I didn't spend time on visual presentation. Maybe I can use the time to do some better visual presentation.

  

## Project 1: [aaData](http://35.173.245.202:8080/aaData)

This is a project that runs through the semester. This project first parsed the data from 10 different pages.

This data is then geocoded according to the given address and then stored in a sql database. Then design an interactive way to organize the data structure according to the interactive way. It is finally rendered with front-end code.

  

## Project 2: [Process Blog](http://35.173.245.202:8080/blog.html)

For this project, I used the artist talk I organized this semester as a database. The concept is that users can choose the artist talk they want to participate in according to their favorite art medium. Only artist names, websites and career stages are currently provided. You can add more supplementary information in the future, including photos.

By using Amazon DynamoDB, a NoSQL database service to create a table. Following are details of my table. Table Name: process.blog Primary Key: category Sort Key: date

Query the data in the app.js file. Entries are output through Dynamo db. User interface, presenting data in a more readable way through html, js, css.

  

## Project 3: [Sensor Data](http://35.173.245.202:8080/sensor.html)

In this project, I used a temperature sensor to record the temperature of my room, and stored the measured data in a SQL database. Then use d3 to complete the visualization of the line chart. Due to the wifi problem in my room, I have not recorded any data for a long time.

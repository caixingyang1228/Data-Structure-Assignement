var data;

$(function(){
    // this is jQuery! it listens for any time the user changes the drop down menu and when it does it calls the getResults() function.
    $('select').change(function() {
        getResults()
    });
});


function getResults(){
    // creates an object to store our variable(s) in that will be sent back to the server.
    // $('select[name="category"]').val() is jQuery and gets the current selected value from the dropdown.
    var parameters = {};

    //this is AJAX and it calls the /blog endpoint on the server(in app.js) and sends the paramters object.
    $.get( '/sensor',parameters, function(d) {

        // When the server returns information, the returned data (hanlebars html) is added to the blogpost DIV.
        // Alternatively, if the server is sending back JSON data, you can use it to create a map or graph etc.
        console.log(d)
        data = d;
        draw()

    });
}

// put anything you would like to run on pageload inside here
function init(){
    getResults()

}

// call the init function to start
init()
    // set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", '100%')
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
function draw(){

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ')(d.time); }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.temperature; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // Add the line
    svg.append("path")
      .datum(data)
    //   .filter(function(d) { return d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ')(d.sensortime) < new Date() })
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ')(d.time)) })
        .y(function(d) { return y(d.temperature) })
        .curve(d3.curveMonotoneX) // apply smoothing to the line

        )


}
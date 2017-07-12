// Canvas setup
var canvas = new fabric.Canvas('canvas');
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 20;
canvas.freeDrawingBrush.color = "#000000";
canvas.backgroundColor = "#ffffff";
canvas.renderAll()

// Clear button callback
$("#clear-canvas").click(function(){ 
  canvas.clear(); 
  canvas.backgroundColor = "#ffffff";
  canvas.renderAll();
});

// Predict button callback
$("#predict").click(function(){  

  // Get canvas contents as url
	var fac = (1.) / 13.; 
	var url = canvas.toDataURLWithMultiplier('png', fac);
  console.log(url);

  // Post url to python script
	var jq = $.post('cgi-bin/mnist.py', url)
		.done(function (json) {
			if (json.result) {
			   console.log("OK.")
         console.log(json)
         updateChart(json.data)
			} else {
         console.log(json)
			   console.log("API Error: Error occured.");
			}
		})
		.fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("API Error: " + err);
 		}
 	);

});

// Iniitialize d3 bar chart
$('#svg-chart').hide();
var labels = ['0','1','2','3','4','5','6','7','8','9'];
var vals = [0,0,0,0,0,0,0,0,0,0,0];

var margin = {top: 0, right: 0, bottom: 20, left: 0},
    width = 360 - margin.left - margin.right,
    height = 180 - margin.top - margin.bottom;

var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1)
    .domain(labels);
    
var y = d3.scale.linear()
          .range([height, 0])
          .domain([0,d3.max(vals)]);  

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(0);

svg.selectAll(".bar")
    .data(vals)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return x(i); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// Update chart data
function updateChart(data) {
  $('#svg-chart').show();
  y.domain([0,d3.max(data)])
  d3.selectAll("rect")
    .data(data)
    .transition()
    .duration(500)
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); });
}
      
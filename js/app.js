$(document).ready(function() {

    const $valueSpan = $('.valueSpan');
    const $value = $('#yearSlider');
    $valueSpan.html("Year " + $value.val());
    $value.on('input change', () => {
  
      $valueSpan.html("Year " + $value.val());
    });
  });

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var arrestSvg = d3.select("#arrestRate")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

var arrestXScale = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var arrestXAxis = arrestSvg.append("g")
    .attr("transform", "translate(0," + height + ")");

var arrestYScale = d3.scaleLinear()
    .range([ height, 0])
var arrestYAxis = arrestSvg.append("g")
    .attr("class", "yAxis")

function renderArrestGraph(arrestType) {
    
    d3.csv("arrest-rate.csv", function(data) {

        arrestXScale.domain(data.map(function(d) { return d.race} ));
        arrestXAxis.transition().duration(1000).call(d3.axisBottom(arrestXScale));

        arrestYScale.domain([0, d3.max(data, function(d) { return +d['total']} )]);
        arrestYAxis.transition().duration(1000).call(d3.axisLeft(arrestYScale));

        var u = arrestSvg.selectAll("rect")
            .data(data);

        u.enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return arrestXScale(d.race); })
        .attr("y", function(d) { return arrestYScale(d[arrestType]); })
        .attr("width", arrestXScale.bandwidth())
        .attr("height", function(d) { return height - arrestYScale(d[arrestType]); })
        .attr("fill", "#0f98f8")
    })
}

renderArrestGraph('total')

var slider = document.getElementById("yearSlider");

var recidivismSvg = d3.select("#recidivism")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

var recidivismXScale = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var recidivismXAxis = recidivismSvg.append("g")
    .attr("transform", "translate(0," + height + ")");

var recidivismYScale = d3.scaleLinear()
    .range([ height, 0])
var recidivismYAxis = recidivismSvg.append("g")
    .attr("class", "yAxis")

function renderRecidivismGraph(year) {

    d3.csv("recidivism.csv", function(data) {

        recidivismXScale.domain(data.map(function(d) { return d.race } ));
        recidivismXAxis.transition().duration(1000).call(d3.axisBottom(recidivismXScale));

        recidivismYScale.domain([0, d3.max(data, function(d) { return +d['year10']} )]);
        recidivismYAxis.transition().duration(1000).call(d3.axisLeft(recidivismYScale));

        var u = recidivismSvg.selectAll("rect")
            .data(data);

        u.enter()
        .append("rect")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return recidivismXScale(d.race); })
        .attr("y", function(d) { return recidivismYScale(d[year]); })
        .attr("width", recidivismXScale.bandwidth())
        .attr("height", function(d) { return height - recidivismYScale(d[year]); })
        .attr("fill", "#0f98f8")
    })
}

renderRecidivismGraph('year1')

function updateGraph(value) {
    var year = 'year' + value;
    renderRecidivismGraph(year);
}
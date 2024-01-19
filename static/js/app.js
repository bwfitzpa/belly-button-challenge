// Belly button app

// Reading in the samples.json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

d3.json(url).then(function(allSamples) {
    console.log(allSamples);
    const metadata = allSamples.metadata;
    const samples = allSamples.samples;
    const names = allSamples.names;

    //Setting the default bar chart
    function barChart() {
        let selectedNumber = '940'
        let selectedID = samples.find(sample => sample.id === selectedNumber);
        let sampleValues = selectedID.sample_values.slice(0,10);
        let otuIDs = selectedID.otu_ids.slice(0,10);
        let otuLabels = selectedID.otu_labels.slice(0,10);
        let data = [{
            x: sampleValues,
            y: otuIDs.map(id => `OTU ${id}`),
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }];
  
        let layout = {
            height: 600,
            width: 425
        };
  
        Plotly.newPlot("bar", data, layout);
    }

    //Creating an array of all the ids to use in the dropdown menu
    let ids = names.map(sample => sample);
        
    //Populate dropdown menu with sample IDs
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.selectAll("option")
        .data(ids)
        .enter()
        .append("option")
        .text(id => id)

    //Creating a function to update the bar chart when a new subject is selected
    function getBarChart() {
        let testSubjectID = d3.select("#selDataset").property("value");    
        let selectedID = samples.find(sample => sample.id === testSubjectID);
        let sampleValues = selectedID.sample_values.slice(0, 10);
        let otuIDs = selectedID.otu_ids.slice(0, 10);
        let otuLabels = selectedID.otu_labels.slice(0, 10);
        let data = {
            selectedX: sampleValues,
            selectedY: otuIDs.map(id => `OTU ${id}`),
            selectedText: otuLabels
        };
        // Call function to update the chart
        updateBarChart(data);
    }
    
    function updateBarChart(data) {
        Plotly.update("bar", {
            x: [data.selectedX],
            y: [data.selectedY],
            text: [data.selectedText]
        });
    }    
 
    //Default Demographic Info Text Box
    function demographicInfo () {
        subjectIDString = "940"
        //Looked up parseInt to convert a string to an integer on stack overflow
        subjectID = parseInt(subjectIDString)
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        //Looked up object.entries on javascript.info
        let selectedID = Object.entries(selectedIDMetadata).map(([key, value]) => `${key}: ${value}`);
        //Looked up how to display text on stack overflow
        let testSubjectInfo = document.getElementById("sample-metadata");
        //Iterate through the array to make individual lines to display, looked up on stack overflow
        selectedID.forEach(element => {
            let subjectInfo = document.createElement('p');
            subjectInfo.textContent = element;
            testSubjectInfo.appendChild(subjectInfo);
        });
    }

    
    //Function to replace demographic info when a new subject is selected
    function getDemographicInfo () {
        let subjectID = d3.select("#selDataset").property("value");
        subjectIDString = subjectID
        subjectID = parseInt(subjectIDString)
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        let selectedID = Object.entries(selectedIDMetadata).map(([key, value]) => `${key}: ${value}`);
        console.log(selectedID);
        let testSubjectInfo = document.getElementById("sample-metadata");
        testSubjectInfo.innerHTML = '';
        //Iterate through the array to make individual lines to display
        selectedID.forEach(element => {
            let subjectInfo = document.createElement('p');
            subjectInfo.textContent = element;
            testSubjectInfo.appendChild(subjectInfo);
        });
    }
    
    //Default Bubble Chart, looked up how to make a bubble chart on plotly.com
    function bubbleChart() {
        let selectedNumber = '940'
        let selectedID = samples.find(sample => sample.id === selectedNumber);
        let otuIDs = selectedID.otu_ids;
        let sampleValues = selectedID.sample_values
        let otuLabels = selectedID.otu_labels
        let data = [{
            x: otuIDs,
            y: sampleValues,
            mode: 'markers',
            text: otuLabels,
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: 'Jet'
            },
        }];
        let layout = {
            showlegend: false,
            height: 600,
            width: 1200,
        };
        Plotly.newPlot("bubble", data, layout)
    }

    //Creating a function to update the bubble chart when a new subject is selected
    function getBubbleChart() {
        let testSubjectID = d3.select("#selDataset").property("value");
        let selectedID = samples.find(sample => sample.id === testSubjectID);
        let otuIDs = selectedID.otu_ids;
        let sampleValues = selectedID.sample_values
        let otuLabels = selectedID.otu_labels
        let data = {
            selectedX: otuIDs,
            selectedY: sampleValues,
            selectedText: otuLabels,
            selectedMarker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: 'Jet'
            },
        };
        // Call function to update the chart
        updateBubbleChart(data);
    }
    function updateBubbleChart(data) {
        Plotly.update("bubble", {
            x: [data.selectedX],
            y: [data.selectedY],
            text: [data.selectedText],
            marker: [data.selectedMarker]
        });
    }

    //Creating the initial gauge chart for belly button washing frequency, looked up how to make a gauge chart on plotly.com
    function gaugeChart() {
        subjectIDString = "940"
        subjectID = parseInt(subjectIDString)
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        let washFreq = selectedIDMetadata.wfreq
        //Looked up how to format the chart on stack overflow
        let data = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                shape: "angular",
                bar: {thickness:0.25, color: "rgb(0,0,0)"},
                bordercolor: "rgb(0,0,0)",
                borderwidth: 2,
                axis:{
                    range:[0,9],
                    visible: true,
                    thickmode: "array",
                    tickvals: [1,2,3,4,5,6,7,8,9],
                    tickfont: {size: 16, font:"Arial Black"},
                    ticks: "outside"},
                steps: [
                    {range: [0, 1], color: "rgb(255, 0, 0)"},
                    {range: [1, 2], color: "rgb(255, 128, 0)"},
                    {range: [2, 3], color: "rgb(255, 192, 0)"},
                    {range: [3, 4], color: "rgb(255, 255, 0)"},
                    {range: [4, 5], color: "rgb(192, 255, 0)"},
                    {range: [5, 6], color: "rgb(128, 255, 0)"},
                    {range: [6, 7], color: "rgb(0, 255, 0)"},
                    {range: [7, 8], color: "rgb(0, 192, 0)"},
                    {range: [8, 9], color: "rgb(0, 128, 0)"}
                    ]
            }
        }];
        let layout = {
            width: 600,
            height: 600,
            title: {
                text: "Belly Button Washing Frequency",
                font: {
                    family: 'Arial Black',
                    size: 24
                },
                x: 0.5,
                y: 0.8
            },
            annotations: [{
                text: "Scrubs per Week",
                showarrow: false,
                align:'top center',
                font: {
                    family: "Arial",
                    size: 24
                },
                x: 0.5,
                y: 0.9   
            }]
        };
        Plotly.newPlot('gauge', data, layout)
    };
    //Creating a function to update the gauge chart when a new subject is selected
    function getGaugeChart() {
        let testSubjectID = d3.select("#selDataset").property("value");
        //console.log("Selected ID: ", testSubjectID);
        let selectedID = samples.find(sample => sample.id === testSubjectID);
        let subjectID = parseInt(selectedID.id);
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        let washFreq = selectedIDMetadata.wfreq;
        let data = [{
            value: washFreq,
        }];
            Plotly.update("gauge", {
                value: [data[0].value]})
    }
    //On change to the DOM, call the functions getBarChart(), getDemographicInfo(), getBubbleChart(), and getGaugeChart()
    // using the function newSubjectID()
    function newSubjectID(){
        getBarChart();
        getDemographicInfo();
        getBubbleChart();
        getGaugeChart();
    }
    d3.selectAll("#selDataset").on("change", newSubjectID);
    
    // Call functions for initial bar chart, demographic info, bubble chart, and gauge chart
    barChart();
    demographicInfo();
    bubbleChart();
    gaugeChart();
})

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

    //Setting the default bar chart, div id="bar"
    function barChart() {
        let selectedNumber = '940'
        let selectedID = samples.find(sample => sample.id === selectedNumber);
        console.log("Selected Sample:", selectedID);
        let sampleValues = selectedID.sample_values.slice(0,10);
        console.log(sampleValues);
        let otuIDs = selectedID.otu_ids.slice(0,10);
        console.log(otuIDs);
        let otuLabels = selectedID.otu_labels.slice(0,10);
        console.log(otuLabels);
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

    //Create an array of all the ids
    let ids = names.map(sample => sample);

    console.log("IDs", ids);
        
    //Populate dropdown menu with sample IDs
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.selectAll("option")
        .data(ids)
        .enter()
        .append("option")
        .text(id => id)
        //.attr("value", d => d);


    //Creating a function to update the bar chart when a new subject is selected
    function getBarChart() {
        let testSubjectID = d3.select("#selDataset").property("value");
        console.log("Selected ID: ", testSubjectID);
    
        let selectedID = samples.find(sample => sample.id === testSubjectID);
        console.log("Selected Sample:", selectedID);
        let sampleValues = selectedID.sample_values.slice(0, 10);
        console.log(sampleValues);
        let otuIDs = selectedID.otu_ids.slice(0, 10);
        console.log(otuIDs);
        let otuLabels = selectedID.otu_labels.slice(0, 10);
        console.log(otuLabels);
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
        subjectID = parseInt(subjectIDString)
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        //Looked up parseInt to convert a string to an integer on stack overflow
        console.log("Selected ID Metadata:", selectedIDMetadata);
        //Looked up object.entries on javascript.info
        let selectedID = Object.entries(selectedIDMetadata).map(([key, value]) => `${key}: ${value}`);
        console.log(selectedID);
        //Looked up how to display text on stack overflow
        let testSubjectInfo = document.getElementById("sample-metadata");
        //Iterate through the array to make individual lines to display, looked up on stack overflow
        selectedID.forEach(element => {
            let subjectInfo = document.createElement('p');
            subjectInfo.textContent = element;
            testSubjectInfo.appendChild(subjectInfo);
        });
    }

    
    //function to replace demographic info when a new subject is selected
    function getDemographicInfo () {
        let subjectID = d3.select("#selDataset").property("value");
        console.log("Selected ID: ",subjectID);

        subjectIDString = subjectID
        subjectID = parseInt(subjectIDString)
        let selectedIDMetadata = metadata.find(sample => sample.id === subjectID);
        //Looked up parseInt to convert a string to an integer on stack overflow
        console.log("Selected ID Metadata:", selectedIDMetadata);
        //Looked up object.entries on javascript.info
        let selectedID = Object.entries(selectedIDMetadata).map(([key, value]) => `${key}: ${value}`);
        console.log(selectedID);
        //Looked up how to display text on stack overflow
        let testSubjectInfo = document.getElementById("sample-metadata");
        // Clear existing content, looked up on stack overflow how to clear the text so could add new text
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
        console.log("Selected Sample:", selectedID);
        let otuIDs = selectedID.otu_ids;
        console.log("Bubble Chart otu_ids: ", otuIDs);
        let sampleValues = selectedID.sample_values
        console.log("Bubble Chart sample_values: ", sampleValues);
        let otuLabels = selectedID.otu_labels
        console.log("Bubble Chart otu_labels: ", otuLabels)
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
        console.log("Selected ID: ", testSubjectID);
        let selectedID = samples.find(sample => sample.id === testSubjectID);
        console.log("Selected Sample:", selectedID);
        let otuIDs = selectedID.otu_ids;
        console.log("Bubble Chart otu_ids: ", otuIDs);
        let sampleValues = selectedID.sample_values
        console.log("Bubble Chart sample_values: ", sampleValues);
        let otuLabels = selectedID.otu_labels
        console.log("Bubble Chart otu_labels: ", otuLabels);
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

    //On change to the DOM, call the functions getBarChart() and getDemographicInfo using the function newSubjectID()
    function newSubjectID(){
        getBarChart();
        getDemographicInfo();
        getBubbleChart();
    }
    d3.selectAll("#selDataset").on("change", newSubjectID);
    
    // Call functions for initial bar chart, demographic info, and bubble chart
    barChart();
    demographicInfo();
    bubbleChart();
})

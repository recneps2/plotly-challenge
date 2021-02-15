function dropDown() {
    var dropDownID = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
     // console.log(data);
     var sampleIDs = data.names;
     // console.log(sampleIDs);
     sampleIDs.forEach((sampleValue) => {
         dropDownID.append("option")
         .text(sampleValue)
         .property("value", sampleValue);
     });
 var sampleID  = sampleIDs[0];
 // console.log(sampleID)
 metaData(sampleID);
 chart(sampleID);
 });
 
 }
 dropDown();
 
 function optionChanged(sample) {
     metaData(sample);
     chart(sample);
     constructGauge(sample);
 };
 
 function metaData(sampleID) {
     d3.json("samples.json").then((data) => {
         // console.log(data);
         var metaIDs = data.metadata; 
         // console.log(metaIDs.id);
         // for (var i = 0; i < metaIDs.length; i++) {
             // console.log(metaIDs[i])
             var filterID = metaIDs.filter(object => object.id == sampleID);
             // console.log(filterID);
             var results = filterID[0];
             var display = d3.select("#sample-metadata");
             display.html("");
             Object.entries(results).forEach(([key, value]) => {
                 display.append("h6").text(`${key} ${value}`);
             });
             gauge(results.wfreq);
 
     });
 };
 
 function chart(sampleID) {
         d3.json("samples.json").then((data) => {
         var samples = data.samples; 
         var filterID = samples.filter(object => object.id == sampleID);
             console.log(filterID);
         var results = filterID[0];
         var otuIDs = results.otu_ids;
         var sampleValues = results.sample_values;
         var otuLabels = results.otu_labels;
         var barData = [{
             x: sampleValues.slice(0, 10).reverse(),
             y: otuIDs.slice(0, 10).map(otu_ID => `otuID ${otu_ID}`).reverse(),
             text: otuLabels.slice(0, 10).reverse(),
             type: "bar", 
             orientation: "h"
         }];
         Plotly.newPlot("bar", barData)
         var bubbleData = [{
             x: otuIDs,
             y: sampleValues,
             text: otuLabels,
             mode: "markers",
             marker: {
                 size: sampleValues,
                 color: otuIDs,
                 colorscale: "Earth" 
             }
         }];
         Plotly.newPlot("bubble", bubbleData)
     });
 
 
         
 };
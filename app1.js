// var jsonFile = 'samples.json';
function init() {    
    d3.json("samples.json").then((x) => {
        var sampleid = d3.select("#selDataset");
        var samplenames = x.names;
        samplenames.forEach((sample_name) => {
            sampleid
                .append("option")
                .text(sample_name)
                .property("value", sample_name);
        });
        var firstid = samplenames[0];
        builddemographic(firstid)
        buildcharts(firstid)
        
    });
}
init()

function builddemographic(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // console.log(metadata)
        var filterdata = metadata.filter(x => x.id == sample)
        // console.log(filterdata);
        var filteresult = filterdata[0];
        // console.log(filteresult);
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        Object.entries(filteresult).forEach(function([key, value]) {
             var row = sample_metadata.append("tr");
            // console.log(key,value);
            row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
            // console.log(key,value);
            row.append('td').html(`<font size ='1'>${value}</font>`);
            // console.log(key,value);
        });
        });
}

function buildcharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        // Build a Bubble Chart
        var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
        };
        var bubbleData = [
        {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
            }
        }
        ];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
        {
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        ];
        var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
        };
        Plotly.newPlot("bar1", barData, barLayout);
    });    
}
function optionChanged(Sample1) {
    buildcharts(Sample1);
    builddemographic(Sample1);
  }






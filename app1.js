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
        var test2 = d3.select("option").text();
        console.log(test2)
    });
}
init()
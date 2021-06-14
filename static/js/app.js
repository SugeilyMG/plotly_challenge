d3.json("../data/samples.json").then((importedData) => {

    var data = importedData;

    var allsub_id  = data.names
    var allsample_values = data.samples.map(sample => sample.sample_values);
    var allotu_ids = data.samples.map(otu => otu.otu_ids);
    var allotu_labels = data.samples.map(label => label.otu_labels);
    var chosen_id;

    console.log(allsub_id);
    console.log(allsample_values);
    console.log(allotu_ids);
    console.log(allotu_labels);

    function get_SubId(chosen_id) {
      current_samples = [];
      current_ids = [];
      current_labels=[];
      for (var i = 0 ; i < allsub_id.length ; i++){
          if ( allsub_id[i] === chosen_id ) {
            current_samples.push(allsample_values[i]);
            current_ids.push(allotu_ids[i]);
            current_labels.push(allotu_labels[i]);
          }
      }
    };

    setHorizontalBar('940');

    function setHorizontalBar(chosen_id) {
      get_SubId(chosen_id);

      var trace = [{
        type: 'bar',
        x: current_samples,
        y: current_ids,
        orientation: 'h'
      }];

      var data = [trace];

      Plotly.newPlot('bar', data);
    };

    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      // Initialize an empty array for the country's data
      var data = [];
    
      if (dataset == 'us') {
          data = us;
      }
      else if (dataset == 'uk') {
          data = uk;
      }
      else if (dataset == 'canada') {
          data = canada;
      }
      // Call function to update the chart
      updatePlotly(data);
    }

          function assignOptions(textArray, selector) {
            for (var i = 0; i < textArray.length;  i++) {
                var currentOption = document.createElement('option');
                currentOption.text = textArray[i];
                selector.appendChild(currentOption);
              }
        }
        assignOptions(allsub_id, id_selector);
        console.log(allsub_id);

        function update_id(){
          setHorizontalBar(id_selector.value);
        }

      id_selector.addEventListener('change', update_id, false);
    });
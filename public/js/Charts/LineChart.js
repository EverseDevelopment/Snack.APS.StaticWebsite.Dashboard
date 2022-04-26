function createLineChart(name, title, input){
    var _this = this;
    
    var ctx = document.getElementById(name);

    
    var data = {
      labels: input.xReference,
      datasets: [
      ]
    };

    var cumulativeSum = (sum => value => sum += value)(0);

    for(var i=0; i<input.labels.length; i++){
      data.datasets[i] = {
        label: input.labels[i],
        data: input.data[input.labels[i]].map(cumulativeSum)
    };
      data.datasets[i].borderColor = DashBoardColors.background[i + 4]
      data.datasets[i].fill = false;
      cumulativeSum = (sum => value => sum += value)(0);
    }

    var stackedLine = new Chart(ctx, {
        type: 'line',
        data: data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { 
              position: 'top',
              labels: {
                       boxWidth: 10,
                       fontSize: 8
                     } 
                    },
            elements: {
                point: {
                    pointStyle: 'circle',
                },
                line: {
                    tension: 0
                }
            },
            title: {
              display: true,
              text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        stacked: true,
                        beginAtZero: true,
                        callback: function (value) { if (value % 1 === 0) { return value; } },
                        suggestedMax: 4.1,
                        // display: false //this will remove only the label
                    }
                }],
                xAxes: [{ gridLines: { display: false } }]
            },
          //   'onClick': function (evt, item) {
          //     console.log(item);
          //     var activePoint = stackedLine.getElementAtEvent(evt)[0];
          //     var data = activePoint._chart.data;
          //     var datasetIndex = activePoint._datasetIndex;
          //     GraphOnClick(input.elements, _this, item, datasetIndex);
          // },
        }
        
    });
}



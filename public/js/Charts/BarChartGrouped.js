    function createBarChartGrouped(name, title, input){
    var _this = this;
    var ctx = document.getElementById(name);
   
    var data = {
        labels: input.xReference,
        datasets: [
        ]
    };


    for(var i=0; i< input.labels.length; i++){
        data.datasets[i] = {
            label: input.labels[i],
            data: input.data[input.labels[i]]
        };
        data.datasets[i].backgroundColor = DashBoardColors.background[i + 4]
    }

    
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            barValueSpacing: 20,
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                    }
                }],
                xAxes: [{ gridLines: { display: false } }]
            },
            title: {
                display: true,
                text: title
            },
            legend: {
                display: true,
                labels: {
                  boxWidth: 10,
                  fontSize: 8
                }
            },
            'onClick': function (evt, item) {
                var activePoint = myBarChart.getElementAtEvent(evt)[0];
                var data = activePoint._chart.data;
                var datasetIndex = activePoint._datasetIndex;
                GraphOnClick(input.elements, _this, item, datasetIndex);
            },
        }
    });
}





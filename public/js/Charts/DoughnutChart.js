function createDoughnutChart(Name, Title, input){
    
    var _this = this;

    var data = {
        datasets: [{   
        data: input.data,
        backgroundColor: DashBoardColors.background.slice(0, input.data.length),
        borderColor: DashBoardColors.background.slice(0, input.data.length),
        borderWidth: 1
        }],   // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: input.labels
    };

    var ctx = document.getElementById(Name);
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        display: false
                    },
                    display: false
                    
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    },
                    display: false
                }]
            },
            title: {
                display: true,
                text: Title,
                wrap: false,
                maxWidth: 25,
            },
            legend: {
                display: false
            },
            'onClick': function (evt, item) {
                console.log(input.elements);
                GraphOnClick(input.elements, _this, item);
            }
        }
    });
}


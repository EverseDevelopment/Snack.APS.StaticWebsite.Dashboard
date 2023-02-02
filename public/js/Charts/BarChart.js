function createBarChart(name, title, input) {
    var _this = this;
    var ctx = document.getElementById(name);

    var data = {
        labels: input.labels,
        datasets: [{
            data: input.data,
            backgroundColor: DashBoardColors.background.slice(0, input.data.length),
            borderColor: DashBoardColors.background.slice(0, input.data.length),
            borderWidth: 1
        }]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
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
                }],
                yAxes: [{
                    gridLines: {
                        display:true
                    },
                }]
            },
            title: {
                display: true,
                text: title
            },
            legend: {
                display: false
            },
            'onClick': function (evt, item) {
                GraphOnClick(input.elements, _this, item);
            },
        },
    });
}


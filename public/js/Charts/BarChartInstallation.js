function createBarChartGroupedInstall(name, title, input){
    var _this = this;
    var ctx = document.getElementById(name);
   
    var data = {
        labels: input.xReferenceInstall,
        datasets: [
        ]
    };


    for(var i=0; i< input.Installlabels.length; i++){
        data.datasets[i] = {
            label: input.Installlabels[i],
            data: input.Installdata[input.Installlabels[i]]
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
            }
        }
    });
}





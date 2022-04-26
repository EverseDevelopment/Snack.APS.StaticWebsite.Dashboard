//GraphsOnClick
function GraphOnClick(objects, _this, item, datasetIndex = 0) {
_this.viewer.clearThemingColors()
                console.log(datasetIndex);
                var dbItems = [];
                if(item[0]._model.datasetLabel != null)
                {
                  dbItems = objects[item[datasetIndex]._model.datasetLabel][[item[0]._model.label]];
                }
                else
                {
                  dbItems = objects[item[0]._model.label];
                }
                var labelColour = item[datasetIndex]._model.backgroundColor;
                labelColour = labelColour.replace(/[a-z]/gi, ''); 
                labelColour = labelColour.replace(/[()]/g,'')
                labelColour = labelColour.replace(/[ ]/g,'')
                var res = labelColour.split(",");
                const color = colorToVec4(res);
                for (i = 0; i < dbItems.length; i++) {
                    _this.viewer.setThemingColor(dbItems[i], color);
                  } 
                viewer.impl.invalidate(true);
                _this.viewer.isolate(dbItems);
}

//Convert RGB number to THREE.vector
function colorToVec4(color) {
  var res = new THREE.Vector4(remapRange(color[0]), remapRange(color[1]), remapRange(color[2]) + 0, color[3]);
return res;
}

//Re range RGB numbers from 0 to 255
function remapRange(number)
{
  var result = ((number - 0) * 1 / 255) + 0;
  return result;
}


function getDataCount(object){

  const len = Object.keys(object).length
  const total = [];

  Object.keys(object).forEach(function(key) {
      total.push (Object.keys(object[key]).length);     
    });

  return total;
}

//Buttons
function switchButton(buttonName){
  document.getElementById("position01").remove();
  document.getElementById("position02").remove();

  var dataTableDOM = document.getElementById("dataTable");
  if(dataTableDOM.parentElement.id != "row01")
  {
    var firstRowChild = document.getElementById("row01").firstChild;
    firstRowChild.remove();
  }
  else{
    dataTableDOM.remove();
  }

  var buttons = document.getElementById("containerButtons").childNodes;
  for (i = 0; i < buttons.length; i++) {
      if(buttons[i].id != buttonName)
      {
          buttons[i].style.background='white';
          buttons[i].style.color='#2d2d2d';
      }
      else
      {
          buttons[i].style.background='#2d2d2d';
          buttons[i].style.color='white'
      }
  } 

  var col01 = document.getElementById("col01");

  const canvas01 = document.createElement("canvas");
  canvas01.setAttribute("id", "position01");
  canvas01.classList.add("canvasfill");
  col01.appendChild(canvas01);

  var col02 = document.getElementById("col02");

   const canvas02 = document.createElement("canvas");
   canvas02.setAttribute("id", "position02");
   canvas02.classList.add("canvasfill");
   col02.appendChild(canvas02);

  var row01 = document.getElementById("row01");

  //Add data table
  const table = document.createElement("table");
  table.setAttribute("id", "dataTable");
  table.classList.add("display");
  table.style.width = "100%";

  row01.appendChild(table);
}



function Quantities(input){
  createDoughnutChart('position01', 'Sum of Count', input.quantities);
  createBarChart('position02', 'Unit Type', input.quantities);

  var dataSet = [
     [ "Column", "38", "950", "£9,500", "25", "£250"],
     [ "Donuts", "33", "825", "£21,450", "25", "£650"],
     [ "Duct Wall", "132", "10296", "£462,000", "78", "£3,500"],
     [ "External Panel", "206", "13184", "£607,700", "64", "£2,950"],
     [ "External Parapet", "43", "2580", "£81,270", "60", "£1,890"],
     [ "Floor", "724", "36200", "£1,086,000", "50", "£1,500"],
     [ "Ground Beam", "93", "3720", "£93,000", "40", "£1,000"],
     [ "Internal Panel", "519", "35811", "£1,281,930", "69", "£2,470"],
     [ "L Unit", "12", "840", "£37,200", "70", "£3,100"],
     [ "Stair Unit", "33", "2211", "£72,600", "67", "£2,200"],
     [ " ", " ", " ", " ", " ", " "],
     [ "Grand Total", "1833", "106617", "£3,752,650", "58.2", "£2,047"]
 ];

  $(document).ready(function() {
     $('#dataTable').DataTable( {
         data: dataSet,
         columns: [
             { title: "Row Labels" },
             { title: "Sum of Count" },
             { title: "ManHours" },
             { title: "Cost" },
             { title: "Unit Hours" },
             { title: "Unit Cost" }
         ],
         columnDefs: [
          {
              targets: '_all',
              className: 'dt-center'
          }
        ],
        "scrollY": '26vh',
        "scrollX": true,
         "bFilter": false,
         "ordering": false,
         "bInfo": false,
         "paging": false,
         "autoWidth": true
     } );
 } );

   var table = document.getElementById("dataTable");
   table.classList.add("nowrap"); 

}


function Design(input){
               
  var Input = {};
  Input["Labels"] = ['Mar','Apr','May','Jun','Jul'];
  Input["Datasets"] = [{ 
    data: [341,768,1009,1823,1833],
    label: "Design DS1",
  }, { 
    data: [341,768,1009,1823,1833],
    label: "Design DS2",
  },
  { 
    data: [341,768,1009,1823,1833],
    label: "Design IFC",
  }
];


  createLineChart('position01', 'Design Drawing Issue', input.design);
  createBarChartGrouped('position02', 'Counts', input.design);

  var dataSet = [
     [ "Mar", "285", "150", "110" ],
     [ "Apr", "483", "485", "484" ],
     [ "May", "230", "249", "227" ],
     [ "Jun", "762", "366", "346" ],
     [ "Jul", "73", "583", "666" ],
     [ " ", " ", " ", " " ],
     [ "Gran Total", "1833", "1833", "1833" ]
 ];

  $(document).ready(function() {
     $('#dataTable').DataTable( {
         data: dataSet,
         columns: [
             { title: "Row Labels"},
             { title: "Count of DS1" },
             { title: "Count of DS2" },
             { title: "Count of IFC" }
         ],
         columnDefs: [
          {
              targets: '_all',
              className: 'dt-center'
          }
        ],
        "scrollY": '26vh',
        "scrollX": true,
         "bFilter": false,
         "ordering": false,
         "bInfo": false,
         "paging": false,
         "autoWidth": true,
     } );
 } );

 var table = document.getElementById("dataTable");
 table.classList.add("nowrap"); 

}


function Manufacture(input){
               
  createLineChart('position01', 'Manufacture and Logistics', input.manufacture);
  createBarChartGrouped('position02', 'Counts', input.manufacture);

  var dataSet = [
     [ "WBC111F", "1833", " ", " ", " "],
     [ "Banagher", "31", "1.7%", "5", "16.1" ],
     [ "Bison", "1332", "72.7%", "400", "30.0%"],
     [ "FP McCann", "470", "25.6%", "321", "68.3%"],
     [ " ", " ", " ", " ", " "],
     [ "Grand Total", "1833", " ", "726", "39.6%"]
 ];

  $(document).ready(function() {
     $('#dataTable').DataTable( {
         data: dataSet,
         columns: [
             { title: "Row Labels" },
             { title: "Sum of Count" },
             { title: "Plan" },
             { title: "Actual Count" },
             { title: "Actual %" }
         ],
         columnDefs: [
          {
              targets: '_all',
              className: 'dt-center'
          }
        ],
        "scrollY": '22vh',
        "scrollX": true,
         "bFilter": false,
         "ordering": false,
         "bInfo": false,
         "paging": false,
         "autoWidth": true,
     } );
 } );

 var table = document.getElementById("dataTable");
 table.classList.add("nowrap"); 

}

function Installation(input){
               
  createLineChart('position01', 'Site Installation', input.installation);
  createBarChartGroupedInstall('position02', 'Output', input.installation);

  var dataSet = [
     [ "Crane 01", "1000", "74", "13.51", "389", "611", "35", "11.1", "-3.2", "55" ],
     [ "Crane 02", "833", "74", "11.25", "346", "487", "32", "10.8", "-1.1", "-45" ],
     [ "Total", "1833", "140", "13.1", "735", "1098", "67", "11.0", "-2.1", "100" ]
 ];

  $(document).ready(function() {
     $('#dataTable').DataTable( {
         data: dataSet,
         columns: [
             { title: "Crane", "width": "10%" },
             { title: "Panel Count", "width": "10%" },
             { title: "Planned Days" },
             { title: "Output" },
             { title: "Current Count" },
             { title: "Units Left" },
             { title: "Actual Days" },
             { title: "Output" },
             { title: "Variance" },
             { title: "Forecast Finish" }
         ],
         columnDefs: [
          {
              targets: '_all',
              className: 'dt-center'
          }
        ],
        "scrollY": '18vh',
        "scrollX": true,
         "bFilter": false,
         "ordering": false,
         "bInfo": false,
         "paging": false,
         "autoWidth": true,
     } );
 } );

 var table = document.getElementById("dataTable");
 table.classList.add("nowrap"); 

}
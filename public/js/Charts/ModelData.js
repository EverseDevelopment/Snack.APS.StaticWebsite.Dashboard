function getListCategories (elements, _callback){
  var cateElem = [];
  var object = {}

  object["Elements"] = []
  object["quantities"] = {};
  object["quantities"]["elements"] = {};
  object["quantities"]["Family"] = [];

  var nonRenderingCategories = ["Revit ","Revit <Sketch>","Revit <Room Separation>", "Revit <Space Separation>", "Revit <Stair/Ramp Sketch: Boundary>",
  "Revit <Stair/Ramp Sketch: Landing Center>","Revit <Stair/Ramp Sketch: Riser>","Revit <Stair/Ramp Sketch: Run>","Revit Air Terminal Tags","Revit Analytical Columns",
  "Revit Analytical Nodes", "Revit Automatic Sketch Dimensions", "Revit Building Type Settings", "Revit Category", "Revit Center Line", "Revit Duct Systems",
  "Revit Duct Tags", "Revit Family Type", "Revit Cameras", "Revit Center line","Revit Constraints","Revit Curtain Wall Grids","Revit Zone Tags", "Revit Work Plane Grid",
  "Revit Wires", "Revit Wire Tags", "Revit Viewports", "Revit View", "Revit Title Blocks", "Revit Text Notes", "Revit Survey Point", "Revit Sun Path", "Revit Structural Load Cases",
  "Revit Spot Elevation Symbols", "Revit Spaces", "Revit Space Type Settings", "Revit Space Tags", "Revit Shared Site", "Revit Section Boxes", "Revit Schedules", "Revit Schedule Graphics",
  "Revit Revision", "Revit Reference Planes", "Revit Project Information", "Revit Project Base Point", "Revit Primary Contours", "Revit Piping Systems", "Revit Pipe Tags",
  "Revit Area Schemes", "Revit Color Fill Legends", "Revit Color Fill Schema", "Revit Conduit Runs", "Revit Detail Items", "Revit Dimensions","Revit Document","Revit Electrical Circuits",
  "Revit Electrical Demand Factor Definitions", "Revit Electrical Equipment Tags", "Revit Electrical Load Classification Parameter Element", "Revit Electrical Load Classifications",
  "Revit Elevations","Revit Family Name","Revit Generic Annotations", "Revit Grids", "Revit Group", "Revit HVAC Load Schedules", "Revit HVAC Zones", "Revit Legend",
  "Revit Legend Components", "Revit Level", "Revit Lighting Fixture Tags", "Revit Lines", "Revit Mass","Revit Matchline","Revit Material Assets","Revit Materials",
  "Revit Mechanical Equipment Tags", "Revit Panel Schedule Templates - Branch Panel", "Revit Panel Schedule Templates - Data Panel", "Revit Panel Schedule Templates - Switchboard",
  "Revit Phases","Revit Sheet","Revit Views","Revit Rooms","Revit Analytical Walls","Revit Gutters","Revit Railing Rail Path Extension Lines","Revit Rectangular Straight Wall Opening",
  "Revit Spot Elevations"
 ];

   for(var i=0; i<elements.length; i++){
       temString = String(elements[i].properties[0].displayValue);
       if(temString != "" && !nonRenderingCategories.includes(temString))
       {          
          object["Elements"].push(elements[i].dbId)
          object["quantities"]["Family"].push(temString);

          if(typeof object["quantities"]["elements"][temString] == 'undefined' ) 
          {
            object["quantities"]["elements"][temString] = []; 
          }
           object["quantities"]["elements"][temString].push(elements[i].dbId)
        }            
   }
   _callback(object);
}

async function arraySimplify(obj, _callback){
  var arr = obj["quantities"]["Family"];
  
  arr.sort();
  var object = obj, element =arr[0] ,count = 0 ; 
  var rsltel = [];
  var rsltcount = [];


  if(arr.length === 0) return; //exit for empty array

  for(var i = 0; i < arr.length; i++){
      //count the occurences
      if(element !== arr[i]){
          rsltel.push(element);
          rsltcount.push(count);
          count =1;
          element = arr[i];
      }
      else{
          count++;
      }
  }
  rsltel.push(element);
  rsltcount.push(count);

  object["quantities"]["labels"] = rsltel;
  object["quantities"]['data'] = rsltcount;
  console.log("Quantities Data Loaded");

  _callback(object);

  
}

 function DesignData(elements) {
   var design = {};

   design["data"] = {};

   design["data"]["Design DS1"] = [10,20,30,40,50];
   design["data"]["Design DS2"] = [50,60,80,110,112];
   design["data"]["Design IFC"] = [60,70,75,85,95];

   design["elements"] = {};

   design["elements"]["Design DS1"] = [];
   design["elements"]["Design DS2"] = [];
   design["elements"]["Design IFC"] = [];

   design.xReference = ['Mar','Apr','May','Jun','Jul'];

   
    for(var i=0; i<design.xReference.length; i++){
      design.elements["Design DS1"][design.xReference[i]] = [];
     } 
 
     for(var i=0; i<design.xReference.length; i++){
      design.elements["Design DS2"][design.xReference[i]] = [];
     } 

     for(var i=0; i<design.xReference.length; i++){
      design.elements["Design IFC"][design.xReference[i]] = [];
     } 

   design.xReferenceVal = ["03/31/2020","04/30/2020","05/31/2020","06/30/2020","07/31/2020" ];

   var properties = ['Design DS1','Design DS2','Design IFC'];
   design["labels"] = properties;

   var itemsProcessed = 0;

    for(const item of elements){
      itemsProcessed++;
      viewer.getProperties(item, function(dbs){          
        properties.forEach(property => {
          var p = dbs.properties.filter(prop => property.includes(prop.displayName))[0];
          if (p !== undefined) {
            console.log({design, p})
            for(var i=0; i<design.xReferenceVal.length; i++){
              design.data[p.displayName][i]++;
              design.elements[p.displayName][design.xReference[i]].push(item);
              i=10;
            }
          }
        });
      });
      if(itemsProcessed === elements.length) {
        console.log("DesignData Data Loaded");
        return design;
      }
    }

}


function ManufactureData(elements) {
  var manufacture = {};

  manufacture["data"] = {};

  manufacture["data"]["Man - Mould"] = [100,105,110,140,145];
  manufacture["data"]["Man - Rebar"] = [50,60,70,80,80];
  manufacture["data"]["Man - Concrete"] = [40,50,80,90,100];
  manufacture["data"]["Log - Stock"] = [90,100,80,70,60];
  manufacture["data"]["Log - loaded"] = [50,80,90,50,25];
  manufacture["data"]["Log - Delivered"] = [75,85,88,92,96];

  manufacture["elements"] = {};

  manufacture["elements"]["Man - Mould"] = [];
  manufacture["elements"]["Man - Rebar"] = [];
  manufacture["elements"]["Man - Concrete"] = [];
  manufacture["elements"]["Log - Stock"] = [];
  manufacture["elements"]["Log - loaded"] = [];
  manufacture["elements"]["Log - Delivered"] = [];

  manufacture.xReference = ['Mar','Apr','May','Jun','Jul'];

  
   for(var i=0; i<manufacture.xReference.length; i++){
    manufacture.elements["Man - Mould"][manufacture.xReference[i]] = [];
    } 

    for(var i=0; i<manufacture.xReference.length; i++){
      manufacture.elements["Man - Rebar"][manufacture.xReference[i]] = [];
    } 

    for(var i=0; i<manufacture.xReference.length; i++){
      manufacture.elements["Man - Concrete"][manufacture.xReference[i]] = [];
    } 

    for(var i=0; i<manufacture.xReference.length; i++){
      manufacture.elements["Log - Stock"][manufacture.xReference[i]] = [];
    } 

    for(var i=0; i<manufacture.xReference.length; i++){
      manufacture.elements["Log - loaded"][manufacture.xReference[i]] = [];
    } 

    for(var i=0; i<manufacture.xReference.length; i++){
      manufacture.elements["Log - Delivered"][manufacture.xReference[i]] = [];
    } 
  

   manufacture.xReferenceVal = ["03/31/2020","04/30/2020","05/31/2020","06/30/2020","07/31/2020" ];

  var properties = ['Man - Mould','Man - Rebar','Man - Concrete', 'Log - Stock','Log - loaded','Log - Delivered'];
  manufacture["labels"] = properties;

  var itemsProcessed = 0;

   for(const item of elements){
     itemsProcessed++;
     viewer.getProperties(item, function(dbs){          
       properties.forEach(property => {
           var p = dbs.properties.filter(prop => property.includes(prop.displayName))[0];
           if (p)
             {  
               for(var i=0; i<manufacture.xReferenceVal.length; i++){
                 if(p.displayValue < manufacture.xReferenceVal[i] ){
                  manufacture.data[p.displayName][i]++;
                  manufacture.elements[p.displayName][manufacture.xReference[i]].push(item);
                   i=10;
                 }
             }
           }
          
       });
     });
     if(itemsProcessed === elements.length) {
      console.log("Manufacture Data Loaded");
       return manufacture;
     }
   }

}





    const countUnique = arr  => {
      return arr .reduce((acc, val, ind, array) => {
         if(array.lastIndexOf(val) === ind){
            return ++acc;
         };
         return acc;
      }, 0);
   };



function DifferenceDays(input1, input2) {
var StartPlanDate = ChangeFormatDate(input1);
var EndPlanDate = ChangeFormatDate(input2);
const date1 = new Date(StartPlanDate);
const date2 = new Date(EndPlanDate);
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

return diffDays;
}


function ChangeFormatDate(date) {
var initial = date.split(/\//);
return( [ initial[1], initial[0], initial[2] ].join('/'));
}


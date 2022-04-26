function showPowerBIReport(){
  
    if(modData["Load"] == "Done"){
        if(document.getElementById("maindashcontainer") != null){
            var myobj = document.getElementById("maindashcontainer");
            myobj.remove();
            viewer.resize();
        }
        else{
            addElement();
            viewer.resize();
            switchButton("button01");
            Quantities(modData); 
            modData.design = DesignData(modData.Elements);
            modData.manufacture = ManufactureData(modData.Elements);
        }
    }
    else{
        alert("Data not loaded yet");
    }


    
}



function addElement () {
    // create the main div
    const newDiv = document.createElement("div");
    newDiv.classList.add("col");
    newDiv.classList.add("fill");
    newDiv.setAttribute("id", "maindashcontainer");
    

    // Add row 01
    const row01 = document.createElement("div");
    row01.classList.add("row");
    row01.classList.add("rowfillDatatable");
    row01.setAttribute("id", "row01");


    //Add data table
    const table = document.createElement("table");
    table.setAttribute("id", "dataTable");
    table.classList.add("display");
    table.style.width = "100%";

    row01.appendChild(table);
    newDiv.appendChild(row01);


   // Add row 02
    const row02 = document.createElement("div");
    row02.classList.add("row");
    row02.classList.add("rowfill");
    row02.setAttribute("id", "graphics");
    //Add column01
    const col01 = document.createElement("div");
    col01.classList.add("col");
    col01.classList.add("collfill");
    col01.setAttribute("id", "col01");
    
    //add canvas
    const canvas01 = document.createElement("canvas");
    canvas01.setAttribute("id", "position01");
    canvas01.classList.add("canvasfill");
    col01.appendChild(canvas01);

    //Add column02
    const col02 = document.createElement("div");
    col02.classList.add("col");
    col02.setAttribute("id", "col02");
    col02.classList.add("collfill");
    
    //add canvas
    const canvas02 = document.createElement("canvas");
    canvas02.setAttribute("id", "position02");
    canvas02.classList.add("canvasfill");
    col02.appendChild(canvas02);

    row02.appendChild(col01);
    row02.appendChild(col02);

    newDiv.appendChild(row02);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("main-container");
    currentDiv.appendChild(newDiv);
  }

  function sectionButton(){
    

  }

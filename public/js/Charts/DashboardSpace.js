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



    
    // Add row 04
    const row04 = document.createElement("div");
    row04.classList.add("row");
    row04.classList.add("containerbuttons");

    const containerButtons = document.createElement("div");
    containerButtons.classList.add("multi-button");
    containerButtons.setAttribute("id", "containerButtons");

    const button01 = document.createElement("button");
    button01.setAttribute("id", "button01");
    button01.textContent = 'Quantities';
    button01.style.borderRadius = "4px 0px 0px 4px";
   


    button01.onclick = function(event) {
        switchButton("button01");
        Quantities(modData);
      }

    const button02 = document.createElement("button");
    button02.setAttribute("id", "button02");
    button02.textContent = 'Design';
    button02.style.borderRadius = "0px"

    button02.onclick = function(event) {
        switchButton("button02");
        Design(modData);
      }

    const button03 = document.createElement("button");
    button03.setAttribute("id", "button03");
    button03.textContent = 'Manufacture';
    button03.style.borderRadius = "0px"

    button03.onclick = function(event) {
      switchButton("button03");
      Manufacture(modData);
    }

    containerButtons.appendChild(button01);
    containerButtons.appendChild(button02);
    containerButtons.appendChild(button03);

    row04.appendChild(containerButtons);

    newDiv.appendChild(row04);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("main-container");
    currentDiv.appendChild(newDiv);
  }

  function sectionButton(){
    

  }

AutodeskNamespace("Autodesk.Research.TtIf.Extension");

ToolBar = function (viewer, options) {
  Autodesk.Viewing.Extension.call(this, viewer, options);

  var _viewer = viewer;
  var _this = this;

  //Create Toolbar
  _this.load = function () {
    createToolbar();
    return true;
  };

  //Remove Toolbar
  _this.unload = function () {
    deleteToolbar();
    console.log("ToolBar unloaded");
    return true;
  };

  function createToolbar() {
    var toolbar = new Autodesk.Viewing.UI.ToolBar("toolbar-TtIf");
    var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup(
      "ToolBar.ControlGroup"
    );

    ctrlGroup.addClass("toolbar-vertical-group");

    // Names, icons and tooltips for our toolbar buttons
    //https://edgardofraga.com.ar/font-awesome-icons/
    var names = ["CGB2", "CGB3"];
    var icons = ["eye-open", "tasks"];
    var tips = ["Isolate", "Dashboard"];

    // Operations for when the buttons are clicked

    var clicks = [
      function () {
        if (viewer.getIsolatedNodes().length > 0) {
          viewer.clearThemingColors();
          viewer.showAll();
        } else {
          isolateSel();
        }
      },
      function () {
        showPowerBIReport();
      },
    ];

    var unclicks = [];

    // The loop to create our buttons
    var button;
    for (var i = 0; i < names.length; i++) {
      // Start by creating the button
      button = new Autodesk.Viewing.UI.Button("ToolBar." + names[i]);

      // Assign an icons
      if (icons[i] && icons[i] !== "") {
        button.icon.classList.add("myicon");
        button.icon.classList.add("glyphicon");
        button.icon.classList.add("glyphicon-" + icons[i]);
      }

      // Set the tooltips
      button.setToolTip(tips[i]);

      // Only create a toggler for our button if it has an unclick operation
      if (unclicks[i]) {
        button.onClick = createToggler(button, clicks[i], unclicks[i]);
      } else {
        button.onClick = clicks[i];
      }
      ctrlGroup.addControl(button);
    }

    //Add control group to toolbar
    toolbar.addControl(ctrlGroup);

    var toolbarDivHtml = '<div id="divToolbar"> </div>';

    //Append toolbarDiv to the viewer
    $(_viewer.container).append(toolbarDivHtml);

    // We want our toolbar to be centered vertically on the page
    toolbar.centerToolBar = function () {
      $("#divToolbar").css({
        top: "calc(50% + " + toolbar.getDimensions().height / 2 + "px)",
        left: "calc(100% - 80px)",
      });
    };

    toolbar.addEventListener(
      Autodesk.Viewing.UI.ToolBar.Event.SIZE_CHANGED,
      toolbar.centerToolBar
    );

    // Start by placing our toolbar off-screen (top: 0%)
    $("#divToolbar").css({
      top: "0%",
      left: "0%",
      "z-index": "100",
      position: "absolute",
    });

    $("#divToolbar")[0].appendChild(toolbar.container);

    // After a delay we'll center it on screen
    setTimeout(function () {
      toolbar.centerToolBar();
    }, 100);
  }

  function deleteToolbar() {
    $("#divToolbar").remove();
  }

  //Set state for buttons
  function createToggler(button, click, unclick) {
    return function () {
      var state = button.getState();
      if (state === Autodesk.Viewing.UI.Button.State.INACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
        click();
      } else if (state === Autodesk.Viewing.UI.Button.State.ACTIVE) {
        button.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
        unclick();
      }
    };
  }

  var css = [
    ".myicon {",
    "font-size: 20px;",
    "padding-top: 1px !important;",
    "}",

    ".toolbar-vertical-group > .adsk-button > .adsk-control-tooltip {",
    "left: -180%;",
    "bottom: 25%;",
    "}",
  ].join("\n");

  $('<style type="text/css">' + css + "</style>").appendTo("head");
};

ToolBar.prototype = Object.create(Autodesk.Viewing.Extension.prototype);

ToolBar.prototype.constructor = ToolBar;

Autodesk.Viewing.theExtensionManager.registerExtension("ToolBar", ToolBar);

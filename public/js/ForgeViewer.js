var viewer;
var modData = {};

launchViewer(privateVariables.urn);

function launchViewer(urn) {
  var options = {
    env: "AutodeskProduction",
    getAccessToken: getToken,
  };

  function getToken(_callback) {
    var settings = {
      url: privateVariables.tokenURL,
      method: "GET",
      timeout: 0,
      headers: {
        "x-api-key": privateVariables.apiKey,
      },
    };

    $.ajax(settings).done(function (response) {
      _callback(response.access_token, response.expires_in);
    });
  }

  Autodesk.Viewing.Initializer(options, async () => {
    var config3d = {
      extensions: ["ToolBar"],
    };

    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      config3d
    );
    viewer.start();

    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });

  function onDocumentLoadSuccess(doc) {
    var viewables = doc.getRoot().getDefaultGeometry(true);
    viewer.loadDocumentNode(doc, viewables, { skipHiddenFragments: false, ).then((i) => {});

    viewer.setDisplayEdges(false);
    viewer.setProgressiveRendering(true);
    viewer.setGroundReflection(false);
    viewer.setGroundShadow(false);
    viewer.setQualityLevel(false, false);
    viewer.setGroundReflectionAlpha(0);
    viewer.hideLines(true);
    viewer.setOptimizeNavigation(true);

    this.viewer.addEventListener(
      Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
      onGeometryLoaded
    );
  }

  function onGeometryLoaded() {
    console.log("Geometry Loaded");

    viewer.search(
      "",
      function (dbIds) {
        viewer.model.getBulkProperties(
          dbIds,
          ["Category"],
          function (elements) {
            getListCategories(elements, function (cateElem) {
              arraySimplify(cateElem, function (object) {
                modData.quantities = object.quantities;
                modData.Elements = object.Elements;
                modData["Load"] = "Done";
                showPowerBIReport();
              });
            });
          }
        );
      },
      null,
      ["Comments"]
    );

    DashBoardColors = generateColorsRandom();
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
  }

  function generateColorsRandom() {
    var background = [];

    background.push("rgba(" + 84 + ", " + 71 + ", " + 140 + ", 0.8)");
    background.push("rgba(" + 44 + ", " + 105 + ", " + 154 + ", 0.8)");
    background.push("rgba(" + 4 + ", " + 139 + ", " + 168 + ", 0.8)");
    background.push("rgba(" + 13 + ", " + 179 + ", " + 158 + ", 0.8)");
    background.push("rgba(" + 22 + ", " + 219 + ", " + 147 + ", 0.8)");
    background.push("rgba(" + 131 + ", " + 227 + ", " + 119 + ", 0.8)");
    background.push("rgba(" + 185 + ", " + 231 + ", " + 105 + ", 0.8)");
    background.push("rgba(" + 239 + ", " + 234 + ", " + 90 + ", 0.8)");
    background.push("rgba(" + 241 + ", " + 196 + ", " + 83 + ", 0.8)");
    background.push("rgba(" + 255 + ", " + 102 + ", " + 102 + ", 0.8)");
    background.push("rgba(" + 219 + ", " + 0 + ", " + 182 + ", 0.8)");
    background.push("rgba(" + 242 + ", " + 158 + ", " + 76 + ", 0.8)");
    background.push("rgba(" + 188 + ", " + 0 + ", " + 221 + ", 0.8)");
    background.push("rgba(" + 219 + ", " + 0 + ", " + 182 + ", 0.8)");
    background.push("rgba(" + 242 + ", " + 0 + ", " + 1 + ", 0.8)");
    background.push("rgba(" + 242 + ", " + 111 + ", " + 1 + ", 0.8)");
    background.push("rgba(" + 242 + ", " + 180 + ", " + 15 + ", 0.8)");
    background.push("rgba(" + 242 + ", " + 195 + ", " + 100 + ", 0.8)");
    background.push("rgba(" + 65 + ", " + 95 + ", " + 134 + ", 0.8)");
    background.push("rgba(" + 25 + ", " + 145 + ", " + 158 + ", 0.8)");
    background.push("rgba(" + 0 + ", " + 98 + ", " + 255 + ", 0.8)");
    background.push("rgba(" + 255 + ", " + 242 + ", " + 0 + ", 0.8)");
    background.push("rgba(" + 255 + ", " + 0 + ", " + 123 + ", 0.8)");
    background.push("rgba(" + 255 + ", " + 0 + ", " + 43 + ", 0.8)");
    background.push("rgba(" + 0 + ", " + 187 + ", " + 255 + ", 0.8)");
    background.push("rgba(" + 0 + ", " + 187 + ", " + 255 + ", 0.8)");
    background.push("rgba(" + 41 + ", " + 227 + ", " + 134 + ", 0.8)");
    background.push("rgba(" + 109 + ", " + 189 + ", " + 40 + ", 0.8)");
    background.push("rgba(" + 39 + ", " + 159 + ", " + 245 + ", 0.8)");

    return { background: background };
  }
}

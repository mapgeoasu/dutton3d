require(["esri/WebScene", "esri/views/SceneView", "esri/widgets/Home"], function (
    WebScene,
    SceneView,
    Home
  ) {
    // Important variables for connecting the sceneview to the AGOL API  
    /************************************************************
     * A WebScene must reference a PortalItem ID
     * To load a WebScene from an on-premise portal, set the portal
     * url with esriConfig.portalUrl.
     ************************************************************/ 

  // Load webscene from portal item
    const scene = new WebScene({
        portalItem: {
            id: "dea74d75219c45b19ffc57890b815746" // this is the id of the sceneview the app is connected to dutton's atlas: dea74d75219c45b19ffc57890b815746
        }
    });

    const view = new SceneView({
      container: "viewDiv",
      map: scene,
      qualityProfile: "high",
      highlightOptions: {
        color: [162, 54, 23], 
        fillOpacity: 0,
      },
      popup: {
        //Docks the popup and removes the default that connects popup to item
        dockEnabled: true,
        // Disables the dock button from the popup
        dockOptions: {
           // Positions the popup top-right until screen sizes changes. Can set to a specific location. Example: bottom-right
          // position: "auto",
          //Allows the docking button. Set to false if you don't want the user to dock
          buttonEnabled: true,
          // Ignore the default sizes that trigger responsive docking
          breakpoint: false,
          // collapseEnabled: true,
        },
      }
    });
    
    // Removes the Zoom To button at the top of the popup. Set to true to add.
    view.popup.viewModel.includeDefaultActions = false;


    // reduce popup size
    // $(function() {            
    //   $("body:not(.esriIsPhoneSize) #viewDiv .esri-popup.esri-popup--is-docked .esri-popup__main-container").css('padding-bottom', '5000px');                
    // });

    // Adds padding to the widgets
    view.ui.padding = 10;
    
  // Show modal on page load
  // Instead of using cookies so it doesn't show up every time, the infoModal uses session storage. When the browser is closed, the session storage key should be deleted. 
  //infoModal will load again when the user opens the browser 
    $(document).ready(function () {
    // Check if user saw the modal
    var key = 'openedModal',
        hadModal = sessionStorage.getItem(key);
    // Show the modal only if new user
    if (!hadModal) {
        $('#infoModal').modal('show');
    }
    // If modal is displayed, store that in localStorage
    $('#infoModal').on('shown.bs.modal', function () {
        sessionStorage.setItem(key, true);
    })
    });

  // Function to rotate the map
  // function rotate() {         
  //   view.goTo({
  //       heading: view.camera.heading + 0.2,
  //       center: view.center
  //   }, {animate: false});
  //   // begin the rotation
  //   var req = requestAnimationFrame(rotate);            
  //   // when the user clicks on the pause button
  //   pauseBtn.addEventListener('click', function(event){  
  //     // cancel the rotation
  //     cancelAnimationFrame(req);
  //     $(".esri-icon-play").show(); 
  //     $(".esri-icon-pause").hide();     
  //   })
  // };   

  // Custom Buttons
  // Home button
  const homeBtn = new Home({
    view: view,
    id: "home",
  });

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");        

  // Rotate play button
  // var rotateBtn = document.createElement('div');        
  // rotateBtn.className = "esri-icon-play esri-widget--button esri-widget esri-interactive";
  // rotateBtn.title = "Auto-rotate map";
  // rotateBtn.addEventListener('click', function(event){
  //   rotate();
  //   $(".esri-icon-play").hide();
  //   $(".esri-icon-pause").show();         
  // })

  // Add the button to the UI
  // view.ui.add(rotateBtn, "top-left");

  // Pause button
  // var pauseBtn = document.createElement('div');
  // pauseBtn.className = "esri-icon-pause esri-widget--button esri-widget esri-interactive";
  // pauseBtn.title = "Pause rotation";

  // Add the button to the UI
  // view.ui.add(pauseBtn, "top-left"); 

  // $(".esri-icon-pause").hide();

  // Add element for the 360 photo viewer button using Esri widgets
  var viewerBtn = document.createElement('div');
  viewerBtn.className = "esri-icon-media esri-widget--button esri-widget esri-interactive";
  viewerBtn.title = "View 360 Hub photo";
  viewerBtn.addEventListener('click', function(event){
    // Toggle panorama
    $('#viewerModal').modal('show');
    document.getElementById("pano").src="https://cdn.pannellum.org/2.5/pannellum.htm#config=https://mapgeoasu.github.io/dutton3d/tour.json&autoLoad=true";
  })

  // Add the button to the UI
  view.ui.add(viewerBtn, "top-left"); 

  // Add element for the information button using Esri widgets
  var infoBtn = document.createElement('div');
  infoBtn.className = "esri-icon-description esri-widget--button esri-widget esri-interactive";
  infoBtn.title = "Information";
  infoBtn.addEventListener('click', function(event){
    // Toggle infowindow modal
    $('#infoModal').modal('show');
  })

  // Add the button to the UI
  view.ui.add(infoBtn, "top-left"); 

  // Removes the default compass widget from the view's container
  view.ui.remove("compass");

}); // end of map JS

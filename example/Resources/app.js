var win = Ti.UI.createWindow({
	navBarHidden: true,
	fullscreen: true,
	backgroundColor:'white',
	layout: 'absolute'
});
win.orientationModes = [Ti.UI.PORTRAIT];
win.open();
var resolution = null;
var availableResolutions = null;
var cameraCreated = false;

var createCameraBtn = Ti.UI.createButton({
	title: "Capture photo",
	bottom: "10dp",
	height: "80dp",
	width: "140dp",
	//left: "10dp",
	zIndex: 3
});

if( Ti.Media.isCameraSupported ) {
	var androidcamera = require("com.ti.camera.pro");
	var params;

	function createCameraView(win){
		Ti.API.log("Resolution is : "+resolution);
		if(resolution!=null)
		{
			var camera = androidcamera.createCameraView({
				save_location: "pharmacy",
				resolution:resolution.toString(),
				width: Ti.UI.FILL
			});
		}
		else
		{
			var camera = androidcamera.createCameraView({
				save_location: "pharmacy",
				width: Ti.UI.FILL
			});
		}

		cameraCreated = true;
		createCameraBtn.hide();


		
		setTimeout(function(){
			if(resolution==null)
			{
				Ti.API.log("Resolutions");
				availableResolutions = JSON.parse(camera.getResolutions());
				//resolution = 0;
				
				options = [];
				availableResolutions.forEach(function(res){
					options.push(res.width+'X'+res.height);
				});

				var opts = {
					cancel : 6,
					options : options,
					title : 'Select resolution'
				};
				var dialog = Ti.UI.createOptionDialog(opts);
				dialog.show();
				dialog.addEventListener('click', function(e) {
					resolution = e.index;
					Ti.API.log("Resolution set to "+resolution);
					win.remove(camera);
					camera = null;
					cameraCreated = false;
					//createCameraBtn.show();
					createCameraView(win);
				});

			}
		},500);
		
	    width = Ti.Platform.displayCaps.platformWidth,
	    height = Ti.Platform.displayCaps.platformHeight;


	    Ti.API.log(JSON.stringify(camera));
	    Ti.API.log("Camera width"+camera.width);

		var cameraOverlay = Ti.UI.createView({
			height: height,
			width: '1000dp',
			layout: 'absolute',
			backgroundColor: 'blue',
			layout: 'absolute'
		});

		var btSnap = Ti.UI.createButton({
			title: "Capture",
			bottom: "10dp",
			height: "80dp",
			width: Ti.UI.FILL,
			left: 0,
			//zIndex: 3
		});

		var changeResolutionBtn = Ti.UI.createButton({
			title: "Change resolution",
			bottom: "10dp",
			height: "80dp",
			width: Ti.UI.FILL,
			right: 0,
			//zIndex: 3
		});

		btSnap.addEventListener("click", function(){
			Ti.API.log("Click triggered!!");
			camera.snapPicture();
		});

		camera.addEventListener("picture_taken", function(evt){
			alert("Image saved to "+evt.path);
			win.remove(camera);
			camera = null;
			cameraCreated = false;
			createCameraBtn.show();
		});

		win.addEventListener("close", function(){
			camera = null;
		});

		changeResolutionBtn.addEventListener('click',function(){
			resolution = null;
			win.remove(camera);
			camera = null;
			cameraCreated = false;
			createCameraView(win);
		});

		cameraOverlay.add(btSnap);
		cameraOverlay.add(changeResolutionBtn);
		camera.add(cameraOverlay);
		win.add(camera);
	};


	win.add(createCameraBtn);
	createCameraBtn.addEventListener("click",function(){
		createCameraView(win);
	});


} else {
	alert("No camera found!");
}
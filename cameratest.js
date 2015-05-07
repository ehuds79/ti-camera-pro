var win = Ti.UI.createWindow({
	navBarHidden: true,
	fullscreen: true,
	backgroundColor:'white'
});
win.orientationModes = [Ti.UI.PORTRAIT];
win.open();

if( Ti.Media.isCameraSupported ) {
	var androidcamera = require("com.ti.camera.pro");
	var camera = androidcamera.createCameraView({save_location: "pharmacy"});
	
	var btSnap = Ti.UI.createButton({
		title: "Capture",
		bottom: "10dp",
		height: "80dp",
		width: "80dp",
		zIndex: 2
	});

	btSnap.addEventListener("click", function(){
		camera.snapPicture();
	});

	camera.addEventListener("picture_taken", function(evt){
		alert("Image saved to "+evt.path);
	});

	win.addEventListener("close", function(){
		camera = null;
	});

	win.add(camera);
	win.add(btSnap);
} else {
	alert("No camera found!");
}
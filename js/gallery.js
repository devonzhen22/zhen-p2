// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string
	
	if(mCurrentIndex>=mImages.length){
		mCurrentIndex=0;
	}
	for(mCurrentIndex;mCurrentIndex<mImages.length;mCurrentIndex++){
		$('#slideShow').children('.photoHolder').children('img').attr("src",mImages[mCurrentIndex]);
		console.log(mCurrentIndex)
		mCurrentIndex++;
		
		console.log("Conformed URL: "+'"'+mImages[mCurrentIndex]+'"');
		break;
	}
	
	console.log('swap photo');
}


// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

//URL for the JSON to load by default
//Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "images-short.json";

var mRequest = new XMLHttpRequest();
mRequest.onreadystatechange = function() {
	// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try 
		{
			// Let’s try and see if we can parse JSON (see next slide)
			mJson = JSON.parse(mRequest.responseText);
			// LOOP THROUGH the mJSON array here and fill up the
			// mImages array with GalleryImage objects
			// Let’s print out the JSON; It will likely show as “obj”
			
			//CHANGES: Loop for mImages
			mImages=[];
			for(var i in mJson.images){
				/*console.log("Path: "+mJson.images[i].imgPath+" \n"
						   +"Loc: "+mJson.images[i].imgLocation+" \n"
						   +"Desc: "+mJson.images[i].description+" \n"
						   +"Dat: "+mJson.images[i].date+" \n"
							); */
				
				mImages.push(mJson.images[i].imgPath);
				//mImages.push(mJson.images[i].imgLocation);
				//mImages.push(mJson.images[i].description);
				//mImages.push(mJson.images[i].date);
			}
			for(var z in mImages){
				console.log("INFO: "+mImages[z]+"\n");
			}
			console.log("SIZE:"+mImages.length);
			
			//console.log("Specific URL:"+mJson.images[0]);
			//console.log(mJson);
		}catch(err) {console.log(err.message)}
	}
};
mRequest.open("GET",mUrl, true);
mRequest.send();


// Array holding GalleryImage objects (see below).
var mImages = [];

//Holds the retrieved JSON information
var mJson;


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	//CHANGES:Toggles details box below
	$('.moreIndicator').click(function(){
		$(this).toggleClass('rotate')
		$('.details').slideToggle()
		});
});

window.addEventListener('load', function() {
	console.log('window loaded');
}, false);

//CHANGES: Adding the variables to the GalleryImage function
function GalleryImage(location, description, date, img) {
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
  this.location=location;
	//2. description of photo
  this.description=description;
	//3. the date when the photo was taken
  this.date=date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  this.img=img;
}














/*
mRequest.onreadystatechange = function() {
	// Do something interesting if file is opened successfully
	if (!(mRequest.readyState == 4 && mRequest.status == 200))
	{
			console.log("Hello World!");
			// Let’s try and see if we can parse JSON
			mJson= JSON.parse(mRequest.responseText);
			// Let’s print out the JSON; It will likely show as "obj"
			console.log("JSON:"+mJson.images[0]);
			show(mJson);
	}
};
mRequest.open("GET", mUrl, true);
mRequest.send();

function show(data){
	var output;
	var  i;
	console.log("Hello World 2");
	console.log( "Specific URL:"+mJson.images[1].imgPath);
    // Loop through the artists, and add them as list items
    for (var i in data.images) {
        output += " imgPath: " + data.images[i].imgPath 
        		  + " (imgLocation: " + data.images[i].imgLocation + ")"
        		  + " (imgLocation: " + data.images[i].description + ")"
        		  + " (imgLocation: " + data.images[i].date + ")";     
    }
    console.log(output);
    document.getElementById("test").innerHTML = output;
}
*/

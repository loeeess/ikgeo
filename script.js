window.onload = function()
{
	var script = document.createElement('script');
	
	script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places&callback=initMap';
	
	document.getElementsByTagName('head')[0].appendChild(script);
}



function initMap(){

		


  
	var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 7,
	center: new google.maps.LatLng(52.1326, 5.2913),
	mapTypeId: google.maps.MapTypeId.SATELLITE
	});

	var infowindow = new google.maps.InfoWindow();

	//zoekbalk
	var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

	map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

	var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
  	var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
      return;
    	}
           
    // Create a marker for each place.
    markers.push(new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location
      }));

    if (place.geometry.viewport) {
    // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    	} else {
      bounds.extend(place.geometry.location);
			}
		});
	map.fitBounds(bounds);
	});

	var windmolenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/windmolens.kmz",
		map: map
	});
	
		document.getElementById("windturbines").addEventListener('click', function(){
		if(windmolenLayer.getMap()==null){
			document.getElementById("windturbines").style.backgroundColor = "grey"
			windmolenLayer.setMap(map);
			console.info('set map', map);
		}else if(windmolenLayer.getMap()!=null){
			document.getElementById("windturbines").style.backgroundColor = "black"
			windmolenLayer.setMap(null);
			console.info('remove map');
		}
	});	
    		
}

//Open sidenav menu
function openNav() {
	document.getElementById("sidenavi").style.width = "250px"
}

//Sluit sidenav menu
function closeNav() {
	document.getElementById("sidenavi").style.width = "0";
}
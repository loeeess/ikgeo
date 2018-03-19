window.onload = function()
{
	var script = document.createElement('script');
	
	script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places&callback=initMap';
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById("sidenavi").style.width = "250px"
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("sidenavi").style.width = "0";
}

function initMap(){

	//Oefenen locaties met infowindow
	var locations = [
		['Leiden', 52.1674, 4.4713, 4],
		['The Hague', 52.0705, 4.3007, 5],
		['Groningen', 53.2194, 6.5665, 3],
		['Amsterdam', 52.3702, 4.8952, 2],
		['Maastricht', 50.8514, 5.6910, 1]
	  ];
  
	var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 7,
	center: new google.maps.LatLng(52.1326, 5.2913),
	mapTypeId: google.maps.MapTypeId.SATELLITE
	});

	var infowindow = new google.maps.InfoWindow();
		
	//Laag die de windmolens in Nederland toont
	var windmolenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/windmolens.kmz", 
		map: map
	});
		
	//Oefenen met markers in een loop
	var marker, i;

	for (i = 0; i < locations.length; i++) { 
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});
		
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			infowindow.setContent(locations[i][0]);
			infowindow.open(map, marker);
			}
		})(marker, i));
	}

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
    		
}
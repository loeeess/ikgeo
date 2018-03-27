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

	//Laag die co2 van 2015 toont
	var co2 = new google.maps.Data();
	co2.loadGeoJson("https://loeeess.github.io/ikgeo/data/CO2-uitstoot.json");
	

	co2.setStyle(function(feature) {
		var color = getColor(feature.getProperty('uitstootfifteen'));
		
		return /** @type {google.maps.Data.StyleOptions} */({
			fillColor: color,
			strokeWeight: 2,
			fillOpacity: 0.75
		});
  });

	co2.setMap(map);
	//Laag die windmolens toont
	var windmolenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/windmolens.kmz",
		map: map
	});
	windmolenLayer.setMap(null);
	
		document.getElementById("windturbines").addEventListener('click', function(){
		if(windmolenLayer.getMap()==null){
			document.getElementById("windturbines").style.backgroundColor = "grey";
			windmolenLayer.setMap(map);
			console.info('set map', map);
		}else if(windmolenLayer.getMap()!=null){
			document.getElementById("windturbines").style.backgroundColor = "black";
			windmolenLayer.setMap(null);
			console.info('remove map');
		}});	

    		
}

function getColor(uitstoot) {
	var colors = [
		'#65ff00',
		'#ddff00',
		'##ffdd00',
		'#ff8300',
		'#ff0000'
	];

	return uitstoot >= 30000000 ? colors[4] :
		uitstoot > 25000000 ? colors[4] :
		uitstoot > 20000000 ? colors[3] :
		uitstoot > 15000000 ? colors[2] :
		uitstoot > 10000000 ? colors[1] :
		colors[0];
}

//Open sidenav menu
function openNav() {
	document.getElementById("sidenavi").style.width = "250px"
}

//Sluit sidenav menu
function closeNav() {
	document.getElementById("sidenavi").style.width = "0";
}

function openDropThirteen(){
dropdownMenu()
	var color = getColor(feature.getProperty('uitstootthirteen'));
		
		return /** @type {google.maps.Data.StyleOptions} */({
			fillColor: color,
			strokeWeight: 2,
			fillOpacity: 0.75
		});
}

//Open dropdown menu
function dropdownMenu() {
	document.getElementById("dropdownid").classList.toggle("show");
	document.getElementById("year").style.backgroundColor = "grey";
}

//Sluit dropdown menu
window.onclick = function(event) {
if (!event.target.matches('.dropbutton')) {
		
	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		document.getElementById("year").style.backgroundColor = "black";
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			
		}
	}
}
}
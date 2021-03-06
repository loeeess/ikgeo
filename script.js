//IKGEO
// Loes Crama
// s1101632
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

	//zoekbalk
	var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

	map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  	});

	var markers = [];
  //Suggesties met plaatsen invoeren
  searchBox.addListener('places_changed', function() {
  	var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

    //Haalt oude markers weg
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    //Voor elke plaats, nieuwe icon, naam en locatie
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
      return;
    	}
           
    //Nieuwe marker voor nieuwe plaats
    markers.push(new google.maps.Marker({
      map: map,
      title: place.name,
      position: place.geometry.location
      }));

    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    	} else {
      bounds.extend(place.geometry.location);
			}
		});
	map.fitBounds(bounds);
	});

	//Laag die co2 toont
	var co2 = new google.maps.Data();
	co2.loadGeoJson("https://loeeess.github.io/ikgeo/data/CO2-uitstoot.json");

	//Toggle 2013
	document.getElementById("co2thirteen").addEventListener('click', function(){
		if(co2.getMap()==null){
			document.getElementById("co2thirteen").style.backgroundColor = "#233d8b";
			document.getElementById("legendaco2").style.zIndex = "1";
			co2.setMap(map);
			co2.addListener('mouseover', function(e) {
				infoWindow.setContent(
					e.feature.getProperty('name') + '<br> Uitstoot in tonnen: ' +
					e.feature.getProperty('uitstootthirteen') + '</div>');
					
					var anchor = new google.maps.MVCObject();
					anchor.set("position", e.latLng);
					infoWindow.open(map, anchor);
			});

			co2.addListener('mouseout', function() {
				infoWindow.close();
			});
			co2.setStyle(function(feature) {
				var color = getColor(feature.getProperty('uitstootthirteen'));
				return /** @type {google.maps.Data.StyleOptions} */({
					fillColor: color,
					strokeWeight: 1,
					fillOpacity: 0.75
				});
			});
			console.info('set map', map);
		}else if(co2.getMap()!=null){
			document.getElementById("co2thirteen").style.backgroundColor = "grey";
			document.getElementById("legendaco2").style.zIndex = "0";
			co2.setMap(null);
			console.info('remove map');
		}});

	var infoWindow = new google.maps.InfoWindow({
			content: ""
	});

	//Toggle 2014
	document.getElementById("co2fourteen").addEventListener('click', function(){
		if(co2.getMap()==null){
			document.getElementById("co2fourteen").style.backgroundColor = "#233d8b";
			document.getElementById("legendaco2").style.zIndex = "1";
			co2.setMap(map);

			co2.addListener('mouseover', function(e) {
				infoWindow.setContent(
				 	e.feature.getProperty('name') + '<br> Uitstoot in tonnen: ' +
				  	e.feature.getProperty('uitstootfourteen') + '</div>');
					
					var anchor = new google.maps.MVCObject();
					anchor.set("position", e.latLng);
					infoWindow.open(map, anchor);
			});

			co2.addListener('mouseout', function() {
				infoWindow.close();
			});
			
			co2.setStyle(function(feature) {
				var color = getColor(feature.getProperty('uitstootfourteen'));
				return /** @type {google.maps.Data.StyleOptions} */({
					fillColor: color,
					strokeWeight: 1,
					fillOpacity: 0.75
				});
			});
			console.info('set map', map);
		}else if(co2.getMap()!=null){
			document.getElementById("co2fourteen").style.backgroundColor = "grey";
			document.getElementById("legendaco2").style.zIndex = "0";
			co2.setMap(null);
			console.info('remove map');
		}});

	//Toggle 2015
	document.getElementById("co2fifteen").addEventListener('click', function(){
		if(co2.getMap()==null){
			document.getElementById("co2fifteen").style.backgroundColor = "#233d8b";
			document.getElementById("legendaco2").style.zIndex = "1";
			co2.setMap(map);

			co2.addListener('mouseover', function(e) {
				infoWindow.setContent(
					e.feature.getProperty('name') + '<br> Uitstoot in tonnen: ' +
					e.feature.getProperty('uitstootfifteen') + '</div>');
						
					var anchor = new google.maps.MVCObject();
					anchor.set("position", e.latLng);
					infoWindow.open(map, anchor);
			});

			co2.addListener('mouseout', function() {
				infoWindow.close();
			});
			co2.setStyle(function(feature) {
				var color = getColor(feature.getProperty('uitstootfifteen'));
				return /** @type {google.maps.Data.StyleOptions} */({
					fillColor: color,
					strokeWeight: 1,
					fillOpacity: 0.75
				});
			});
			console.info('set map', map);
		}else if(co2.getMap()!=null){
			document.getElementById("co2fifteen").style.backgroundColor = "grey";
			document.getElementById("legendaco2").style.zIndex = "0";
			co2.setMap(null);
			console.info('remove map');
		}});

	//Laag die de windproductie 2013 toont
	var productionthirteenLayer = new google.maps.KmlLayer({
	url: "https://loeeess.github.io/ikgeo/data/2013.kmz",
	});
		document.getElementById("production13").addEventListener('click', function(){
		if(productionthirteenLayer.getMap()==null){
			document.getElementById("production13").style.backgroundColor = "#233d8b";
			document.getElementById("legendaproduction").style.zIndex = "1";
			productionthirteenLayer.setMap(map);
			console.info('set map', map);
		}else if(productionthirteenLayer.getMap()!=null){
			document.getElementById("production13").style.backgroundColor = "grey";
			document.getElementById("legendaproduction").style.zIndex = "0";
			productionthirteenLayer.setMap(null);
			console.info('remove map');
		}});

	//Laag die de windproductie 2014 toont
	var productionfourteenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/productie2014.kmz",
		});
			document.getElementById("production14").addEventListener('click', function(){
			if(productionfourteenLayer.getMap()==null){
				document.getElementById("production14").style.backgroundColor = "#233d8b";
				document.getElementById("legendaproduction").style.zIndex = "1";
				productionfourteenLayer.setMap(map);
				console.info('set map', map);
			}else if(productionfourteenLayer.getMap()!=null){
				document.getElementById("production14").style.backgroundColor = "grey";
				document.getElementById("legendaproduction").style.zIndex = "0";
				productionfourteenLayer.setMap(null);
				console.info('remove map');
			}});
		
	//Laag die de windproductie 2015 toont
	var productionfifteenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/2015.kmz",
		});
			document.getElementById("production15").addEventListener('click', function(){
			if(productionfifteenLayer.getMap()==null){
				document.getElementById("production15").style.backgroundColor = "#233d8b";
				document.getElementById("legendaproduction").style.zIndex = "1";
				productionfifteenLayer.setMap(map);
				console.info('set map', map);
			}else if(productionfifteenLayer.getMap()!=null){
				document.getElementById("production15").style.backgroundColor = "grey";
				document.getElementById("legendaproduction").style.zIndex = "0";
				productionfifteenLayer.setMap(null);
				console.info('remove map');
			}});

	
	//Laag die windmolens toont
	var windmolenLayer = new google.maps.KmlLayer({
		url: "https://loeeess.github.io/ikgeo/data/windmolens.kmz",
		map: map
	});
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

//Tonen kleuren in json van provincies
function getColor(uitstoot) {
	var colors = [
		'#ffffff', //Wit
		'#68ff51', //Groen
		'#fff651', //Geel
		'#ffbc51', //Oranjegeel
		'#ff7951', //Oranje
		'#ff5151' //Rood
	];

	return uitstoot >= 25000000 ? colors[5] :
		uitstoot > 20000000 ? colors[4] :
		uitstoot > 15000000 ? colors[3] :
		uitstoot > 10000000 ? colors[2] :
		uitstoot > 2000000 ? colors[1] :
		uitstoot = 0 ? colors[0] :
		colors[0];
}

//Open infoscherm
function openInfo() {
	document.getElementById("info").style.zIndex = "1";
	document.getElementById("info").style.width = '100%';
	document.getElementById("info").style.height = '91%';
	document.getElementById("sidenavi").style.width = "0";
	document.getElementById("info").style.display = "inline";
}

//Sluit infoscherm
function closeInfo() {
	document.getElementById("info").style.zIndex = "0";
}

//Open sidenav menu
function openNav() {
	document.getElementById("sidenavi").style.width = "250px"
}

//Sluit sidenav menu
function closeNav() {
	document.getElementById("sidenavi").style.width = "0";
}

//Open dropdown menu voor 2013
function dropdownMenu13() {
	document.getElementById("dropdownid13").classList.toggle("show");
	document.getElementById("2013").style.backgroundColor = "grey";
	document.getElementById("production13").style.backgroundColor = "grey";
}

//Open dropdown menu voor 2014
function dropdownMenu14() {
	document.getElementById("dropdownid14").classList.toggle("show");
	document.getElementById("2014").style.backgroundColor = "grey";
	document.getElementById("production14").style.backgroundColor = "grey";
}

//Open dropdown menu voor 2015
function dropdownMenu15() {
	document.getElementById("dropdownid15").classList.toggle("show");
	document.getElementById("2015").style.backgroundColor = "grey";
	document.getElementById("production15").style.backgroundColor = "grey";
}

//Sluit dropdown menu
window.onclick = function(event) {
if (!event.target.matches('.dropbutton')) {
	document.getElementById("2013").style.backgroundColor = "black";
	document.getElementById("2014").style.backgroundColor = "black";
  	document.getElementById("2015").style.backgroundColor = "black";
	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
			}
		}
	}
}

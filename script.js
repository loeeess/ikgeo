window.onload = function()
{
	var script = document.createElement('script');
	
	script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap';
	
	document.getElementsByTagName('head')[0].appendChild(script);
}

function initMap(){
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
  
	  var marker, i;
	  
	  var image = {
			url: '../ikgeo/res/wm.png',

		};
		
		var windmolenLayer = new google.maps.KmlLayer({
			url: "https://loeeess.github.io/ikgeo/data/windmolens.kml", 
				map: map
				
			});
		
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
		
		
}
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  jQuery(".js-latitude").text(crd.latitude);
  jQuery(".js-longitude").text(crd.longitude);
  jQuery(".js-accuracy").text(crd.accuracy+" m");
  
	jQuery.ajax({
		url: 'https://api.forecast.io/forecast/9f6923aa30e557f8db747d39ae4fa19d/'+crd.latitude+','+crd.longitude,
		dataType: 'jsonp',
		data: {
			units: 'si'
		},
		success: function(data){
			console.log(data);		
			jQuery(".js-temp").text(data.currently.apparentTemperature+" °C");	
			jQuery(".js-windspeed").text(data.currently.windSpeed+" m/s");
			jQuery('.js-wheater-icon').addClass(data.currently.icon);	
		
		}
	});
	
	jQuery.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json',
		data:{
			latlng: crd.latitude+','+crd.longitude,
			sensor: true
		},
		success: function(data){
			console.log(data);	
			var firstAddress = data.results[0];
			jQuery(".js-address").text(firstAddress.formatted_address);	
		}
	});
	
	
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
jQuery(document).ready(function() {
	navigator.geolocation.getCurrentPosition(success, error, options);  
});
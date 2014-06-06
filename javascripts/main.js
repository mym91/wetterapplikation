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
  
  
  getWeather (crd.longitude, crd.latitude);
	
	
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

function getSpecificLocation (street, number, zip, place, country) {
	
	jQuery.ajax({
		url: 'http://maps.googleapis.com/maps/api/geocode/json',
		data:{
			address: street+' '+number+' '+zip+' '+place+' '+country,
			sensor: false
		},
		success: function(data){
			console.log(data);	
			
			var firstAddress = data.results[0];
			jQuery(".js-address").text(firstAddress.formatted_address);	
			getWeather(firstAddress.geometry.location.lng, firstAddress.geometry.location.lat);
			
		}
	});
	
	
}

function getWeather (long, lat){
	jQuery.ajax({
		url: 'https://api.forecast.io/forecast/9f6923aa30e557f8db747d39ae4fa19d/'+lat+','+long,
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

}
jQuery(document).ready(function() {
	jQuery("#submit-specific-address").on('click', 'a', function(){
		event.preventDefault();
		getSpecificLocation (jQuery('#street').val(), jQuery('#number').val(), jQuery('#zip').val(), jQuery('#place').val(), jQuery('#country').val());
		
	});
	navigator.geolocation.getCurrentPosition(success, error, options);  
});

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
		}
	});
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
jQuery(document).ready(function() {
	navigator.geolocation.getCurrentPosition(success, error, options);  
});
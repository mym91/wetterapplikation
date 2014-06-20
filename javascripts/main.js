function getAddress(pos) {

  if (typeof pos !== 'undefined') {
	localStorage.setItem('position', JSON.stringify(pos.coords)); 
  }
  
  var crd = JSON.parse(localStorage.getItem('position'));
  
  jQuery(".js-latitude").text(crd.latitude);
  jQuery(".js-longitude").text(crd.longitude);
  jQuery(".js-accuracy").text(crd.accuracy+" m");
  
  
  getWeather (crd.longitude, crd.latitude);


	jQuery.ajax({
		url: 'https://maps.googleapis.com/maps/api/geocode/json',
		data:{
			latlng: crd.latitude+','+crd.longitude,
			sensor: true,
			language: localStorage['language']
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
			sensor: false,
			language: localStorage['language']
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
			jQuery(".js-temp").text(data.currently.apparentTemperature+" °C");	
			jQuery(".js-windspeed").text(data.currently.windSpeed+" m/s");
			//jQuery('.js-wheater-icon').addClass(data.currently.icon);	
			var webFontLetter;
			switch (data.currently.icon) {
				case 'clear-day':
					webFontLetter = 'B';
				break;
				case 'clear-night':
					webFontLetter = 'C';
				break;
				case 'rain':
					webFontLetter = 'R';
				break;
				case 'snow':
					webFontLetter = 'X';
				break;
				case 'sleet':
					webFontLetter = 'W';
				break;
				case 'wind':
					webFontLetter = 'F';
				break;
				case 'fog':
					webFontLetter = 'M';
				break;

				case 'cloudy':
					webFontLetter = 'N';
				break;
				case 'partly-cloudy-day':
					webFontLetter = 'H';
				break;
				case 'partly-cloudy-night':
					webFontLetter = 'i';
				break;

				default:
					webFontLetter = ')';					
				break;

			}

			jQuery('.js-wheater-icon').attr('data-icon', webFontLetter);

		}
	});

}
jQuery(document).ready(function() {
	if(localStorage.getItem('language') === null){
		localStorage.setItem('language','de');
	} else {
		jQuery('select#language').find('option[value="'+localStorage.getItem('language')+'"]').attr('selected','selected');
	}
	
	if(localStorage.getItem('position') === null){
		localStorage.setItem('language',null);
	}
	
	var options = {
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	};
	
	
	jQuery("#submit-specific-address").on('click', 'a', function(){
		event.preventDefault();
		getSpecificLocation (jQuery('#street').val(), jQuery('#number').val(), jQuery('#zip').val(), jQuery('#place').val(), jQuery('#country').val());

	});
	
	jQuery(document).on('change', '#language', function(){
		localStorage['language'] = jQuery(this).val();
		var pos = JSON.parse(localStorage.getItem('position'));
		getAddress(pos);
	//	console.log(localStorage['language']);
	});
	
	navigator.geolocation.getCurrentPosition(getAddress, error, options);  
});

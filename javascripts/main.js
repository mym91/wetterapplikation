var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  jQuery(".latitude").text(crd.latitude);
  jQuery(".longitude").text(crd.longitude);
  jQuery(".accuracy").text(crd.accuracy);
  console.log(crd);
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
navigator.geolocation.getCurrentPosition(success, error, options);
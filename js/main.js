var geocoder;
var mapCentre;
var map;
var coordinates = [];

function initialize() {

  // Centre the map to Australia
  var country = "Australia";
  var myOptions = {
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map"), myOptions);
  // new google.maps.Geocoder(); => Converts location to lat /long
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': country }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
    } else {
      alert("Could not find location: " + location);
    }
  });

  // Read from data input type json
  $.getJSON("http://localhost:3000/data/cities.json", function (cities) {
    // loop all the markers
    $.each(cities, function (i, city_detail) {
      // add marker to map
      console.log(city_detail);
      lat = city_detail.Latitude;
      lng = city_detail.Longitude;
      var latLng = new google.maps.LatLng(lat, lng);
      coordinates.push(latLng);
    });
  });
  var i = 0;
  var interval = setInterval(function () {
    var marker = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: coordinates[i]
    });
    new google.maps.event.addListener(marker, 'click', function (e) { toggleBounce(marker) });
    i++;
    if (i >= coordinates.length) clearInterval(interval);
  }, 400);
}

function toggleBounce(marker) {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
      marker.setAnimation(null);
    }, 1400);
  }
}
var map;

function init() {

        //declare maps options
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 4
    };

    //define the map
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    
    console.log(document.getElementById("#map-canvas"));
    console.log(mapOptions);
    console.log("map value: " + map);
}

function VerifyAddress() {

    var geocoder = new google.maps.Geocoder();

    //get the user input address
    var addr = document.getElementById('inputAddress').value;
    console.log('addr: ' + addr);
    // Make asynchronous call to Google geocoding API
    geocoder.geocode({ 'address': addr, 'region':'ca' }, function (results, status) {
        var addr_type = results[0].types[0];	// type of address inputted that was geocoded
        if (status == google.maps.GeocoderStatus.OK)
            UpdateMap(results[0].geometry.location, addr, addr_type);           
        else
            alert("Geocode was not successful for the following reason: " + status);
    });
}

function UpdateMap( latlng, address, addr_type) {
    //Center the map at the location
    map.setCenter(latlng);

    //Set the zoom according to the address search
    var zoom = 4
    switch (addr_type) {
        case "administrative_area_level_1": zoom = 6; break;		// user specified a state
        case "locality": zoom = 10; break;		// user specified a city/town
        case "street_address": zoom = 15; break;		// user specified a street address
    }
    map.setZoom(zoom);

    //add a marker
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:address
    });


}



google.maps.event.addDomListener(window, "load", init);



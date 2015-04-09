var map;

function init() {

        //declare maps options
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 4
    };

    //define the map
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}

function VerifyAddress() {

    var geocoder = new google.maps.Geocoder();

    //get the user input address
    var addr = document.getElementById('inputAddress').value;
    
    console.log('addr: ' + addr);
    // Make asynchronous call to Google geocoding API
    geocoder.geocode({ 'address': addr, 'region':'ca' }, function (results, status) {
        var addr_type = results[0].types[0];	// type of address inputted that was geocoded

        var formatAddr = results[0].formatted_address;
        var len = results.length;
        console.log(len);

        console.log("??:" + JSON.stringify(results, null, 4));




        //for (i = 0; i <= len ; i++) {
        //    var val_s = results[0].address_components[i].short_name;
        //    var val_l = results[0].address_components[i].long_name;
        //    var val_t = results[0].address_components[i].types;

        //    console.log("short : " + val_s);
        //    console.log("long : " + val_l);
        //    console.log("type : " + val_t);

        //    switch (val_t) {
        //        case "street_number":
        //            obj_address = { "Street Number": val_s, "Street Num Lng" : val_l }
        //            break;
        //    }

           
        //}



        var obj_address = {            
            "Street Num": results[0].address_components[0].short_name,
            "street Num Long": results[0].address_components[0].long_name,
            "Route": results[0].address_components[1].short_name,
            "Route Long": results[0].address_components[1].long_name,
            "Neighborhood": results[0].address_components[2].short_name,
            "Neighborhood Long": results[0].address_components[2].long_name,
            "Sub-Locality": results[0].address_components[3].short_name,
            "Sub-Locality Long": results[0].address_components[3].long_name,
            "Locality": results[0].address_components[4].short_name,
            "Locality Long": results[0].address_components[4].long_name,
            "Adm Area": results[0].address_components[5].short_name,
            "Adm Area Long": results[0].address_components[5].long_name,
            "Province Code": results[0].address_components[6].short_name,
            "Province Name": results[0].address_components[6].long_name,
            "Country Code": results[0].address_components[7].short_name,
            "Country Name": results[0].address_components[7].long_name,
            "Postal Code": results[0].address_components[8].short_name,
            "postalCodeLong": results[0].address_components[8].long_name,
            "Location": results[0].geometry.location,
            "Latitude": results[0].geometry.location.lat(),
            "Longitude": results[0].geometry.location.lng(),            
            "Location Type": results[0].geometry.location_type,

        }



        if (status == google.maps.GeocoderStatus.OK) {
            UpdateMap(results[0].geometry.location, addr, addr_type);
            UpdateMapDetails(formatAddr, obj_address);
        }
        else
            alert("Geocode was not successful for the following reason: " + status);



        //for (i = 0; i <= len ;i++){            
        //        var val_s = results[0].address_components[i].short_name;
        //        var val_l = results[0].address_components[i].long_name;
        //        var val_t = results[0].address_components[i].types;

        //        console.log("short : " + val_s);
        //        console.log("long : " + val_l);
        //        console.log("type : " + val_t);            
        //}
        //console.log("long_name:" + results[0].address_components[0].long_name);
        //console.log("short_name:" + results[0].address_components[0].short_name);
        //console.log("types:" + results[0].address_components[0].types);        
        //console.log("long_name:" + results[0].address_components[1].long_name);
        //console.log("short_name:" + results[0].address_components[1].short_name);
        //console.log("types:" + results[0].address_components[1].types);
        //console.log("long_name:" + results[0].address_components[2].long_name);
        //console.log("short_name:" + results[0].address_components[2].short_name);
        //console.log("types:" + results[0].address_components[2].types);
        //console.log("long_name:" + results[0].address_components[3].long_name);
        //console.log("short_name:" + results[0].address_components[3].short_name);
        //console.log("types:" + results[0].address_components[3].types);
        //console.log("long_name:" + results[0].address_components[4].long_name);
        //console.log("short_name:" + results[0].address_components[4].short_name);
        //console.log("types:" + results[0].address_components[4].types);
        //console.log("long_name:" + results[0].address_components[5].long_name);
        //console.log("short_name:" + results[0].address_components[5].short_name);
        //console.log("types:" + results[0].address_components[5].types);
        //console.log("long_name:" + results[0].address_components[6].long_name);
        //console.log("short_name:" + results[0].address_components[6].short_name);
        //console.log("types:" + results[0].address_components[6].types);
        //console.log("long_name:" + results[0].address_components[7].long_name);
        //console.log("short_name:" + results[0].address_components[7].short_name);
        //console.log("types:" + results[0].address_components[7].types);
        //console.log("long_name:" + results[0].address_components[8].long_name);
        //console.log("short_name:" + results[0].address_components[8].short_name);
        //console.log("types:" + results[0].address_components[8].types);

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

function UpdateMapDetails(address, obj) {
    var txt = "<strong>" + address + "</strong><br/><br/>";
    for(var key in obj){
        var val = obj[key];
        txt += "<strong>" + key + "</strong> : " + val + "<br/>";
    }
    

    document.getElementById('map-details-canvas').innerHTML = txt;
}


function UpdateMapDetailsTxt(address, obj_address_txt) {
    var txt = "<strong>" + address + "</strong><br/><br/>";
    txt += obj_address_txt;

    document.getElementById('map-details-canvas').innerHTML = txt;
}



google.maps.event.addDomListener(window, "load", init);



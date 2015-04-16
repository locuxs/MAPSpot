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
        
        var obj_address = ReturnOBJ_Address(results);		
		

        //var obj_address = {            
        //    "Street Num": results[0].address_components[0].short_name,
        //    "street Num Long": results[0].address_components[0].long_name,
        //    "Route": results[0].address_components[1].short_name,
        //    "Route Long": results[0].address_components[1].long_name,
        //    "Neighborhood": results[0].address_components[2].short_name,
        //    "Neighborhood Long": results[0].address_components[2].long_name,
        //    "Sub-Locality": results[0].address_components[3].short_name,
        //    "Sub-Locality Long": results[0].address_components[3].long_name,
        //    "Locality": results[0].address_components[4].short_name,
        //    "Locality Long": results[0].address_components[4].long_name,
        //    "Adm Area": results[0].address_components[5].short_name,
        //    "Adm Area Long": results[0].address_components[5].long_name,
        //    "Province Code": results[0].address_components[6].short_name,
        //    "Province Name": results[0].address_components[6].long_name,
        //    "Country Code": results[0].address_components[7].short_name,
        //    "Country Name": results[0].address_components[7].long_name,
        //    "Postal Code": results[0].address_components[8].short_name,
        //    "postalCodeLong": results[0].address_components[8].long_name,
        //    "Location": results[0].geometry.location,
        //    "Latitude": results[0].geometry.location.lat(),
        //    "Longitude": results[0].geometry.location.lng(),            
        //    "Location Type": results[0].geometry.location_type,

        //}



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
    
    for (var i=0; i < obj.length; i++){
        txt += obj[i].address + "<br/>"
    }

    document.getElementById('map-details-canvas').innerHTML = txt;
}


function ReturnOBJ_Address(results){

		//check the length of the object
        if (typeof results != 'undefined') {
            var len = results.length;
            console.log("len: " + len);
            console.log("??:" + JSON.stringify(results, null, 4));
             
            if (len == 1) {
                //if is 1, then create the obj_address and display
                return BuildOBJ_Address(results);
            } else {

                return BuildOBJ_AddressOptions(results);
            }
    

        }
		//if is more than 1
		//then filter the objects for only Canada location
		//if 1 canada location then create the obj_address and display

		//else create a list of options and show to the user.
		
		//for(i =0; i <= len; i++){
		//	console.log(results[i].formatted_address);
		//}

}

function BuildOBJ_Address(results){

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
        //"Country Code": results[0].address_components[7].short_name,
        //"Country Name": results[0].address_components[7].long_name,
        //"Postal Code": results[0].address_components[8].short_name,
        //"postalCodeLong": results[0].address_components[8].long_name,
        //"Location": results[0].geometry.location,
        //"Latitude": results[0].geometry.location.lat(),
        //"Longitude": results[0].geometry.location.lng(),
        //"Location Type": results[0].geometry.location_type,

    }

    return obj_address;
}

function BuildOBJ_AddressOptions(results) {

        var obj_address;
        var objArr = [];
        for (i = 0; i <= results.length ; i++) {
            var newElement = {};
            console.log(i);
            if (typeof results[i] != 'undefined') {
                var str = newElement.address = results[i].formatted_address;
                if (str.indexOf('Canada') > -1) {
                    newElement.address = results[i].formatted_address;
                    objArr.push(newElement);
                }
            }
            
        }
        console.log("before return");
        return objArr;
}


google.maps.event.addDomListener(window, "load", init);



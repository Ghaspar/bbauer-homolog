$(document).ready(function() {


	if($('div').hasClass('banner-slick')){

		$('.banner-slick').slick();

	}else{

	}


	// menu hamburger

	$('#nav-icon1').click(function(){
		$(this).toggleClass('open');

		$('header .menu ul').toggleClass('menu-show');
	});



	


// custon input number


    jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });


	// Carrinho
	// adiciona
	$(".category .oferta-box").click(function(event){

		var prodAdd = $(this).find(".single-prod-catalog").attr("id");
		console.log(prodAdd);

		$.ajax({
	      url: '/carrinho/add/'+prodAdd,
	      type: 'GET',
	      dataType: 'json',
	    //   data: {param1: 'value1'},
	    })
	    .done(function() {
	    //   console.log("success");
	    })
	    .fail(function() {
	    //   console.log("error");
	    })
	    .always(function() {
	    //   console.log("complete");
	    });


	});





});

function initMap() {
	var uluru = {lat: -33.91721, lng: 151.22630};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 16,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});

	 var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(-33.91721, 151.22630),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91539, 151.22820),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91747, 151.22912),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91910, 151.22907),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91725, 151.23011),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91872, 151.23089),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91784, 151.23094),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91682, 151.23149),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91790, 151.23463),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91666, 151.23468),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.916988, 151.233640),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
            type: 'library'
          }, {
            position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
            type: 'library'
          }
        ];

        // Create markers.
        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
          });
        });


		// Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);


        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });


}

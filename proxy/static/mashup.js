function getCity() {
    var city = document.getElementById("inputcity").value
    return city
}

function getState() {
    var state = document.getElementById("inputstate").value
    return state
}

function wikiloadwithinput() {
  var city = this.getCity()
  var state = this.getState()
  var userloc = city + ", " + state

  $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
          format: "json",
          action: "parse",
          page: userloc, //must mash city with state
          prop: "text",
          redirects: "return",
      },
      dataType: 'jsonp',
      headers: {
          'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
      },
      success: function (data) {
          console.log(data)
          var markup = data.parse.text["*"];
          var i = $('<div></div>').html(markup);
          $('#article').html(i);

          i.find('a').each(function () {
              $(this).replaceWith($(this).html());
          });

          // remove any references
          i.find('sup').remove();

          // remove cite error
          i.find('.mw-ext-cite-error').remove();

          $('#article').html($(i).find('p'));
      }
    })
};

function GetLocation() {
  var city = this.getCity()
  var state = this.getState()
  var userloc = city + ", " + state
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': userloc }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      //alert("Latitude: " + latitude + "\nLongitude: " + longitude);
      //console.log(latitude,longitude)
      var uluru = {lat: latitude, lng: longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });


    } else {
      alert("Could not search that location!")}
  });
}

function initMap() {
    var uluru = {lat: 43.301667, lng: -91.790278};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
};

function initwikiload() {
  $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      data: {
          format: "json",
          action: "parse",
          page: "Decorah,_Iowa",
          prop: "text",
      },
      dataType: 'jsonp',
      headers: {
          'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
      },
      success: function (data) {

          //console.log(data)
          var markup = data.parse.text["*"];
          var i = $('<div></div>').html(markup);
          $('#article').html(i);

          i.find('a').each(function () {
              $(this).replaceWith($(this).html());
          });

          // remove any references
          i.find('sup').remove();

          // remove cite error
          i.find('.mw-ext-cite-error').remove();

          $('#article').html($(i).find('p'));
      }
    })
};
function initforcast() {
  var city = this.getCity();
  var state = this.getState();
  self = this
  $.ajax({
      url : "http://api.wunderground.com/api/c5b10e97144a5b5a/geolookup/conditions/q/IA/Decorah.json",
      dataType : "jsonp",
      method: "GET",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        var weather = parsed_json['current_observation']['weather'];
        var wind = parsed_json['current_observation']['wind_string'];
        var textstuff = ("The current weather for " + location + " is " + temp_f + " degrees fahrenheit and " + weather + " with wind " + wind);
        $('#weatherpic').html(textstuff);
      }
  });
};


function forcast() {
  var city = this.getCity();
  var state = this.getState();
  self = this
  $.ajax({
      url : "http://api.wunderground.com/api/c5b10e97144a5b5a/geolookup/conditions/q/"+ state + "/" + city + ".json",
      dataType : "jsonp",
      method: "GET",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_f = parsed_json['current_observation']['temp_f'];
        var weather = parsed_json['current_observation']['weather'];
        var wind = parsed_json['current_observation']['wind_string'];
        var textstuff = ("The current weather for " + location + " is " + temp_f + " degrees fahrenheit and " + weather + " with wind " + wind)
        $('#weatherpic').html(textstuff);
      }
  });
};

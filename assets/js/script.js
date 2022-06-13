var apiKey = "057a07a785cfb642d41eff0a4ed06de1";
var apiBase = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var geoKey = "126390888670417e15888818x77433";
var searchBtn = document.querySelector(".btn");
var getCity = document.querySelector("#search-city");

// submit buttont to obtain information placed in search button
var searchCity = function(event){
    event.preventDefault();
    
    var city = getCity.value.trim();

    if(city){
        getLoc(city);
        getCity.value = "";
    } else{
        alert("Please enter a location for weather information");
    }

};

// this is solely to get the weather api info
var findWeather = function(lattitude, longitude){
    var cityData = apiBase + lattitude + "&lon=" + longitude + "&appid=" + apiKey;

    fetch(cityData)
    .then(function(response){
        if(response.ok){
            response.json().then
            (function(data){
                console.log(cityData)
            })
        }
    })
};

var getLoc = function(city){
    var geoLocate="https://geocode.xyz/" + city + "?json=1";
    
    fetch(geoLocate)
    .then(function(response){
    
        if(response.ok){
            response.json().then(function(data){
                // retrieve the longitude and lattitude of this location
                var dataLong = data.longt;
                var dataLatt = data.latt;

                console.log(dataLatt + ", " + dataLong);
                findWeather(dataLatt, dataLong);
                console.log(geoLocate);
            });
        }else{
            alert("Error: Location Not Found");
        }
    })
};

getLoc("Portland,Oregon")

searchBtn.addEventListener("click", searchCity);
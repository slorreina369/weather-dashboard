var apiKey = "057a07a785cfb642d41eff0a4ed06de1";
var apiBase = "https://openweathermap.org/data/2.5/find";
var geoKey = "126390888670417e15888818x77433";
var searchBtn = document.querySelector(".btn");
var getCity = document.querySelector("#search-city");

// submit buttont to obtain information placed in search button
var searchCity = function(event){
    event.preventDefault();
    
    var city = getCity.value.trim();

    if(city){
        console.log(city);
        getCity.value = "";
    } else{
        alert("Please enter a location for weather information");
    }
};

var getWeather = function(city){
    var geoLocate="https://geocode.xyz/" + city + "?json=1";
    
    fetch(geoLocate)
    .then(function(response){
    
        if(response.ok){
            response.json().then(function(data){
                var dataLong = data.longt;
                var dataLatt = data.latt;

                console.log(dataLong + ", " + dataLatt);
            })
        }
    })
    console.log(geoLocate);
};




getWeather("Portland,US");
searchBtn.addEventListener("click", searchCity);
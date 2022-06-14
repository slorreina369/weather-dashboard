var apiKey = "057a07a785cfb642d41eff0a4ed06de1";
var apiBase = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var geoKey = "126390888670417e15888818x77433";
var searchBtn = document.querySelector(".btn");
var getCity = document.querySelector("#search-city");
var weatherNow = document.querySelector(".weather-now");

// submit buttont to obtain information placed in search button
var searchCity = function(event){

    
    var city = getCity.value.trim();

    if(city){
        getLoc(city)
        .then(function(data){
            // retrieve the longitude and lattitude of this location
            var dataLong = data.longt;
            var dataLatt = data.latt;

            console.log(dataLatt + ", " + dataLong);
            return findWeather(dataLatt, dataLong);
            
        })
        .then(displayWeather);
        getCity.value = "";
    } else{
        alert("Please enter a location for weather information");
    }

};

// this is solely to get the weather api info
var findWeather = function(lattitude, longitude){
    var cityData = apiBase + lattitude + "&lon=" + longitude + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey;

    return fetch(cityData)
    .then(function(response){
        if(response.ok){
            return response.json()
        }
    })
};

// take the geolocation and convert it to long/latt for weather api
var getLoc = function(city){
    var geoLocate="https://geocode.xyz/" + city + "?json=1";
    console.log(geoLocate);
    
    return fetch(geoLocate)
    .then(function(response){
    
        if(response.ok){
            return response.json()
        }else{
            alert("Error: Location Not Found");
        }
    })
};

// display the weather information
var displayWeather = function(city){
    var currentDay = city.current;
    $(weatherNow).find(".temp").text(currentDay.temp);
    $(weatherNow).find(".wind").text(currentDay.wind_speed);
    $(weatherNow).find(".humid").text(currentDay.humidity);
    $(weatherNow).find(".index").text(currentDay.uvi);

    var forecastDays = city.daily.slice(0,5);
    console.log(currentDay);
    for(var i=0; i <forecastDays.length; i++){
        var dayCard = $(".day-card:nth-of-type(" + (i+1) + ")")
        var dayWeather = forecastDays[i];
        dayCard.find(".temp").text(dayWeather.temp.day);
        dayCard.find(".wind").text(dayWeather.wind_speed);
        dayCard.find(".humid").text(dayWeather.humidity);
    }
};

searchBtn.addEventListener("click", searchCity);
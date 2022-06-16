var apiKey = "057a07a785cfb642d41eff0a4ed06de1";
var apiBase = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var geoKey = "126390888670417e15888818x77433";
var searchBtn = document.querySelector(".btn");
var getCity = document.querySelector("#search-city");
var weatherNow = document.querySelector(".weather-now");
var weatherIcon = document.querySelector(".weather-icon");
var cities = [];

// submit buttont to obtain information placed in search button
var searchCity = function(city){
    $(weatherNow).find(".current-city").text(city);
    if(city){
        getLoc(city)
        .then(function(data){
            // retrieve the longitude and lattitude of this location
            var dataLong = data.longt;
            var dataLatt = data.latt;

            return findWeather(dataLatt, dataLong);
            
        })
        .then(displayWeather);
        getCity.value = "";
    } else{
        alert("Please enter a location for weather information");
    }
    saveCity(city);
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
    var date = moment(currentDay.dt * 1000).format('l');
    var currentIcon = currentDay.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + currentIcon + ".png"

    console.log(iconUrl);
    $('#wicon').attr('src', iconUrl);
    $(weatherNow).find(".current-day").text(date);
    $(weatherNow).find(".temp").text(currentDay.temp);
    $(weatherNow).find(".wind").text(currentDay.wind_speed);
    $(weatherNow).find(".humid").text(currentDay.humidity);
    $(weatherNow).find(".index").text(currentDay.uvi);


    var forecastDays = city.daily.slice(1,6);
    
    for(var i=0; i <forecastDays.length; i++){
        var dayCard = $(".day-card:nth-of-type(" + (i+1) + ")")
        var dayWeather = forecastDays[i];
        var showDate = moment(dayWeather.dt * 1000).format('l');
        var dayIcon = dayWeather.weather[0].icon;
        var dayUrl = "http://openweathermap.org/img/wn/" + dayIcon + ".png"

        dayCard.find(".weather-icon").attr('src', dayUrl);
        dayCard.find(".forecast-day").text(showDate);
        dayCard.find(".temp").text(dayWeather.temp.day);
        dayCard.find(".wind").text(dayWeather.wind_speed);
        dayCard.find(".humid").text(dayWeather.humidity);
    };

    getUvi(currentDay.uvi)
};

var getUvi = function(currentUvi){

    if(currentUvi <= 2){
        console.log("favorable");
        $(weatherNow).find(".index").addClass("favorable");
    } else if(currentUvi <=5){
        console.log("moderate");
        $(weatherNow).find(".index").addClass("moderate");
    } else if(currentUvi >= 6){
        console.log("severe");
        $(weatherNow).find(".index").addClass("severe");
    };
};

var saveCity = function(city){
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));

};

var loadCity = function(){
    cities = JSON.parse(localStorage.getItem("cities"));

    if(!cities){
        cities = [];
    };
    for(var i=0; i<cities.length; i++){
        cityHistory = cities[i];
        var cityLi = $("<li>");
        var historybtn = $("<button>").text(cityHistory);
        $(".search-history > ul").append(cityLi);
        cityLi.append(historybtn);

    }
}

searchBtn.addEventListener("click", function(){
    var city = getCity.value.trim();
    searchCity(city);
});
$(".search-history").on("click", "button", function(event){
    var eventBtn = event.target.innerText
    searchCity(eventBtn);
    console.log("button, I win")    
});
loadCity();
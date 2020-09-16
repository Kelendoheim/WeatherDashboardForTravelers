var submitEl = $(".submitBtn");
var cityInputEl = $(".cityInput");
var cityArray = [];
var searchedCitiesEl = $("#searchedCities");
var currentCity = cityArray[0];
var apiKey = "355f22b7eb531b3ff11fa1095db4b7b4"
// var queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + cityArray[0] + "&units=imperial&appid=" + apiKey


$(document).on("click", ".submitBtn", function (event) {
    event.preventDefault();
    searchedCitiesEl.empty();
    cityArray.unshift($(event.target).siblings().val());
    console.log(cityArray[0]);

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/find?q=" + cityArray[0] + "&units=imperial&appid=" + apiKey,
        method: "GET"
      })
        .then(function(response) {
            var dayIcon = response.list[0].weather[0].icon
            console.log(dayIcon)
            var weatherIcon = $("<img>").attr(
                "src",
                "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png"
              );
            
          $("#currentCityDisplay").text(response.list[0].name + " " + moment().format("MMMM Do YYYY"))
          $("#currentCityDisplay").append(weatherIcon)
          $("#currentCityTemp").text("Temperature: " + response.list[0].main.temp + "F")
          $("#currentCityHumidity").text("Humidity: " + response.list[0].main.humidity + "%")
          $("#currentCityWind").text("Windspeed: " + response.list[0].wind.speed + " mph")
    
        });


    localStorage.setItem(
        "cities",
        cityArray
      );
      for(i = 0; i < cityArray.length; i++){
        var breakEl = $("<br>");
        var cityButtons = $("<div>");
        cityButtons.attr("class", "row btn btn-primary col-sm-12");
        cityButtons.attr("id", cityArray[i])
        cityButtons.text(cityArray[i])
        searchedCitiesEl.append(breakEl)
        searchedCitiesEl.append(cityButtons)
      }
      
  });

  

  
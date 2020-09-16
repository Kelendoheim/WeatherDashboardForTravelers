var submitEl = $(".submitBtn");
var cityInputEl = $(".cityInput");
var cityArray = [];
var searchedCitiesEl = $("#searchedCities");
var currentCity = cityArray[0];
var apiKey = "355f22b7eb531b3ff11fa1095db4b7b4";
var forecastDispaly = $("#forecast");

// The following is the event listener in which all data will be fetched and displayed on the page
$(document).on("click", ".submitBtn", function (event) {
  event.preventDefault();
  searchedCitiesEl.empty();
  forecastDispaly.empty();
  cityArray.unshift($(event.target).siblings().val());
  console.log(cityArray[0]);
  //ajax request for the weather data for the current day
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/find?q=" +
      cityArray[0] +
      "&units=imperial&appid=" +
      apiKey,
    method: "GET",
  }).then(function (response) {
    //the data will then be dynamically populated
    var dayIcon = response.list[0].weather[0].icon;
    console.log(dayIcon);
    var weatherIcon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png"
    );

    $("#currentCityDisplay").text(
      response.list[0].name + " " + moment().format("MMMM Do YYYY")
    );
    $("#currentCityDisplay").append(weatherIcon);
    $("#currentCityTemp").text(
      "Temperature: " + response.list[0].main.temp + "F"
    );
    $("#currentCityHumidity").text(
      "Humidity: " + response.list[0].main.humidity + "%"
    );
    $("#currentCityWind").text(
      "Windspeed: " + response.list[0].wind.speed + " mph"
    );
  });
  //a second ajax request for the future forecast data
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityArray[0] +
      "&units=imperial&cnt=7&appid=" +
      apiKey,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //a for loop that will dynamically display the forecast for the next 5 days
    for (i = 1; i < 6; i++) {
      var dayIcon = response.list[i].weather[0].icon;
      var weatherIcon = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/wn/" + dayIcon + "@2x.png"
      );

      cardEl = $("<div>");
      tempEl = $("<h5>");
      humidEl = $("<h5>");
      var currentDate = moment();
      cardEl.attr("class", "col-sm-2");
      cardEl.text(currentDate.add("days", i));
      tempEl.text("Temperature: " + response.list[i].main.temp + "F");
      humidEl.text("Humidity: " + response.list[i].main.humidity + "%");
      cardEl.append(weatherIcon);
      cardEl.append(tempEl);
      cardEl.append(humidEl);
      forecastDispaly.append(cardEl);

      $("#currentCityTemp").text(
        "Temperature: " + response.list[0].main.temp + "F"
      );
      $("#currentCityHumidity").text(
        "Humidity: " + response.list[0].main.humidity + "%"
      );
    }
  });

  //the cities searched for will be stored locally. I have run out of time tom complete this feature but this datat will be stored to be implemented later
  localStorage.setItem("cities", cityArray);
  //this for loop will create the button for each city searched and give each an id corresponding to the search term that needs to be implemented when i am able to return to this project
  for (i = 0; i < cityArray.length; i++) {
    var breakEl = $("<br>");
    var cityButtons = $("<div>");
    cityButtons.attr("class", "row btn btn-primary col-sm-12");
    cityButtons.attr("id", cityArray[i]);
    cityButtons.text(cityArray[i]);
    searchedCitiesEl.append(breakEl);
    searchedCitiesEl.append(cityButtons);
  }
});

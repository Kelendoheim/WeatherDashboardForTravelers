var submitEl = $(".submitBtn");
var cityInputEl = $(".cityInput");
var cityArray = [];
var searchedCitiesEl = $("#searchedCities");


$(document).on("click", ".submitBtn", function (event) {
    event.preventDefault();
    searchedCitiesEl.empty();
    cityArray.unshift($(event.target).siblings().val());
    console.log(cityArray);
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

  
var submitEl = $(".submitBtn");
var cityInputEl = $(".cityInput");
var cityArray = [];


$(document).on("click", ".submitBtn", function (event) {
    event.preventDefault();
    cityArray.unshift($(event.target).siblings().val());
    console.log(cityArray);
    localStorage.setItem(
        "cities",
        cityArray
      );
  });
(function () {

  var filters = document.querySelectorAll(".filter a")
  var search = document.querySelector(".search input")
  for (var i = 0; i < filters.length; i++) {
      filters[i].addEventListener("click", function () {
        search.focus()
        search.click()
        search.click()
      }, false)
  }
  
  document.addEventListener ("keydown", function (event) {
    if (event.ctrlKey  &&  event.shiftKey  &&  event.keyCode === 70) {
        search.focus()
    }
  } )

})()
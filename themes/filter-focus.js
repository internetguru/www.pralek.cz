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

})()
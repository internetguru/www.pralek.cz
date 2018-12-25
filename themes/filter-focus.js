(function () {

    var Config = {}
    Config.defaultChangeText = "Změnit"

    var filters = document.querySelectorAll(".filter")
    for (var i = 0; i < filters.length; i++) {
        var changeLink = document.createElement("a")
        changeLink.textContent = Config.defaultChangeText
        changeLink.addEventListener("click", function () {
            var search = document.querySelector(".search input")
            search.focus()
            search.click()
            search.click()
        }, false)
        filters[i].appendChild(changeLink)
    }

    document.addEventListener ("keydown", function (event) {
        if (event.ctrlKey  &&  event.shiftKey  &&  event.keyCode === 70) {
            document.querySelector(".search input").focus()
        }
    } )

})()
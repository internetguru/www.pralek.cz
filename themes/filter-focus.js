(function () {

    var Config = {}
    Config.defaultChangeText = "Změnit"

    var selectedTag = document.querySelectorAll("a.tag.nowarning[href^='#']")
    var filters = document.querySelectorAll(".filter")
    for (var i = 0; i < filters.length; i++) {
        if (selectedTag.length > 0) {
            filters[i].appendChild(selectedTag[0].cloneNode(true))
        }
        var changeLink = document.createElement("a")
        changeLink.textContent = Config.defaultChangeText
        changeLink.className = "button"
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
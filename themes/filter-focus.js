(function () {
    
    var selectedTag = document.querySelectorAll("a.tag.nowarning[href^='#']")
    if (selectedTag.length <= 0) {
        return
    }
    var h2 = document.getElementById("clanky")
    var tag = selectedTag[0].cloneNode(true)
    tag.removeAttribute("href")
    h2.appendChild(tag)

})()
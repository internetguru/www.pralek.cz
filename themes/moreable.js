(function () {

    var Config = {}
    Config.defaultStep = 6
    Config.defaultLimit = 4
    Config.defaultMoreText = "Další články"

    function Moreable () {

        var
        parent,
        step,
        limit,
        moreText,
        hiddenItems = [],
        showMore = function (event) {
            var displayCount = limit
            if (hiddenItems.length - step - limit < 0) {
                displayCount = hiddenItems.length
            }
            for (var i = 0; i < displayCount; i++) {
                hiddenItems.shift().style.display = ""
            }
            if (hiddenItems.length == 0) {
                parent.removeChild(event.target.parentNode)
            }
        },
        initStructure = function () {
            if (parent.children.length - step - limit < 0) {
                return;
            }
            for (var i = 0; i < parent.children.length; i++) {
                if (i < step) {
                    continue;
                }
                parent.children[i].style.display = "none"
                hiddenItems.push(parent.children[i])
            }
            var wrapper = document.createElement("div")
            wrapper.className = "moreable-linkwrapper"
            var moreLink = document.createElement("a")
            moreLink.textContent = moreText
            moreLink.addEventListener("click", showMore, false)
            wrapper.appendChild(moreLink)
            parent.appendChild(wrapper)
        }

        return {
            init: function (p, s, l, m) {
                parent = p
                step = (s === null) ? Config.defaultStep : s
                limit = (l === null) ? Config.defaultLimit : l
                moreText = (m === null) ? Config.defaultMoreText : m
                initStructure()
            }
        }
    }
    var parents = document.querySelectorAll(".part:last-child > .list.multiple:last-child > div")
    for (var i = 0; i < parents.length; i++) {
        var step = parents[i].getAttribute("data-moreable-step")
        var limit = parents[i].getAttribute("data-moreable-limit")
        var more = parents[i].getAttribute("data-moreable-moretext")
        var moreable = new Moreable()
        moreable.init(parents[i], step, limit, more)
    }
})()
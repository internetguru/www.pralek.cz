(function () {

  require("IGCMS", function () {

    var Config = {}
    Config.displayStep = 6
    Config.displayMin = 3
    Config.moreText = "Show more"
    Config.leftText = "%s left"
    Config.countedChildrenSelector = "*"

    function Moreable() {

      var
        parent,
        wrapper,
        left,
        countedHiddenLength,
        hiddenItems = [],
        config = {},
        showMore = function (event) {
          var displayCount = config.displayStep
          if (countedHiddenLength - config.displayStep - config.displayMin < 0) {
            displayCount = hiddenItems.length
          }
          if (event) {
            event.currentTarget.blur()
          }
          var showed = 0
          while (showed != displayCount && hiddenItems.length != 0) {
            var item = hiddenItems.shift()
            item.elm.style.display = ""
            item.elm.classList.add("moreable-shown")
            if (item.counted) {
              showed++
              countedHiddenLength--
            }
          }
          if (hiddenItems.length === 0) {
            wrapper.parentNode.removeChild(wrapper)
            return
          }
          left.innerHTML = " (" + config.leftText.replace("%s", countedHiddenLength) + ")"
        },
        initStructure = function () {
          // hide all
          countedHiddenLength = 0
          for (var i = 0; i < parent.children.length; i++) {
            parent.children[i].style.display = "none"
            var counted = parent.children[i].matches(config.countedChildrenSelector)
            if (counted) {
              countedHiddenLength++
            }
            hiddenItems.push({
              elm: parent.children[i],
              counted: counted
            })
          }
          wrapper = document.createElement("div")
          wrapper.className = "moreable-linkwrapper"
          var moreLink = document.createElement("button")
          moreLink.textContent = config.moreText
          moreLink.addEventListener("click", showMore, false)
          moreLink.className = "eventable button button--simple"
          moreLink.setAttribute('data-eventable-action', 'moreable')
          moreLink.setAttribute('data-eventable-label', config.moreText)
          try {
            require("IGCMS.Eventable", function () {
              IGCMS.Eventable.register(moreLink)
            })
          } catch(exception) {}
          left = document.createElement("span")
          moreLink.appendChild(left)
          wrapper.appendChild(moreLink)
          parent.appendChild(wrapper)
          showMore()
        }

      return {
        init: function (cfg) {
          parent = document.querySelector(cfg.parent)
          if (!parent) {
            return;
          }
          config = Object.assign(config, Config)
          IGCMS.initCfg(config, cfg);
          initStructure()
        }
      }
    }

    function MoreableIniter() {
      return {
        init: function (cfg) {
          var moreable = new Moreable()
          moreable.init(cfg)
        }
      }
    }

    IGCMS.Moreable = new MoreableIniter()
  })
})()
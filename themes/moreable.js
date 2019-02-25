(function () {

  require("IGCMS", function () {

    var Config = {}
    Config.displayStep = 6
    Config.displayMin = 3
    Config.moreText = "Show more"
    Config.leftText = "%s left"

    function Moreable() {

      var
        parent,
        wrapper,
        left,
        hiddenItems = [],
        showMore = function (event) {
          var displayCount = Config.displayStep
          if (hiddenItems.length - Config.displayStep - Config.displayMin < 0) {
            displayCount = hiddenItems.length
          }
          for (var i = 0; i < displayCount; i++) {
            hiddenItems.shift().style.display = ""
          }
          left.innerHTML = " (" + Config.leftText.replace("%s", hiddenItems.length) + ")"
          if (hiddenItems.length === 0) {
            wrapper.parentNode.removeChild(wrapper)
          }
        },
        initStructure = function () {
          if (parent.children.length - Config.displayStep - Config.displayMin < 0) {
            return;
          }
          for (var i = 0; i < parent.children.length; i++) {
            if (i < Config.displayStep) {
              continue;
            }
            parent.children[i].style.display = "none"
            hiddenItems.push(parent.children[i])
          }
          wrapper = document.createElement("div")
          wrapper.className = "moreable-linkwrapper eventable"
          var moreLink = document.createElement("a")
          moreLink.textContent = Config.moreText
          moreLink.addEventListener("click", showMore, false)
          left = document.createElement("span")
          left.innerHTML = " (" + Config.leftText.replace("%s", hiddenItems.length) + ")"
          moreLink.appendChild(left)
          wrapper.appendChild(moreLink)
          parent.appendChild(wrapper)
        }

      return {
        init: function (cfg) {
          parent = document.querySelector(cfg.parent)
          if (!parent) {
            return;
          }
          IGCMS.initCfg(Config, cfg);
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
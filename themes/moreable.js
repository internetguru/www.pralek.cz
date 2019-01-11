(function () {

  require("IGCMS", function () {

    var Config = {}
    Config.step = 6
    Config.limit = 3
    Config.moreText = "Show more"

    function Moreable() {

      var
        parent,
        hiddenItems = [],
        showMore = function (event) {
          var displayCount = Config.limit
          if (hiddenItems.length - Config.step - Config.limit < 0) {
            displayCount = hiddenItems.length
          }
          for (var i = 0; i < displayCount; i++) {
            hiddenItems.shift().style.display = ""
          }
          if (hiddenItems.length === 0) {
            parent.removeChild(event.target.parentNode)
          }
        },
        initStructure = function () {
          if (parent.children.length - Config.step - Config.limit < 0) {
            return;
          }
          for (var i = 0; i < parent.children.length; i++) {
            if (i < Config.step) {
              continue;
            }
            parent.children[i].style.display = "none"
            hiddenItems.push(parent.children[i])
          }
          var wrapper = document.createElement("div")
          wrapper.className = "moreable-linkwrapper eventable"
          var moreLink = document.createElement("a")
          moreLink.textContent = Config.moreText
          moreLink.addEventListener("click", showMore, false)
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
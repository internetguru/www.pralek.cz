(function(win) {

  require("IGCMS", function() {

    if(IGCMS.Hideable) return

    var Config = {}

    Config.ns = "hideable"
    Config.expand = "►"
    Config.collapse = "▼"
    Config.expandTitle = "Expand"
    Config.collapseTitle = "Collapse"
    Config.hideableHiddenClass = Config.ns + "-hidden"
    Config.hideableNohideClass = Config.ns + "-nohide"
    Config.hideableNohideFallbackClass = "nohide"
    Config.hideClass = Config.ns + "-hide"
    Config.switchClass = Config.ns + "-switch"
    Config.noprintClass = "noprint"
    Config.dataHere = "data-" + Config.ns + "-here"
    Config.dataBefore = "data-" + Config.ns + "-before"
    Config.css = '/* hideables.js */'
      + ' .' + Config.hideClass + ' { display: none !important; }'
      + ' a.' + Config.switchClass + ' { text-decoration: none; border: none !important; }'
      + ' a.' + Config.switchClass + ':before { font-family: "Emilbus Mono", "Lucida Console", monospace; margin-right: 0.3em; }'
      + '.' + Config.hideableHiddenClass + ' a.' + Config.switchClass + ':before { content: "' + Config.expand + '" }'
      + '.' + Config.hideableNohideClass + ' a.' + Config.switchClass + ':before { content: "' + Config.collapse + '" }'

    var Hideable = function() {

      var inited = false
      var hideableLinks = []

      var initHideables = function () {
        var hideables = document.querySelectorAll('.' + Config.ns)
        for (var i = 0; i < hideables.length; i++) {
          var hideable = hideables[i]
          var parentMode = hideable.children.length == 0 ? true : false
          if (parentMode) {
            hideable = hideable.parentNode
            hideable.classList.add(Config.ns)
            if (hideables[i].classList.contains(Config.hideableNohideClass)) {
               hideable.classList.add(Config.hideableNohideClass) 
            }
            if (hideables[i].classList.contains(Config.hideableNohideFallbackClass)) {
               hideable.classList.add(Config.hideableNohideFallbackClass) 
            }
          }
          var link = initToggleButton(hideable)
          if (link === null) {
            continue
          }
          var containsNohide = 
            (hideables[i].classList.contains(Config.hideableNohideClass)
            || hideables[i].classList.contains(Config.hideableNohideFallbackClass))
            ? true : false
          if (parentMode) {
            hideables[i].classList.remove(Config.ns)
            hideables[i].classList.remove(Config.hideableNohideClass)
            hideables[i].classList.remove(Config.hideableNohideFallbackClass)
          }
          if (containsNohide) {
            continue
          }
          hideable.classList.add(Config.hideableNohideClass)
          toggleElement(link)
        }
      }

      var createToggleButton = function (value) {
        var link = document.createElement('a')
        link.href = 'Javascript:void(0)'
        link.title = Config.collapseTitle
        link.classList.add(Config.switchClass)
        link.classList.add(Config.noprintClass)
        link.addEventListener('click', toggle, false)
        link.innerHTML = value
        hideableLinks.push(link)
        return link
      }

      var initToggleButton = function (hideable) {
        for (var i = hideable.children.length - 1; i >= 0; i--) {
          var item = hideable.children[i]
          var here = item.getAttribute(Config.dataHere)
          var before = item.getAttribute(Config.dataBefore)
          var button = null
          var value = ""
          if (before !== null) {
            value = (before === Config.dataBefore || before === '') ? item.innerHTML : before
            button = createToggleButton(value)
            var el = document.createElement(item.nodeName)
            el.appendChild(button)
            item.parentNode.insertBefore(el, item)
            return button
          }
          if (here !== null || i === 0) {
            value = (here === Config.dataHere || !here) ? item.innerHTML : here
            button = createToggleButton(value)
            item.innerHTML = ""
            item.appendChild(button)
            return button
          }
        }
        return null
      }

      var toggle = function (e) {
        var target = e.currentTarget
        toggleElement(target)
        e.preventDefault()
      }

      var toggleElement = function (link) {
        var e = link.parentNode.parentNode
        if (e.classList.contains(Config.hideableNohideClass)) {
          e.classList.remove(Config.hideableNohideClass)
          e.classList.add(Config.hideableHiddenClass)
          link.title = Config.expandTitle
        } else {
          e.classList.remove(Config.hideableHiddenClass)
          e.classList.add(Config.hideableNohideClass)
          link.title = Config.collapseTitle
        }
        for (var i = e.childNodes.length - 1; i > 0; i--) {
          var ch = e.childNodes[i]
          if (ch.nodeType !== 1) {
            continue
          }
          if (ch.firstChild.classList && ch.firstChild.classList.contains(Config.switchClass)) {
            return
          }
          if (ch.classList.contains(Config.hideableNohideClass)) {
            continue
          }
          if (ch.classList.contains(Config.hideClass)) {
            ch.classList.remove(Config.hideClass)
          } else {
            ch.classList.add(Config.hideClass)
          }
        }
      }

      var fireControlEvent = function () {
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            hideableLinks.forEach((item) => {
              if (item.parentNode.parentNode.classList.contains(Config.hideableNohideClass)) {
                toggleElement(item)
              }
            })
          }
        })
        document.addEventListener("click", (event) => {
          hideableLinks.forEach((item) => {
            if (event.target.closest(`.${Config.ns}`)) {
              return
            }
            if (item.parentNode.parentNode.classList.contains(Config.hideableNohideClass)) {
              toggleElement(item)
            }
          })
        })
      }

      // public
      return {
        init : function(cfg) {
          if(inited) return
          IGCMS.initCfg(Config, cfg)
          IGCMS.appendStyle(Config.css)
          initHideables()
          fireControlEvent()
          inited = true
        },
        isInit : function() { return inited; },
        toggleElement: toggleElement
      }
    };

    IGCMS.Hideable = new Hideable();
  });
})(window);


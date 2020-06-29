(() => {

  require("IGCMS", () => {

    var Config = {}
    Config.ns = "scrolltopable" // wrapper element (a) id value
    Config.text = "^" // text content
    Config.title = "Nahoru" // text content
    Config.hidePosition = 500 // display / hide button int px from top
    Config.scrollhideClass = "scrollhide"
    Config.noprintClass = "noprint"
    Config.visibleClass = Config.ns + "--visible"
    Config.activeClass = Config.ns + "--active"
    Config.activeTimeout = 0 // ms
    Config.actionTimeout = 200 // ms
    Config.animationSpeed = 250 // ms
    Config.deltaYshow = 200
    Config.deltaYhide = 200
    Config.deltaYbottom = 500

    var Scrolltopable = function () {

      var
        windowScrollTimeOut = null,
        button = null,
        displayed = false,
        lastScrollTop = 0,
        getScrollTop = function () {
          return document.body.scrollTop || document.documentElement.scrollTop
        },
        getHeight = function () {
          var body = document.body,
            html = document.documentElement
          return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - Math.max(html.clientHeight, window.innerHeight || 0)
        },
        hideButton = function () {
          displayed = false
          var button = document.getElementById(Config.ns)
          button.classList.remove(Config.visibleClass)
        },
        showButton = function () {
          displayed = true
          var button = document.getElementById(Config.ns)
          button.classList.add(Config.visibleClass)
        },
        processScroll = function () {
          window.clearTimeout(windowScrollTimeOut)
          windowScrollTimeOut = window.setTimeout(function () {
            if (button.classList.contains(Config.activeClass)) {
              return;
            }
            var scrollTop = getScrollTop()
            var delta = scrollTop - lastScrollTop
            var deltaAbs = Math.abs(delta)
            if (getHeight() - scrollTop < Config.deltaYbottom) {
              showButton()
            } else if (
              scrollTop < Config.hidePosition
              || (delta > 0 && deltaAbs > Config.deltaYhide)
            ) {
              hideButton()
            } else if (deltaAbs > Config.deltaYshow) {
              showButton()
            }
            lastScrollTop = scrollTop
          }, Config.actionTimeout)
        },
        init = function () {
          var scrollTop = getScrollTop()
          if (scrollTop < Config.hidePosition) {
            return
          }
          showButton()
          lastScrollTop = scrollTop
        },
        setScrollEvent = function () {
          window.addEventListener('scroll', processScroll, false)
        },
        createButton = function () {
          button = document.createElement("a")
          button.id = Config.ns
          button.title = Config.title
          button.className = Config.noprintClass + " " + Config.ns
          var span = document.createElement("span")
          span.innerHTML = Config.text
          button.appendChild(span)
          let fragment = new DocumentFragment()
          fragment.appendChild(button)
          document.body.appendChild(fragment)
        }

      return {
        /**
        * @param  {Object} cfg custom configuration
        */
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg)
          var css = `
/* scrolltopable.js */
.${Config.ns} {
  font-family: "Times new roman", serif;
  position: fixed;
  right: 0;
  bottom: 0;
  text-decoration: none;
  background: rgba(0, 0, 0, 0.45);
  font-size: 1.75rem;
  margin: 0.75rem;
  display: block;
  color: white;
  width: 1em;
  padding: 0.4em;
  height: 1em;
  text-align: center;
  overflow: hidden;
  z-index: 100;
  cursor: pointer;
  line-height: 1;
  opacity: 0;
  border: none;
  pointer-events: none;
  transition: opacity ${Config.animationSpeed}ms ease;
  box-sizing: content-box;
  border-radius: var(--global-border-radius);
}
.${Config.visibleClass} {
  opacity: 1;
  pointer-events: all;
}
.${Config.ns}:hover {
  background: rgba(0, 0, 0, 0.65);
}
.${Config.ns} span {
  font-size: 2.3rem;
}
.${Config.activeClass} {
}
`
          IGCMS.appendStyle(css)
          createButton()
          button.addEventListener("click", (event) => {
            window.scrollTo(0, 0)
            if (Config.activeTimeout == 0) {
              return;
            }
            button.classList.add(Config.activeClass)
            window.setTimeout(() => {
              button.classList.remove(Config.visibleClass)
              button.classList.remove(Config.activeClass)
            }, Config.activeTimeout)
          })
          setScrollEvent()
          init()
        }
      }
    }

    window.IGCMS.Scrolltopable = new Scrolltopable()
  })
})()

(() => {

  require("IGCMS", () => {

    var Config = {}
    Config.buttonHTML = "Copy"
    Config.selectTitle = "Copy"
    Config.ns = "copyable"

    var Copyable = function () {

      var
        copyText = function (event, elm) {
          navigator.clipboard.writeText(elm.textContent).then(() => {
            // TODO show success message
          }, function(err) {
            console.error('Could not copy text: ', err)
          })
        },
        createButton = function (elements) {
          const generateHandler = (value, method) => e => method(e, value)
          elements.forEach((elm) => {
            var button = document.createElement("button")
            button.addEventListener("click", generateHandler(elm, copyText), false)
            button.innerHTML = Config.buttonHTML
            button.title = Config.selectTitle
            button.className = "eventable button button button--simple button--img button--img-only"
            var spanWrapper = document.createElement("span")
            var span = document.createElement("span")
            spanWrapper.appendChild(span)
            spanWrapper.className = Config.ns + "__wrapper"
            var copyable = elm
            var parent = elm.parentNode
            if (parent.nodeName.toLowerCase() === "pre") {
              copyable = parent
              parent = parent.parentNode
            }
            parent.insertBefore(spanWrapper, copyable)
            span.appendChild(button)
            spanWrapper.appendChild(copyable)
          })
        }

      // public
      return {
        init: function (cfg) {
          // create toc
          IGCMS.initCfg(Config, cfg)
          var elements = document.querySelectorAll("." + Config.ns)
          createButton(elements)
        }
      }
    }

    IGCMS.Copyable = new Copyable()
  })
})()

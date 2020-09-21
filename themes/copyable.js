(() => {

  require("IGCMS", () => {

    var Config = {}

    Config.ns = "copyable"
    Config.buttonClass = `${Config.ns}__button`
    Config.buttonIco = "fas fa-fw fa-copy"
    Config.buttonContent = ""
    Config.successMsg = ""
    Config.copyOnClick = false 


    var CopyableElm = function () {

      var
        button = null,
        successMsg = null,
        buttonIco = null,
        copyText = function (event, elm) {
          navigator.clipboard.writeText(elm.textContent).then(() => {
            var newButton = initButton(buttonIco, successMsg)
            button.innerHTML = newButton.innerHTML
          }, function(err) {
            console.error('Could not copy text: ', err)
          })
        },
        getButton = function () {
          var button = document.createElement("button")
          button.className = Config.buttonClass
          return button
        },
        initButton = function (buttonIco, buttonContent) {
          var button = null
          if (buttonIco) {
            button = getButton()
            button.innerHTML = `<span class="${buttonIco}"></span>`
          }
          if (buttonContent) {
            if (!button) {
              button = getButton()
            }
            button.insertAdjacentHTML("beforeend", buttonContent)
          }
          return button
        }

      return {
        init: function (elm) {
          const generateHandler = (value, method) => e => method(e, value)
          const buttonContent = elm.hasAttribute("data-button-content") ? elm.getAttribute("data-button-content") : Config.buttonContent
          const copyOnClick = elm.hasAttribute("data-copy-on-click") ? elm.getAttribute("data-copy-on-click") : Config.copyOnClick
          buttonIco = elm.hasAttribute("data-button-ico") ? elm.getAttribute("data-button-ico") : Config.buttonIco
          successMsg = elm.hasAttribute("data-success-msg") ? elm.getAttribute("data-success-msg") : Config.successMsg

          var spanWrapper = document.createElement("span")
          var span = document.createElement("span")
          spanWrapper.appendChild(span)
          spanWrapper.className = Config.ns + "__wrapper"
          if (copyOnClick) {
            elm.addEventListener("click", generateHandler(elm, copyText), false)
          }
          var parent = elm.parentNode
          if (parent.nodeName.toLowerCase() === "pre") {
            elm = parent
            parent = parent.parentNode
          }
          parent.insertBefore(spanWrapper, elm)
          spanWrapper.appendChild(elm)
          button = initButton(buttonIco, buttonContent)
          if (button) {
            button.addEventListener("click", generateHandler(elm, copyText), false)
            span.appendChild(button)
          }
        }
      }
    }

    var Copyable = function () {

      var
        initCopyables = function (elements) {          
          elements.forEach((elm) => {
            var copyable = new CopyableElm()
            copyable.init(elm)
          })
        }

      // public
      return {
        init: function (cfg) {
          // create toc
          IGCMS.initCfg(Config, cfg)
          var elements = document.querySelectorAll("." + Config.ns)
          initCopyables(elements)
        }
      }
    }

    IGCMS.Copyable = new Copyable()
  })
})()

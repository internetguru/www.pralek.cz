(function(win) {

  require("IGCMS", function () {

    var Config = {}
    Config.ns = "eventable"
    Config.classNoEvent = Config.ns + "-noevent"
    Config.dataCategory = "data-" + Config.ns + "-category"
    Config.dataAction = "data-" + Config.ns + "-action"
    Config.dataLabel = "data-" + Config.ns + "-label"
    Config.debug = false

    var Eventable = function () {

      // private
      var
        fireEvents = function (elements) {
          if (elements.length === 0) {
            return
          }
          for (var i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains(Config.classNoEvent)) {
              continue;
            }
            var handler = sendGAEvents
            var eventName = "click"
            if (elements[i].nodeName.toLowerCase() === "form") {
              handler = sendGAFormEvents
              eventName = "submit"
            }
            elements[i].addEventListener(eventName, handler, false)
          }
        },
        firePrintEvent = function () {
          window.addEventListener("beforeprint", (event) => {
            sendGAEvent("print")
          })
        },
        sendGAEvents = function (event) {
          var element = this
          var category = element.getAttribute(Config.dataCategory) || element.id || element.className || element.nodeName
          var action = element.getAttribute(Config.dataAction) || element.href || element.nodeName
          var label = element.getAttribute(Config.dataLabel) || element.innerText
          sendGAEvent(category, action, label)
          if (Config.debug) {
            event.preventDefault();
          }
        },
        sendGAFormEvents = function (event) {
          var form = event.target
          var inputs = form.getElementsByTagName("input")
          var category = form.getAttribute(Config.dataCategory) || form.id || form.className || 'form-' + form.action + '-' + form.method
          for (var i = 0; i < inputs.length; i++) {
            sendGAEvent(category, inputs[i].name, inputs[i].value)
          }
          if (Config.debug) {
            event.preventDefault();
          }
        },
        sendGAEvent = function (category, action, label) {
          if (Config.debug || typeof ga === "undefined") {
            console.log("category: '" + category + "'\n"
              + "action: '" + action + "'\n"
              + "label: '" + label + "'")
          } else {
            ga('send', {
              'hitType': 'event',
              'eventCategory': category,
              'eventAction': action,
              'eventLabel': label
            });
          }
        };

      // public
      return {
        debug: Config.debug,
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg)
          var allLinks = document.getElementsByTagName("a")
          var externalLinks = []
          for (var i = 0; i < allLinks.length; i++) {
            if (allLinks[i].host && allLinks[i].host !== window.location.host) {
              externalLinks.push(allLinks[i])
            }
            if (allLinks[i].protocol == "mailto:" || allLinks[i].protocol == "tel:") {
              externalLinks.push(allLinks[i])
            }
          }
          fireEvents(externalLinks)
          fireEvents(document.getElementsByTagName("form"))
          fireEvents(document.getElementsByClassName(Config.ns))
          firePrintEvent()
        },
        register: function (link) {
          fireEvents([link])
        },
        sendGAEvent: sendGAEvent
      }
    };

    IGCMS.Eventable = Eventable();
  })
})(window)

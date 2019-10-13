(function() {

  require("IGCMS", function() {

    var Config = {}
    Config.ns = "definition"
    Config.containerClass = Config.ns + "-cont"
    Config.hiddenClass = Config.ns + "-hidden"
    Config.closeClass = Config.ns + "-close"
    Config.closeValue = "×"
    Config.descClass = Config.ns + "-desc"
    Config.dataDescAttr = "data-" + Config.ns + "-desc"
    Config.hrefClass = Config.ns + "-href eventable"
    Config.dataHrefTitleAttr = "data-" + Config.ns + "-href-title"
    Config.css = '/* deginition.js */' +
      '.' + Config.hiddenClass + ' {' +
      '  display: none;' +
      '}' +
      '@media screen { a.' + Config.ns + '{' +
      '  border-bottom: medium dotted #d0abaf !important;' +
      '  color: inherit !important;' +
      '  cursor: pointer;' +
      '} }' +
      '.' + Config.containerClass + ' {' +
      '  font-style: normal;' +
      '  font-weight: normal;' +
      '  color: black;' +
      '  text-align: left;' +
      '  padding: 0;' +
      '  width: 100%;' +
      '  font-size: 1rem;' +
      '  margin: 0.5em auto;' +
      '  float:left;' +
      '}' +
      '.' + Config.descClass + ' {' +
      '  background: #fffacc;' +
      '  padding: 1.5em 1em 1em;' +
      '  position: relative;' +
      '  margin: 0;' +
      '  max-width: 35em;' +
      '}' +
      '.' + Config.hrefClass + ':before {' +
      '  content: "";' +
      '  display: table;' +
      '  padding-top: 0.25em;' +
      '}' +
      '.' + Config.closeClass + ' {' +
      '  position: absolute;' +
      '  top: 0.5em;' +
      '  right: 0.25em;' +
      '  border: 0 none;' +
      '  background: none;' +
      '  font-size: 1.5em;' +
      '  text-align: center;' +
      '  text-indent: 0.1em;' +
      '  line-height: 0;' +
      '  color: gray;' +
      '  cursor: pointer;' +
      '}'

    var DefinitionComponent = function (term) {
      var
        term = term,
        container = null,
        created = false

      return {
        term: term,
        created: created,
        create: function () {
          this.container = document.createElement("div")
          this.container.className = Config.containerClass

          var descValue = this.term.getAttribute(Config.dataDescAttr)
          if (!descValue) {
            descValue = this.term.getAttribute("title")
          }
          var desc = document.createElement("p")
          desc.className = Config.descClass
          desc.innerHTML = descValue;
          this.container.appendChild(desc);

          var closeButton = document.createElement("a")
          closeButton.addEventListener("click", this.toggle.bind(this), false)
          closeButton.innerHTML = Config.closeValue
          closeButton.className = Config.closeClass
          desc.appendChild(closeButton)

          var href = this.term.getAttribute("href")
          var hrefTitle = this.term.getAttribute(Config.dataHrefTitleAttr)
          if (!hrefTitle) {
            hrefTitle = href
          }
          if (hrefTitle && href) {
            var link = document.createElement("a")
            link.className = Config.hrefClass
            link.innerHTML = hrefTitle
            link.setAttribute("href", href)
            desc.appendChild(link)
          }
          this.term.parentNode.insertBefore(this.container, this.term.nextSibling)
          this.created = true
        },
        toggle: function () {
          this.container.classList.toggle(Config.hiddenClass)
        }
      }
    }

    var Definition = function() {

      var
        fireEvents = function () {
          var terms = document.querySelectorAll("." + Config.ns)
          for (var i = 0; i < terms.length; i++) {
            var termComp = new DefinitionComponent(terms[i])
            terms[i].addEventListener("click", toggleTerm.bind(termComp), false)
          }
          return terms.length
        },
        toggleTerm = function (event) {
          if (event.ctrlKey || event.shiftKey) {
            return true;
          }
          if (!this.created) {
            this.create()
          } else {
            this.toggle()
          }
          event.preventDefault()
          return false;
        }

      return {
        init : function(cfg) {
          IGCMS.initCfg(Config, cfg)
          var events = fireEvents()
          if (events === 0) {
            return
          }
          IGCMS.appendStyle(Config.css)
        },
      }
    };

    IGCMS.Definition = new Definition()
    require("IGCMS.Eventable", function () {
      IGCMS.Definition.init()
    })
  });
})();
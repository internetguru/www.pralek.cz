(function(win) {

  require("IGCMS", function () {

    var Config = {};
    Config.saveInactive = "Data file is inactive. Are you sure?";

    var Admin = function () {

      // private
      var
        confirmInactive = function (e, form) {
          if (!form.classList.contains("disabled")) return true;
          if (!form["disabled"].checked) return true;
          if (confirm(Config.saveInactive)) return true;
          e.preventDefault();
          return false;
        },
        setEvents = function () {
          var forms = document.getElementsByTagName("form");
          for (var i = 0; i < forms.length; i++) {
            if (!forms[i].classList.contains(IGCMS.Editable.getEditableClass())) continue;
            setSaveEvents(forms[i]);
          }
        },
        getEventVars = function (e) {
          var vars = {};
          if (win.event) {
            vars.key = win.event.keyCode;
            vars.isShift = !!win.event.shiftKey; // typecast to boolean
            vars.isCtrl = !!win.event.ctrlKey; // typecast to boolean
          } else {
            vars.key = e.which;
            vars.isShift = !!e.shiftKey;
            vars.isCtrl = !!e.ctrlKey;
          }
          return vars;
        },
        setSaveEvents = function (form) {
          form.onkeydown = function (e) {
            var vars = getEventVars(e);
            var key = vars.key;
            var isShift = vars.isShift;
            // letter s and ctrl or meta
            if (!e.ctrlKey && !e.metaKey) return true;
            switch (key) {
              // S
              case 83:
                // save and exit if shift
                if (isShift) {
                  form['saveandgo'].click();
                  return false;
                }
                // save and stay
                form['saveandstay'].click();
                return false;

              default:
                return true;
            }

          };

          form['saveandgo'].onclick = function (e) {
            confirmInactive(e, form);
          };
          form['saveandstay'].onclick = function (e) {
            confirmInactive(e, form);
          }
        };

      // public
      return {
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg);
          setEvents();
          require("IGCMS.Completable", function() {
            IGCMS.Completable.init({
              selectSelector: 'select[name="Admin"]',
              placeholder: "Select file (Ctrl+Shift+E)",
              sendFormText: "Send form",
              sendFormClass: "sendform",
              keyboardShortcut: "ctrl+shift+l"
            })
          })
        }
      }
    };

    win.IGCMS.Admin = new Admin();
  })
})(window);
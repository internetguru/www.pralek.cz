(function(win) {

  require("IGCMS", function () {
    require("Mousetrap", function () {

      var GlobalConfig = {};
      GlobalConfig.ns = "completable";
      GlobalConfig.inputClass = GlobalConfig.ns + "-input";

      var Completable = function () {

        var
          Config = {
            selectSelector: "",
            placeholder: "",
            defaultChangeText: "",
            filterSelector: "",
            sendFormClass: "",
            sendFormText: "",
            keyboardShortcut: ""
          },
          open = false,
          active = -1,
          textNavigValue = "",
          list = null,
          key = null,
          focused = false,

          getWinHeight = function () {
            var w = window,
              d = document,
              e = d.documentElement,
              g = d.getElementsByTagName('body')[0];
            return w.innerHeight || e.clientHeight || g.clientHeight;
          },
          getScrolltop = function () {
            var doc = document.documentElement;
            return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
          },
          getOffsetTop = function (e) {
            var bodyRect = document.body.getBoundingClientRect(),
              elemRect = e.getBoundingClientRect();
            return elemRect.top - bodyRect.top;
          },
          initStructure = function () {
            list = document.createElement("ul");
            list.className = "navigList";
            var textNavig = document.createElement("input");
            textNavig.autocomplete = "off";
            if (Config.navig.tabIndex) {
              textNavig.tabIndex = Config.navig.tabIndex;
            }
            textNavig.name = Config.navig.name;
            textNavig.placeholder = Config.placeholder;
            textNavig.type = "text";
            textNavig.className = GlobalConfig.inputClass;
            textNavig.id = Config.navig.id || ""
            Config.navig.parentNode.replaceChild(textNavig, Config.navig);
            Config.navig = textNavig;
            Config.navig.parentNode.appendChild(list);
            updateSize();
          },
          initEvents = function () {
            Config.navig.addEventListener("input", inputText, false);
            Config.navig.addEventListener("blur", function (e) {
              list.style.height = "0em";
              closeNavig(e);
            }, false);
            Config.navig.addEventListener("click", openNavig, false);
            Config.navig.form.addEventListener("submit", fillVal, false);
            win.addEventListener("resize", updateSize, false);
            win.addEventListener("scroll", updateSize, false);
            Config.navig.addEventListener("keydown", processKey, false);
            if (Config.keyboardShortcut) {
              Mousetrap.bind(Config.keyboardShortcut, function (e) {
                Config.navig.focus()
                createSelection(Config.navig, 0, Config.navig.value.length)
                require("IGCMS.Eventable", function () {
                  IGCMS.Eventable.sendGAEvent("shortcut", "completable", Config.keyboardShortcut);
                })
                e.preventDefault()
                return false
              })
            }
            if (Config.filterSelector) {
              initFilterButtonEvent()
            }
            Config.navig.addEventListener("focus", function () {
              if (focused === true) {
                return;
              }
              focused = true;
              createSelection(Config.navig, 0, Config.navig.value.length)
            }, false);
          },
          initFilterButtonEvent = function () {
            var filters = document.querySelectorAll(Config.filterSelector)
            for (var i = 0; i < filters.length; i++) {
              var changeLink = document.createElement("label")
              changeLink.textContent = Config.defaultChangeText
              changeLink.className = "button eventable"
              changeLink.setAttribute("for", Config.navig.id)
              changeLink.addEventListener("click", function (e) {
                require("IGCMS.Eventable", function () {
                  IGCMS.Eventable.sendGAEvent("filter button", "completable", Config.defaultChangeText);
                })
              }, false)
              filters[i].appendChild(changeLink)
            }
          },
          fillVal = function (event) {
            if (!open && Config.navig.value == "") {
              Config.navig.focus();
              openNavig();
              window.setTimeout(function() {
                openNavig();
              }, 200);
              event.preventDefault();
              return false;
            }
            files = Config.files;
            for (var i = 0; i < files.length; i++) {
              if (files[i].defaultVal.toLowerCase() != Config.navig.value.toLowerCase()) continue;
              Config.navig.value = files[i].path;
            }
          },
          openNavig = function () {
            list.style.height = "auto";
            updateSize();
            if (list.classList.contains("active")) {
              inputText(null);
            }
            else {
              list.classList.add("active");
            }
          },
          closeNavig = function () {
            focused = false;
            list.innerHTML = "";
            textNavigValue = "";
            open = false;
            active = -1;
            list.classList.remove("active");
          },
          scrollParentToChild = function (parent, child) {
            // Where is the parent on page
            var parentRect = parent.getBoundingClientRect();
            // What can you see?
            var parentViewableArea = {
              height: parent.clientHeight,
              width: parent.clientWidth
            };
            // Where is the child
            var childRect = child.getBoundingClientRect();
            // Is the child viewable?
            var isViewable = (childRect.top >= parentRect.top) && (childRect.top <= parentRect.top + parentViewableArea.height);
            // if you can't see the child try to scroll parent
            if (!isViewable) {
              // scroll by offset relative to parent
              parent.scrollTop = (childRect.top + parent.scrollTop) - parentRect.top
            }
          },
          setActiveList = function () {
            list.childNodes[active].classList.add("active");
            scrollParentToChild(list, list.childNodes[active]);
            if (!list.childNodes[active].classList.contains(Config.sendFormClass)) {
              Config.navig.value = list.childNodes[active].dataset.val;
            } else {
              Config.navig.value = textNavigValue;
            }
          },
          processKey = function (e) {
            switch (e.keyCode) {
              case 27: //esc
                if (!open) {
                  Config.navig.blur();
                  break;
                }
                Config.navig.value = textNavigValue;
                closeNavig();
                break;
              case 38: //up
                if (typeof list.childNodes[active] !== "undefined") {
                  list.childNodes[active].classList.remove("active");
                }
                if (active == -1) {
                  active = list.childNodes.length;
                }
                if (--active <= -1) {
                  Config.navig.value = textNavigValue;
                  e.preventDefault();
                  return;
                }
                setActiveList();
                e.preventDefault();
                break;
              case 40: //down
                if (!open) {
                  inputText(null);
                }
                if (typeof list.childNodes[active] !== "undefined") {
                  list.childNodes[active].classList.remove("active");
                }
                if (active == list.childNodes.length) {
                  active = -1;
                }
                if (++active >= list.childNodes.length) {
                  Config.navig.value = textNavigValue;
                  e.preventDefault();
                  return;
                }
                setActiveList();
                e.preventDefault();
                break;
              default:
                key = e.keyCode;
                return true;
            }
          },
          inputText = function (e) {
            closeNavig();
            open = true;
            var navig = !e ? Config.navig : e.target || e.srcElement;
            var value = navig.value;
            textNavigValue = value;
            var fs = filter(Config.files, value);
            update(fs);
          },
          clearSelection = function (navig) {
            if (!navig.selectionStart) {
              return;
            }
            navig.value = navig.value.substring(0, navig.selectionStart);
          },
          createSelection = function (navig, start, end) {
            if (navig.createTextRange) {
              var selRange = navig.createTextRange();
              selRange.collapse(true);
              selRange.moveStart('character', start);
              selRange.moveEnd('character', end);
              selRange.select();
              navig.focus();
              return;
            }
            if (navig.setSelectionRange) {
              navig.focus();
              navig.setSelectionRange(start, end);
              return;
            }
            if (typeof navig.selectionStart != 'undefined') {
              navig.selectionStart = start;
              navig.selectionEnd = end;
              navig.focus();
            }
          },
          updateSize = function () {
            list.style.width = Config.navig.offsetWidth + "px";
            list.style.maxHeight = (getWinHeight() - getOffsetTop(list) + getScrolltop()) + "px";
          },
          fileMergeSort = function (arr) {
            if (arr.length < 2) {
              return arr;
            }
            var middle = parseInt(arr.length / 2);
            return merge(fileMergeSort(arr.slice(0, middle)), fileMergeSort(arr.slice(middle, arr.length)));
          },
          merge = function (left, right) {
            var result = [];
            while (left.length && right.length) {
              if (left[0].priority <= right[0].priority) {
                result.push(left.shift());
              } else {
                result.push(right.shift());
              }
            }
            while (left.length) {
              result.push(left.shift());
            }
            while (right.length) {
              result.push(right.shift());
            }
            return result;
          },
          filter = function (arr, value) {
            var fs = [];
            var qvalue = IGCMS.preg_quote(value).replace(/\\\*/g, "[^/ ]*");
            var pattern = new RegExp("(^|[^a-z0-9])(" + qvalue + ")", "gi");
            if (!value) {
              pattern = false;
            }
            for (var i = 0; i < arr.length; i++) {
              // do not filter
              if (arr[i].class == Config.sendFormClass) {
                fs.push(arr[i]);
                continue;
              }
              var r = doFilter(arr[i], value, pattern);
              if (typeof r != "undefined") {
                fs.push(r);
              }
            }
            fs = fileMergeSort(fs);
            return fs;
          },
          doFilter = function (f, value, pattern) {
            try {
              if (pattern && !f.val.match(pattern)) {
                return;
              }
              var r = {};
              var priority = 3;
              if (pattern) {
                if (f.path.replace(/^.*[\\\/]/, '').indexOf(value) === 0) {
                  priority = 1;
                }
                else {
                  var parts = f.path.split(/[ _\/-]/);
                  for (var i = 0; i < parts.length; i++) {
                    if (parts[i].indexOf(value) !== 0) continue;
                    priority = 2;
                  }
                }
                r.val = f.val.replace(pattern, "$1<strong>$2</strong>");
              } else {
                r.val = f.val;
              }
              r.val = r.val.replace(/(#.+$)/, "<span>$1</span>");
              r.priority = priority;
              r.defaultVal = f.defaultVal;
              r.path = f.path;
              r.class = f.class;
              return r;
            } catch (e) {
            }
          },
          setCurrentFile = function () {
            var href = decodeURIComponent(window.location.href)
            for (var i = 0; i < Config.files.length; i++) {
              if (href.indexOf(Config.files[i].path) !== -1) {
                active = i
                Config.navig.value = Config.files[i].defaultVal
                return
              }
            }
          },
          update = function (fs) {
            var first = true;
            for (var i = 0; i < fs.length; i++) {
              // selection
              if (first
                && Config.navig.value.length
                && key !== 8
                && fs[i].defaultVal.toLowerCase().indexOf(Config.navig.value.toLowerCase()) == 0
                && fs[i].class != Config.sendFormClass
              ) { // 8 is backspace
                var start = Config.navig.value.length;
                var end = fs[i].defaultVal.length;
                Config.navig.value = fs[i].defaultVal;
                createSelection(Config.navig, start, end);
                first = false;
              }
              var li = document.createElement("li");
              li.innerHTML = fs[i].val;
              li.className = fs[i].class;
              li.dataset.path = fs[i].path;
              li.dataset.val = fs[i].defaultVal;
              li.onmousemove = (function () {
                var localValue = fs[i].defaultVal;
                var navig = Config.navig;
                if (fs[i].class == Config.sendFormClass) {
                  localValue = false;
                }
                return function () {
                  if (localValue !== false) {
                    navig.value = localValue;
                  } else {
                    clearSelection(navig);
                  }
                }
              })();
              li.onmousedown = (function () {
                var localValue = fs[i].path;
                var navig = Config.navig;
                var localList = list
                if (fs[i].class == Config.sendFormClass) {
                  localValue = false;
                }
                return function () {
                  if (localValue !== false) {
                    navig.value = localValue;
                  } else {
                    clearSelection(navig);
                  }
                  localList.onmouseout = null;
                  var event = document.createEvent('Event');
                  event.initEvent('submit', true, true);
                  navig.form.dispatchEvent(event);
                  navig.form.submit();
                }
              })();
              list.appendChild(li);
              list.onmouseout = (function(){
                var previousValue = textNavigValue;
                var navig = Config.navig;
                return function () {
                  Config.navig.value = previousValue;
                }
              })();
            }
          };

        // public
        return {
          init: function (cfg) {
            Config.files = [];
            IGCMS.initCfg(Config, cfg);
            Config.navig = document.querySelector(cfg.selectSelector);
            if (Config.navig === null) {
              return
            }
            var options = Config.navig.getElementsByTagName("option");
            for (var j = 0; j < options.length; j++) {
              var val = options[j].textContent;
              var classes = options[j].className;
              if (val.indexOf("#user") !== -1) {
                classes += " user";
              }
              if (val.indexOf("#disabled") !== -1) {
                classes += " disabled";
              }
              Config.files.push({
                path: (options[j].value ? options[j].value : options[j].textContent),
                priority: 0,
                val: val,
                defaultVal: val,
                class: classes
              })
            }
            if (Config.sendFormText) {
              Config.files.push({
                path: "invalid path",
                priority: 10,
                val: Config.sendFormText,
                defaultVal: Config.sendFormText,
                class: Config.sendFormClass
              })
            }
            if (!inited) {
              inited = true;
              var css = '/* completable.js */'
                + GlobalConfig.inputClass + ' { width: 35em; max-width: 100%; }'
                + ' ul.navigList { display: block; overflow-y: auto; position: absolute; background: white; z-index: 100; /*width: 25em; max-width: 100%;*/ margin: 0; padding: 0; list-style: none; box-shadow: 0.2em 0.2em 0.2em #555; }'
                + ' ul.navigList li { margin: 0; padding: 0.25em 0.5em; }'
                + ' ul.navigList li:hover { background: #eee; cursor: pointer; }'
                + ' ul.navigList li.active { background: #ddd; }'
                + ' ul.navigList li.user { background: #E7F6FE; }'
                + ' ul.navigList li.disabled { background: #ccc; }'
                + ' ul.navigList li.user.active, ul.navigList li.user:hover { background: #D4E5EE; }'
                + ' ul.navigList li.disabled.active, ul.navigList li.disabled:hover { background: #bbb; }';
              IGCMS.appendStyle(css);
            }
            initStructure();
            window.setTimeout(function () {
              initEvents();
            }, 500);
            setCurrentFile();
          },
          openNavig: function () {
            Config.navig.focus();
            inputText(null);
          },
          clearSelection: clearSelection
        }
      };

      CompletableIniter = function () {
        return {
          init: function (cfg) {
            instance = new Completable
            instance.init(cfg)
          }
        }
      }

      var inited = false;
      IGCMS.Completable = new CompletableIniter;
    }); });
})(window);

(function(win) {

  require("IGCMS", function () {

    var Completable = function () {

      var
        Config = {},
        open = false,
        active = -1,
        textNavigValue = "",
        list = null,
        key = null,

        getWinHeight = function () {
          var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];
          //x = w.innerWidth || e.clientWidth || g.clientWidth
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
          if (Config.navig.tabIndex) textNavig.tabIndex = Config.navig.tabIndex;
          textNavig.name = Config.navig.name;
          textNavig.placeholder = "Co Vás zajímá?"
          textNavig.type = "text";
          textNavig.className = "completable-input";
          Config.navig.parentNode.replaceChild(textNavig, Config.navig);
          Config.navig = textNavig;
          Config.navig.parentNode.appendChild(list);
          updateSize();
        },
        initEvents = function () {
          Config.navig.addEventListener("input", inputText, false);
          Config.navig.addEventListener("blur", closeNavig, false);
          Config.navig.addEventListener("click", openNavig, false);
          Config.navig.form.addEventListener("submit", fillVal, false);
          win.addEventListener("resize", updateSize, false);
          win.addEventListener("scroll", updateSize, false);
          Config.navig.addEventListener("keydown", processKey, false);
        },
        fillVal = function (event) {
          if (!open && Config.navig.value == "") {
            Config.navig.focus();
            openNavig();
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
          updateSize();
          if (list.classList.contains("active")) inputText(null);
          else list.classList.add("active");
        },
        closeNavig = function () {
          list.innerHTML = "";
          textNavigValue = "";
          open = false;
          active = -1;
          list.classList.remove("active");
        },
        processKey = function (e) {
          switch (e.keyCode) {
            case 27: //esc
              Config.navig.value = textNavigValue;
              closeNavig();
              break;
            case 38: //up
              if (typeof list.childNodes[active] !== "undefined")
                list.childNodes[active].classList.remove("active");
              if (active == -1) active = list.childNodes.length;
              if (--active <= -1) {
                Config.navig.value = textNavigValue;
                e.preventDefault();
                return;
              }
              list.childNodes[active].classList.add("active");
              list.childNodes[active].scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
              if (!list.childNodes[active].classList.contains("google")) {
                Config.navig.value = list.childNodes[active].dataset.val;
              } else {
                Config.navig.value = textNavigValue
              }
              e.preventDefault();
              break;
            case 40: //down
              if (!open) {
                inputText(null);
              }
              if (typeof list.childNodes[active] !== "undefined")
                list.childNodes[active].classList.remove("active");
              if (active == list.childNodes.length) active = -1;
              if (++active >= list.childNodes.length) {
                Config.navig.value = textNavigValue;
                e.preventDefault();
                return;
              }
              list.childNodes[active].classList.add("active");
              list.childNodes[active].scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
              if (!list.childNodes[active].classList.contains("google")) {
                Config.navig.value = list.childNodes[active].dataset.val;
              } else {
                Config.navig.value = textNavigValue
              }
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
          var navig = e === null ? Config.navig : e.target || e.srcElement;
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
          } else if (navig.setSelectionRange) {
            navig.focus();
            navig.setSelectionRange(start, end);
          } else if (typeof navig.selectionStart != 'undefined') {
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
          if (arr.length < 2) return arr;
          var middle = parseInt(arr.length / 2);
          var left = arr.slice(0, middle);
          var right = arr.slice(middle, arr.length);
          return merge(fileMergeSort(left), fileMergeSort(right));
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
          while (left.length) result.push(left.shift());
          while (right.length) result.push(right.shift());
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
            if (arr[i].class == "google") {
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
            if (pattern && !f.val.match(pattern)) return;
            var r = {};
            var priority = 3;
            if (pattern) {
              if (f.path.replace(/^.*[\\\/]/, '').indexOf(value) === 0) priority = 1;
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
            r.user = f.user;
            r.disable = f.disable;
            r.class = f.class;
            return r;
          } catch (e) {
          }
        },
        update = function (fs) {
          var first = true;
          for (var i = 0; i < fs.length; i++) {
            if (first 
              && Config.navig.value.length
              && key !== 8
              && fs[i].defaultVal.toLowerCase().indexOf(Config.navig.value.toLowerCase()) == 0
              && fs[i].class != "google"
              ) { // 8 is backspace
              var start = Config.navig.value.length;
              var end = fs[i].defaultVal.length;
              Config.navig.value = fs[i].defaultVal;
              createSelection(Config.navig, start, end);
              first = false;
            }
            var li = document.createElement("li");
            li.innerHTML = fs[i].val;
            if (fs[i].user) li.classList.add("user");
            if (fs[i].disable) li.classList.add("disabled");
            li.className = fs[i].class;
            li.dataset.path = fs[i].path;
            li.dataset.val = fs[i].defaultVal;
            li.onmouseover = (function () {
              var localValue = fs[i].defaultVal;
              var navig = Config.navig;
              if (fs[i].class == "google") {
                localValue = false;
              }
              return function () {
                if (localValue !== false) {
                  navig.value = localValue;
                } else {
                  IGCMS.Completable.clearSelection(navig);
                }
              }
            })();
            li.onmousedown = (function () {
              var localValue = fs[i].path;
              var navig = Config.navig;
              var localList = list
              if (fs[i].class == "google") {
                localValue = false;
              }
              return function () {
                if (localValue !== false) {
                  navig.value = localValue;
                } else {
                  IGCMS.Completable.clearSelection(navig);
                }
                localList.onmouseout = null;
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
          Config.files = {};
          Config.navig = null;
          IGCMS.initCfg(Config, cfg);
          if (Config.navig === null) throw "Config.navig is null";
          initStructure();
          initEvents();
        },
        openNavig: function () {
          Config.navig.focus();
          inputText(null);
        },
        clearSelection: clearSelection
      }
    };


    var found = false;
    var selects = document.getElementsByTagName("select");
    var toInit = [];
    for (i = 0; i < selects.length; i++) {
      var s = selects[i];
      if (!s.classList.contains("completable")) continue;
      found = true;
      var options = s.getElementsByTagName("option");
      var files = [];
      for (var j = 0; j < options.length; j++) {
        var val = options[j].textContent;
        files.push({
          path: (options[j].value ? options[j].value : options[j].textContent),
          priority: 0,
          val: val,
          defaultVal: val,
          user: val.indexOf("#user") !== -1,
          disable: val.indexOf("#disabled") !== -1,
          class: options[j].className
        })
      }
      files.push({
        path: "",
        priority: 10,
        val: "Hledat na Google",
        defaultVal: "Hledat na Google",
        user: false,
        disable: false,
        class: "google"
      })
      toInit.push({files: files, navig: s});
    }

    if (found) {
      var css = '/* completable.js */'
        + ' .completable-input { width: 35em; max-width: 100%; }'
        + ' ul.navigList {overflow-y: auto; position: absolute; background: white; z-index: 100; /*width: 25em; max-width: 100%;*/ margin: 0; padding: 0; list-style: none; box-shadow: 0.2em 0.2em 0.2em #555; }'
        + ' ul.navigList li { margin: 0; padding: 0.25em 0.5em; }'
        + ' ul.navigList li:hover { background: #eee; cursor: pointer; }'
        + ' ul.navigList li.active { background: #ddd; }'
        + ' ul.navigList li.user { background: #E7F6FE; }'
        + ' ul.navigList li.disabled { background: #ccc; }'
        + ' ul.navigList li.user.active, ul.navigList li.user:hover { background: #D4E5EE; }'
        + ' ul.navigList li.disabled.active, ul.navigList li.disabled:hover { background: #bbb; }';
      IGCMS.appendStyle(css);
    }

    var completable = null;

    for (var i = 0; i < toInit.length; i++) {
      completable = new Completable();
      completable.init(toInit[i]);
    }

    IGCMS.Completable = completable;
  })
})(window);

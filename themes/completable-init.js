(function () {
  require("IGCMS.Completable", function () {
    document.body.innerHTML += '<span data-fa-symbol="tag" class="fas fa-tag"></span><span data-fa-symbol="doc" class="far fa-file-alt"></span>'
    IGCMS.Completable.init({
      selectSelector: '#header select.completable',
      placeholder: "Co Vás zajímá? (Ctrl+Shift+F)",
      defaultChangeText: "Vyhledat",
      filterSelector: ".filter",
      sendFormText: "Hledat na Google",
      sendFormClass: "google",
      keyboardShortcut: "ctrl+shift+f",
      label: "",
      submitOnClick: true,
      decorateListItem: function (itemValue) {
        return itemValue
          .replace(/(#.*)/, "<span>$1</span>")
          .replace(/(.*#stitky.*)/, "<svg class='svg-inline--fa fa-w-14'><use xlink:href='#tag'></use></svg>$1")
          .replace(/(.*#clanky.*)/, "<svg class='svg-inline--fa fa-w-14'><use xlink:href='#doc'></use></svg>$1")
      },
      undecorateListItem: function (itemValue) {
        return itemValue.replace(/<\/?[^>]+(>|$)/g, "")
      },
    })
  })
})()



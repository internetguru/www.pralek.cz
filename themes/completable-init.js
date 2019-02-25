(function() {
  require("IGCMS.Completable", function() {
    IGCMS.Completable.init({
      selectSelector: '#header select.completable',
      placeholder: "Co Vás zajímá? (Ctrl+Shift+F)",
      defaultChangeText: "Vyhledat",
      filterSelector: ".filter",
      sendFormText: "Hledat na Google",
      sendFormClass: "google",
      keyboardShortcut: "ctrl+shift+f"
    })
  })
})()

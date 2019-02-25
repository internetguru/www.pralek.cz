(function() {
  require("IGCMS.Completable", function() {
    IGCMS.Completable.init({
      selectSelector: '#header select.completable',
      placeholder: "Co Vás zajímá? (Ctrl+Shift+F)",
      defaultChangeText: "Vybrat jinou",
      filterSelector: ".filter",
      sendFormText: "Hledat na Google",
      sendFormClass: "google",
      keyboardShortcut: "ctrl+shift+f"
    })
  })
})()

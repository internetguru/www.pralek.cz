(function() {
  require("IGCMS.Completable", function() {
    IGCMS.Completable.init({
      selectSelector: 'select[name="Admin"]',
      placeholder: "Vybrat soubor",
      sendFormText: "Odeslat formulář",
      sendFormClass: "sendform",
      keyboardShortcut: "ctrl+p"
    })
    IGCMS.Completable.init({
      selector: '#header select.completable',
      placeholder: "Co Vás zajímá? (Ctrl+Shift+F)",
      defaultChangeText: "Změnit",
      filterSelector: ".filter",
      sendFormText: "Hledat na Google",
      sendFormClass: "google",
      keyboardshortcut: "ctrl+shif+s"
    })
  })
})()

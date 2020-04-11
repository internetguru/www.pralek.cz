require("IGCMS.Copyable", () => {
  window.setTimeout(() => {
    require("IGCMS.Hideable", () => {
      IGCMS.Copyable.init({
        selectTitle: "Zkopírovat odkaz"
      })
    })
  }, 300)
})
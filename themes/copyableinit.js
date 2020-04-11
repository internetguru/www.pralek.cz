require("IGCMS.Copyable", () => {
  windown.setTimeout(() => {
    require("IGCMS.Hideable", () => {
      IGCMS.Copyable.init({
        selectTitle: "Zkopírovat odkaz"
      })
    })
  }, 300)
})
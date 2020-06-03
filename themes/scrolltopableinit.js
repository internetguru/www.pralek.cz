reqire("IGCMS", () => {
  IGCMS.ready(() => {
    require("IGCMS.Scrolltopable", () => {
      IGCMS.Scrolltopable.init({
        text: "▲"
      })
    })
  })
})
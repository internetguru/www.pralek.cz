require("IGCMS.Moreable", function () {
  IGCMS.Moreable.init({
    parent: "div.part.clanky > .list.multiple > div",
    moreText: "Další články kategorie",
    leftText: "zbývá %s"
  })
  IGCMS.Moreable.init({
    parent: "div.part.odkazy > .list.multiple > div",
    moreText: "Další související články",
    leftText: "zbývá %s"
  })
})
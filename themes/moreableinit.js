require("IGCMS.Moreable", function () {
  IGCMS.Moreable.init({
    parent: ".part:last-child > .list.multiple:last-child > div",
    moreText: "Zobrazit další články",
    leftText: "zbývají %s"
  })
})
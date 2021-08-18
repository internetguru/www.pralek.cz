require("IGCMS.Moreable", function () {
  IGCMS.Moreable.init({
    parent: "div.part.clanky > .list-wrapper--multiple > div",
    moreText: "Další články",
    leftText: "zbývá %s",
    countedChildrenSelector: ".clanek"
  })
  IGCMS.Moreable.init({
    parent: "div.part.odkazy > .list-wrapper--multiple > div",
    moreText: "Další související články",
    leftText: "zbývá %s"
  })
  IGCMS.Moreable.init({
    parent: ".meta > span",
    moreText: "Další",
    leftText: "",
    displayStep: 4
  })
})
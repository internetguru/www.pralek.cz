FontAwesomeConfig = {
  observeMutations: true
};

(() => {
    let icons = document.querySelectorAll('*[class*="fa-"]')
    let iconsCache = {}
    icons.forEach((icon) => {
      const name = icon.className.match(/fa-([^ ]+)/)[1]
      iconsCache.name = icon.className
      const svg = document.createElement("svg")
      svg.innerHTML = `<use xlink:href="#${name}"></use>`
      icon.parentNode.replaceChild(svg, icon)
    })
    Object.entries(iconsCache).forEach(([name, cls]) => {
      let symbol = document.createElement("span")
      symbol.className = cls
      symbol.setAttribute("data-fa-symbol", name)
      document.body.appendChild(symbol)
    })
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.setAttribute("data-search-pseudo-elements", "")
    script.src = "https://kit.fontawesome.com/b0c4047774.js"
    document.head.appendChild(script)
})()

FontAwesomeConfig = {
  observeMutations: true
};

(() => {
  require("IGCMS", () => { IGCMS.ready(() => {
    let icons = document.querySelectorAll('*[class*="fa-"]')
    for (let i = 0; i < icons.length; i++) {
      icons[i].innerHTML = ""
    }
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "/themes/lib/all.min.js"
    document.head.appendChild(script)
    /*
    let icons = document.querySelectorAll('*[class*="fa-"]')
    let iconsCache = []
    icons.forEach((icon) => {
      const name = icon.className.match(/fa-(?!fw)([^ ]+)/)[1]
      iconsCache[name] = icon.className
      const svg = document.createElement("svg")
      svg.className = "fa-symbol"
      const useSVG = document.createElementNS('http://www.w3.org/2000/svg', 'use')      
      useSVG.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href','#' + name);
      svg.appendChild(useSVG)
      icon.parentNode.replaceChild(svg, icon)
      svg.parentNode.innerHTML += ''
    })
    for (let name in iconsCache) {
      document.body.insertAdjacentHTML(
        'beforeend', 
        '<span data-fa-symbol="' + name + '" class="' + iconsCache[name] + '">'
      )
    }
    */
  })})
})()

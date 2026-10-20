FontAwesomeConfig={observeMutations:!0},function(){require("IGCMS",function(){IGCMS.ready(function(){for(var a=document.querySelectorAll("*[class*=\"fa-\"]"),b=0;b<a.length;b++)for(;a[b].firstChild;)a[b].firstChild.remove();/*
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
    */var c=document.createElement("script");c.type="text/javascript",c.src="/themes/lib/all.min.1.js",document.head.appendChild(c)})})}();

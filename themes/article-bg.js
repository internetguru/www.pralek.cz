(function () {
  
  require("IGCMS", function () {
    var general = document.body.getAttribute("data-image").replace("/preview/", "/")
    if (!general) {
      return;
    }
    IGCMS.appendStyle(".agregator .hdesc--top:after { background: url('" + general + "') 50% 33% / cover !important; }")
  })
  
})()
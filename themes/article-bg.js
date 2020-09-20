(function () {
  
  require("IGCMS", function () {
    var dataImg = document.body.getAttribute("data-image")
    if (!dataImg) {
      return
    }
    var general = dataImg.replace("/preview/", "/")
    if (!general) {
      return;
    }
    IGCMS.appendStyle(".agregator #content .hdesc--top + div:before { background: url('" + general + "') 50% 33% / cover !important; }")
  })
  
})()
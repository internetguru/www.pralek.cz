(function () {
  
  require("IGCMS", function () {
    var general = document.body.getAttribute("data-image").replace("/preview/", "/")
    if (!general) {
      return;
    }
    IGCMS.appendStyle(".agregator #content > .section:before { background: url('" + general + "') 50% 33% / cover !important; }")
  })
  
})()
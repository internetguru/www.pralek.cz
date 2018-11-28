require("WebFont", function() {
  WebFont.load({
    google: {
      families: ['Roboto:400,300,400italic,700:latin-ext',
                 'Noto Sans:400,400italic,700:latin-ext'],
//     families: ['Roboto'],
//     urls: ['/lib/roboto/roboto.css'],
    },
    active: function () {
      sessionStorage.fonts = true
    },
  })
})


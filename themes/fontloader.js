require("WebFont", function() {
  WebFont.load({
    google: {
      families: ['Cabin:400,400italic,500,700:latin-ext',
                 'Rubik:400,400italic,500,700:latin-ext',
                 'Material Icons'],
      urls: ['https://fonts.googleapis.com/icon?family=Material+Icons']
//     families: ['Roboto'],
//     urls: ['/lib/roboto/roboto.css'],
    },
    active: function () {
      sessionStorage.fonts = true
    },
  })
})


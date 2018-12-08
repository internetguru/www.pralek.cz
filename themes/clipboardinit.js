require("ClipboardJS", function () {
  var clipboard = new ClipboardJS('.share');
  clipboard.on('success', function(event) {
    event.preventDefault()
    return false
  });
})
(function(win){
  
  require("IGCMS", function() {

    var yesText = "Srozumitelně"
    var noText  = "Nesrozumitelně"
    var questionClass = "otazky"
    var selectedClass = "selected"

    var answers = []

    function init () {
      var lists = document.getElementsByTagName("ol")
      for (var i = 0; i < lists.length; i++) {
        if (!lists[i].classList.contains(questionClass)) {
          continue
        }
        var items = lists[i].getElementsByTagName("li")
        for (var j = 0; j < items.length; j++) {
          addButtons(items[j])
        }
      }
      win.addEventListener("beforeunload", sendEvents, false);
    }

    function addButtons (question) {
      var yesButton = document.createElement("button")
      yesButton.addEventListener("click", actionYes.bind(question.innerHTML), false)
      var noButton = document.createElement("button")
      noButton.addEventListener("click", actionNo.bind(question.innerHTML), false)
      var span = document.createElement("span")
      question.appendChild(span)
      span.appendChild(yesButton)
      span.appendChild(noButton)
      yesButton.innerHTML = yesText
      noButton.innerHTML = noText
    }

    function actionYes (event) {
      action(event, this, 1)
    }

    function actionNo (event) {
      action(event, this, 0)
    }

    function action (event, question, value) {
      var button = event.target
      if (button.classList.contains(selectedClass)) {
        delete answers[question]
        actionAfter(button)
        return
      }
      if (answers[question] !== undefined) {
        var siblingButton = answers[question] === 0 
          ? button.nextElementSibling
          : button.previousElementSibling
        siblingButton.classList.toggle(selectedClass)
      }
      answers[question] = value
      actionAfter(button)
    }

    function actionAfter (button) {
      button.classList.toggle(selectedClass)
      button.blur()
    }

    function sendEvents (event) {
      require("IGCMS.Eventable", function () {
        for (var question in answers) {
          IGCMS.Eventable.sendGAEvent('dotaznik', 'otazky', question, answers[question])
        }
      })
    }

    init()

  })
})(window);
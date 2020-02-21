(function(win){
  
  require("IGCMS", function() {

    var yesText = "<span class='fas fa-check'></span>Srozumitelně"
    var noText  = "<span class='fas fa-times'></span>Nesrozumitelně"
    var questionClass = "otazky"
    var selectedClass = "selected"

    var answers = []
    var statusBar = null
    var statusBarTimer = null
    var statusBarHideTimer = null

    function init () {
      var list = document.querySelector("ol." + questionClass)
      if (!list) {
        return
      }
      var items = list.getElementsByTagName("li")
      for (var j = 0; j < items.length; j++) {
        addButtons(items[j])
      }
      addStatusBar(list)
      win.addEventListener("beforeunload", sendEvents, false);
    }

    function addStatusBar (list) {
      statusBar = document.createElement("li")
      statusBar.innerHTML = "Změny uloženy"
      statusBar.style.visibility = "hidden"
      statusBar.style.listStyle = "none"
      list.appendChild(statusBar)
    }

    function addButtons (question) {
      var yesButton = document.createElement("button")
      var eventData = {
        question: question.innerHTML
      }
      yesButton.addEventListener("click", actionYes.bind(eventData), false)
      var noButton = document.createElement("button")
      noButton.addEventListener("click", actionNo.bind(eventData), false)
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

    function action (event, eventData, value) {
      var question = eventData.question
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
      win.clearTimeout(statusBarTimer)
      win.clearTimeout(statusBarHideTimer)
      statusBar.style.visibility = "hidden"
      statusBarTimer = win.setTimeout(function () {
        statusBar.style.visibility = ""
        statusBarHideTimer = win.setTimeout(function () {
          statusBar.style.visibility = "hidden"
        }, 4000)
      }, 2000)
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


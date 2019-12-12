(function() {
  require("IGCMS", function() { require("IGCMS.Eventable", function() {
    
    var Feedback = function () {
      
      var
      wrapper = null,
      origContent = null,
      feedbackElm = null,
      Config = {
        elmSelector: null
      },
      getElm = function (type, text, className) {
        var elm = document.createElement(type)
        if (text) {
          elm.innerText = text
        }
        if (className) {
          elm.className = className
        }
        return elm
      },
      validateInput = function (inputElm, optional, pattern) {
        if (typeof optional == "undefined") {
          optional = false
        }
        if (optional && inputElm.value == "") {
          return true
        }
        if (!pattern && inputElm.checkValidity()) {
          return true
        }
        if (pattern) {
          var regexp = new RegExp("^" + pattern + "$")
          if (regexp.test(inputElm.value)) {
            return true
          }
        }
        inputElm.reportValidity()
        inputElm.classList.add("feedback-invalid-input")
        inputElm.focus()
        return false
      }
      processYes = function (event) {
//         var question = "Co byste vzkázali autorovi nebo ostatním čtenářům? Jak byl pro Vás článek nebo celý Pralék přínosný?"
        var question = "Co byste vzkázali autorovi nebo ostatním čtenářům?"
        var emailDesc = "Nejmileší komentáře zveřejníme."
        initStep2("yes", question, emailDesc)
      },
      processNo = function (event) {
        var question = " Co Vám ve článku nebo na Praléku obecně chybí?"
        initStep2("no", question, "")        
      },
      initStep2 = function (beneficialText, question, emailDesc) {
        var beneficial = beneficialText == "yes" ? 1 : 0
        IGCMS.Eventable.sendGAEvent(
          "feedback",
          "beneficial",
          beneficialText,
          beneficial
        )
        wrapper.innerHTML = ""
        
        var questionDt = getElm("dt")
        var questionLabel = getElm("label", question)
        var questionInputDd = getElm("dd")
        var questionInput = getElm("textarea")
        
        questionLabel.setAttribute("for", "feedback-text")
        questionInput.oninput = function () {
          questionInput.setCustomValidity("")
          questionInput.reportValidity()
        }
        questionDt.appendChild(questionLabel)
        questionInput.id = "feedback-text"
        questionInputDd.appendChild(questionInput)
        wrapper.appendChild(questionDt)
        wrapper.appendChild(questionInputDd)

        var emailDt = getElm("dt")
        var emailLabel = getElm("label", "Váš e-mail (nepovinné)")
        var emailInputDd = getElm("dd")
        var emailInput = getElm("input")
        
        emailLabel.setAttribute("for", "feedback-email")
        emailDt.appendChild(emailLabel)
        emailInput.type = "email"
        emailInput.name = "email"
        emailInput.id = "feedback-email"
        emailInputDd.appendChild(emailInput)
        wrapper.appendChild(emailDt)
        wrapper.appendChild(emailInputDd)
        if (emailDesc) {
          var emailInputDescDd = getElm("dd", emailDesc)
          wrapper.appendChild(emailInputDescDd)
        }
        
        var donationText = "Víte, že Pralék je nevýdělečnou aktivitou autora? Jakýmkoli finančním příspěvkem podpoříte rozvoj Praléku."
        if (!beneficial) {
          donationText = "Pomohla by veřejná diskuze, osobní konzultace či jiné rozšíření Praléku?"
        }
        var nextStepDt = getElm("dt", "Další krok")
        var nextStepDd = getElm("dd")
        var nextStepNext = getElm("button", "Odeslat")
        var nextStepSkip = getElm("button", "Přeskočit")

        nextStepDt.className = "hide"
        nextStepDd.appendChild(nextStepNext)
        nextStepDd.appendChild(nextStepSkip)
        nextStepNext.addEventListener("click", function () {
          if (!validateInput(questionInput, false, ".*\\w.{8,}\\w.*")) {
            questionInput.setCustomValidity("Položka je povinná")
            questionInput.reportValidity()
            return
          }
          if (!validateInput(emailInput, true)) {
            return
          }
          initStep3(donationText, questionInput.value, emailInput.value, 1, beneficial)
        }, false)
        nextStepSkip.addEventListener("click", function () {
          if (emailInput.value || questionInput.value) {
            if (!confirm("Formulář má vyplněná pole, jste si jistí, že chcete přeskočit odeslání odpovědi?")) {
              return
            }
          }
          initStep3(donationText, questionInput.value, emailInput.value, 0, beneficial)
        }, false)
        wrapper.appendChild(nextStepDt)
        wrapper.appendChild(nextStepDd)
      },
      initStep3 = function (donationText, answer, email, next, beneficial) {
        var feedback = answer
        if (!next) {
          feedback += "[skipped]"
        }
        if (email) {
          feedback = answer + "\nEmail: " + email
        }
        feedback += "\nBeneficial: " + beneficial
        IGCMS.Eventable.sendGAEvent("feedback", "message", feedback, next)
        wrapper.parentNode.removeChild(wrapper)
        for (var i = 0; i < feedbackElm.children.length; i++) {
          feedbackElm.children.item(i).style.display = ""
        }
        feedbackElm.getElementsByTagName("p")[0].innerText = donationText
      },
      init = function () {
        feedbackElm = document.querySelector(Config.elmSelector)
        if (!feedbackElm) {
          return
        }
        for (var i = 0; i < feedbackElm.children.length; i++) {
          feedbackElm.children.item(i).style.display = "none"
        }
        origContent = feedbackElm.innerHTML

        wrapper = getElm("dl")
        var dt = getElm("dt", "Byl pro Vás tento článek přínosný?")
        var dd = getElm("dd")
        wrapper.appendChild(dt)
        wrapper.appendChild(dd)

        var yesButton = getElm("button", "ano", "feedback-yes")
        var noButton = getElm("button", "ne", "feedback-no")
        dd.appendChild(yesButton)
        dd.appendChild(noButton)
        yesButton.addEventListener("click", processYes, false)
        noButton.addEventListener("click", processNo, false)

        feedbackElm.appendChild(wrapper)
      }

      return {
        init: function (cfg) {
          IGCMS.initCfg(Config, cfg)
          init()
        }
      }
    }

    var feedback = new Feedback()
    feedback.init({
      elmSelector: "#feedback"
    })

  }) })
})()

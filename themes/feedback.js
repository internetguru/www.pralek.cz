(function() {
  require("IGCMS", function() { require("IGCMS.Eventable", function() {
    
    var Feedback = function () {
      
      var
      wrapper = null,
      origContent = null,
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
      validateInput = function (inputElm, optional) {
        if (typeof optional == "undefined") {
          optional = false
        }
        if (optional && inputElm.value == "") {
          return true
        }
        if (inputElm.value != "" && inputElm.checkValidity()) {
          return true
        }
        inputElm.reportValidity()
        inputElm.classList.add("feedback-invalid-input")
        inputElm.focus()
        return false
      }
      processYes = function (event) {
        var question = "Co byste vzkázali autorovi nebo ostatním čtenářům? Jak byl pro Vás článek nebo celý Pralék přínosný?"
        var placeholder = "* Článek pomohl mně nebo mému blízkému s uzdravením.\n* Jako zdravotníkovi mi článek pomohl pochopit problematiku.\n* Na Pralék se obracím, když…"
        var emailDesc = "Autoři nejlepších komentářů obdrží nabídku zveřejnění komentářů na webu."
        initStep2("yes", question, placeholder, emailDesc)
      },
      processNo = function (event) {
        var question = " Co Vám ve článku nebo na Praléku obecně chybí?"
        var placeholder = "* Článek je příliš neodborný a obshuje málo zdrojů.\n* Jsem v rozpacích, neboť mi můj lékař doporučil pravý opak.\n* Problematika mě zajímá z jiného či rozšířeného pohledu"
        initStep2("no", question, placeholder, "")        
      },
      initStep2 = function (type, question, placeholder, emailDesc) {
        IGCMS.Eventable.sendGAEvent(
          "feedback",
          "value",
          type == "yes" ? 1 : 0
        )
        wrapper.innerHTML = ""
        
        var questionDt = getElm("dt")
        var questionLabel = getElm("label", question)
        var questionInputDd = getElm("dd")
        var questionInput = getElm("textarea")
        
        questionLabel.setAttribute("for", "feedback-text")
        questionInput.setAttribute("pattern", "\w{3,}")
        questionInput.setCustomValidity("Položka je povinná")
        questionDt.appendChild(questionLabel)
        questionInput.id = "feedback-text"
        questionInput.setAttribute("placeholder", placeholder)
        questionInputDd.appendChild(questionInput)
        wrapper.appendChild(questionDt)
        wrapper.appendChild(questionInputDd)

        var emailDt = getElm("dt")
        var emailLabel = getElm("label", "Email (nepovinné)")
        var emailInputDd = getElm("dd")
        var emailInput = getElm("input")
        
        emailLabel.setAttribute("for", "feedback-email")
        emailDt.appendChild(emailLabel)
        emailInput.type = "email"
        emailInput.id = "feedback-email"
        emailInputDd.appendChild(emailInput)
        wrapper.appendChild(emailDt)
        wrapper.appendChild(emailInputDd)
        if (emailDesc) {
          var emailInputDescDd = getElm("dd", emailDesc)
          wrapper.appendChild(emailInputDescDd)
        }
        
        var donationText = "Víte, že Pralék je nevýdělečnou aktivitou autora? Jakýmkoli finančním příspěvkem podpoříte rozvoj Praléku."
        if (type == "no") {
          donationText = "Pomohla by veřejná diskuze, osobní konzultace či jiné rozšíření Praléku?"
        }
        var nextStepDt = getElm("dt", "Další krok")
        var nextStepDd = getElm("dd")
        var nextStepNext = getElm("button", "Další")
        var nextStepSkip = getElm("button", "Přeskočit")

        nextStepDt.className = "hide"
        nextStepDd.appendChild(nextStepNext)
        nextStepDd.appendChild(nextStepSkip)
        nextStepNext.addEventListener("click", function () {
          if (!validateInput(questionInput)) {
            return
          }
          if (!validateInput(emailInput, true)) {
            return
          }
          initStep3(donationText, questionInput.value, emailInput.value)
        }, false)
        nextStepSkip.addEventListener("click", function () {
          if (emailInput.value || questionInput.value) {
            if (!confirm("Formulář má vyplněná pole, jste si jistí, že chcete přeskočit odeslání odpovědi?")) {
              return
            }
          }
          initStep3(donationText)
        }, false)
        wrapper.appendChild(nextStepDt)
        wrapper.appendChild(nextStepDd)
      },
      initStep3 = function (donationText, answer, email) {
        if (answer) {
          IGCMS.Eventable.sendGAEvent("feedback", "answer", answer)
        }
        if (email) {
          IGCMS.Eventable.sendGAEvent("feedback", "email", email)
        }
        wrapper.innerHTML = origContent
        wrapper.getElementsByTagName("p")[0].innerText = donationText
      },
      init = function () {
        var feedbackElm = document.querySelector(Config.elmSelector)
        if (!feedbackElm) {
          throw "Feedback element " + elmSelector + " not found"
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

        feedbackElm.innerHTML = ""
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

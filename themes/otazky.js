(function(win){

  var lists  = document.getElementsByTagName("ol"),
    otazky = [],
    yes    = "Srozumitelně",
    no     = "Nesrozumitelně",
    debug  = true;

  function init() {
    for(var i = 0; i < lists.length; i++) {
      if(lists[i].classList.contains("otazky")) otazky.push(lists[i]);
    }

    for(var i = 0; i < otazky.length; i++) {
      var items = otazky[i].getElementsByTagName("li");
      for(var j = 0; j < items.length; j++) {
        var yesButton = document.createElement("button");
        yesButton.addEventListener("click", actionYes.bind(items[j].innerHTML), false);
        var noButton = document.createElement("button");
        noButton.addEventListener("click", actionNo.bind(items[j].innerHTML), false);
        var span = document.createElement("span");
        items[j].appendChild(span);
        span.appendChild(yesButton);
        span.appendChild(noButton);
        yesButton.innerHTML = yes;
        noButton.innerHTML = no;
      }
    }
  }

  function actionYes(e) { action(e, this, 1); }
  function actionNo(e) { action(e, this, 0); }
  
  function action(e, otazka, value) {
    var button = e.target;
    if(debug) {
      alert("otazka: '" + otazka + "', hodnota: " + value + "");
    } else {
      ga('send', {
          'hitType': 'event',
          'eventCategory': 'dotaznik',
          'eventAction': 'otazky',
          'eventLabel': otazka,
          'eventValue': value
        });
    }
    e.target.classList.add("selected");
    var childs = e.target.parentNode.childNodes;
    for(var i = 0; i < childs.length; i++) {
      if(childs[i].nodeName.toLowerCase() == "button") childs[i].disabled = "disabled";
    }
  }

  if(typeof ga == "function" || debug) init();
  
})(window);
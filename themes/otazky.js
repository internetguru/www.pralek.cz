(function(win){
  
  require("IGCMS", function() {

    var yes = "Srozumitelně";
    var no  = "Nesrozumitelně";

    function init() {
      var lists = document.getElementsByTagName("ol");
      for(var i = 0; i < lists.length; i++) {
        if(!lists[i].classList.contains("otazky")) continue;
        var items = lists[i].getElementsByTagName("li");
        for(var j = 0; j < items.length; j++) {
          addButtons(items[j]);
        }
      }
    }

    function addButtons(e) {
      var yesButton = document.createElement("button");
      yesButton.addEventListener("click", actionYes.bind(e.innerHTML), false);
      var noButton = document.createElement("button");
      noButton.addEventListener("click", actionNo.bind(e.innerHTML), false);
      var span = document.createElement("span");
      e.appendChild(span);
      span.appendChild(yesButton);
      span.appendChild(noButton);
      yesButton.innerHTML = yes;
      noButton.innerHTML = no;
    }

    function actionYes(e) { action(e, this, 1); }

    function actionNo(e) { action(e, this, 0); }

    function action(e, otazka, value) {
      var button = e.target;
      require("IGCMS.Eventable", function() {
        IGCMS.Eventable.sendGAEvent('dotaznik', 'otazky', otazka, value)        
      })
      e.target.classList.add("selected");
      var nodes = e.target.parentNode.childNodes;
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[i].nodeName.toLowerCase() != "button") continue;
        nodes[i].disabled = "disabled";
      }
    }

    init();

  })
})(window);
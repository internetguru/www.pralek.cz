require("IGCMS.Eventable", function () {
  IGCMS.Eventable.init({
    debug: typeof ga === "function"
  });
})
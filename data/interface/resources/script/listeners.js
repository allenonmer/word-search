var listeners = {
  "return": function () {
    const targets = document.body.getElementsByTagName("script");
    const script = targets[targets.length - 1];
    if (script) script.remove();
    /*  */
    config.button.overlay.app.className = "contentWrapper";
    config.button.overlay.start.className += " show";
    window.clearInterval(config.interval.timer);
  },
  "category": function (e) {
    if (e) {
      if (e.target) {
        const category = e.target.getAttribute("data-category");
        if (category) {
          const name = config.query.category(category);
          if (name) {
            config.button.overlay.category.className = "contentWrapper";
            config.button.overlay.app.className += " show";
            config.button.loader.className += " show";
            /*  */
            const script = document.createElement("script");
            script.src = "resources/collection/" + name + ".js";
            /*  */
            script.onload = function () {
              config.button.number.textContent = config.global.engine.numberofwords();
              config.info.timer.textContent = '0';
              config.reset.score.data();
              config.initialize.grid();
              /*  */
              config.timer();
              config.global.engine.category = parseInt(category);
              config.button.loader.className = "whiteWrapper";
              config.global.engine.investigateconditions();
              config.fill.word.list.side();
            };
            /*  */
            document.body.appendChild(script);
          }
        }
      }
    }
  },
  "document": function (e) {
    const command = e.target.getAttribute("data-command");
    if (command) {
      switch (command) {
        case "config.button.restart":
          config.restart.game();
        break;
        case "config.button.words":
          const show = config.element.aside.className === "show";
          config.element.aside.className = show ? "hide" : "show";
        break;
        case "config.button.continue":
          config.timer();
          config.button.overlay.pause.className = "whiteWrapper";
        break;
        case "config.button.action.best":
          config.button.overlay.best.className += " show";
          config.button.overlay.start.className = "contentWrapper";
        break;
        case "config.button.start":
          config.button.difficulty.className += " show";
          config.button.overlay.start.className = "contentWrapper";
        break;
        case "config.button.confirm":
          config.button.overlay.start.className += " show";
          config.button.overlay.best.className = "contentWrapper";
        break;
        case "config.button.pause":
          window.clearInterval(config.interval.timer);
          config.button.overlay.pause.className += " show";
        break;
        case "config.button.action.finish":
          config.button.finish.className = "whiteWrapper";
          config.button.overlay.start.className += " show";
          config.button.overlay.app.className = "contentWrapper";
          window.clearInterval(config.interval.timer);
        break;
        case "config.button.easy":
          config.global.engine.level = 6;
          config.button.wrapper.className = "gridStyle easy";
          config.button.overlay.category.className += " show";
          config.button.difficulty.className = "contentWrapper";
        break;
        case "config.button.normal":
          config.global.engine.level = 8;
          config.button.overlay.category.className += " show";
          config.button.wrapper.className = "gridStyle normal";
          config.button.difficulty.className = "contentWrapper";
        break;
        case "config.button.hard":
          config.global.engine.level = 12;
          config.button.wrapper.className = "gridStyle";
          config.button.overlay.category.className += " show";
          config.button.difficulty.className = "contentWrapper";
        break;
      }
    }
  }
};

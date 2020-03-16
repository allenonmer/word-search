var config = {
  "info": {},
  "cell": {},
  "button": {},
  "direction": {},
  "detected": {"word": ''},
  "marker": {"counter": 1},
  "element": {"grid": null},
  "resize": {"timeout": null},
  "interval": {"timer": null},
  "word": {"detection": false},
  "global": {"flag": false, "engine": null},
  "cell": {"end": {}, "last": {}, "start": {}},
  "color": ["#3AAFAB", "#ff6a00", "#c4c600", "#0026ff", "#b200ff", "#ff006e", "#138e09", "#b0700c", "#81d901", "#187072", "#5c0b5c", "#8d2d5f"],
  "addon": {
    "homepage": function () {
      return chrome.runtime.getManifest().homepage_url;
    }
  },
  "position": {
    "last": {},
    "start": {},
    "point": {"end": {}, "start": {}}
  },
  "timer": function () {
    config.interval.timer = window.setInterval(function () {
      config.info.timer.textContent = Number(config.info.timer.textContent) + 1;
      config.global.engine.spanedtime++;
    }, 1000);
  },
  "best": {
    "scores": function () {
      config.button.label.home.textContent = config.global.engine.bestscores.home;
      config.button.label.cars.textContent = config.global.engine.bestscores.cars;
      config.button.label.foods.textContent = config.global.engine.bestscores.foods;
      config.button.label.sports.textContent = config.global.engine.bestscores.sports;
      config.button.label.animals.textContent = config.global.engine.bestscores.animals;
      config.button.label.internet.textContent = config.global.engine.bestscores.internet;
      config.button.label.countries.textContent = config.global.engine.bestscores.countries;
    }
  },
  "restart": {
    "game": function () {
      config.info.timer.textContent = '0';
      config.button.loader.className += " show";
      config.reset.score.data();
      config.initialize.grid();
      config.global.engine.investigateconditions();
      config.fill.word.list.side();
      /*  */
      config.button.loader.className = "whiteWrapper";
    }
  },
  "query": {
    "category": function (e) {
      switch (e) {
        case '0': return 'animals'; break;
        case '1': return 'cars'; break;
        case '2': return 'countries'; break;
        case '3': return 'foods'; break;
        case '4': return 'home'; break;
        case '5': return 'computer'; break;
        case '6': return 'sports'; break;
      }
    }
  },
  "storage": {
    "local": {},
    "read": function (id) {return config.storage.local[id]},
    "load": function (callback) {
      chrome.storage.local.get(null, function (e) {
        config.storage.local = e;
        callback();
      });
    },
    "write": function (id, data) {
      if (id) {
        if (data !== '' && data !== null && data !== undefined) {
          var tmp = {};
          tmp[id] = data;
          config.storage.local[id] = data;
          chrome.storage.local.set(tmp, function () {});
        } else {
          delete config.storage.local[id];
          chrome.storage.local.remove(id, function () {});
        }
      }
    }
  },
  "reset": {
    "marker": function () {
      mouse.listener.flag = false;
      touch.listener.flag = false;
      /*  */
      config.cell.last.row = undefined;
      config.cell.last.cell = undefined;
      config.position.last.x = undefined;
      config.position.last.y = undefined;
    },
    "score": {
      "data": function () {
        config.global.engine.score = 0;
        config.global.engine.spanedtime = 0;
        config.global.engine.correctanswer = 0;
        config.info.score.textContent = config.global.engine.score;
        config.button.answer.textContent = config.global.engine.correctanswer;
      }
    }
  },
  "flash": {
    "word": {
      "list": {
        "timeout": {"show": null, "hide": null},
        "side": function () {
          if (config.flash.word.list.timeout.show) window.clearTimeout(config.flash.word.list.timeout.show);
          config.flash.word.list.timeout.show = window.setTimeout(function () {
            config.button.words.setAttribute("flash", '');
            config.button.words.click();
          }, 300);
          /*  */
          if (config.flash.word.list.timeout.hide) window.clearTimeout(config.flash.word.list.timeout.hide);
          config.flash.word.list.timeout.hide = window.setTimeout(function () {
            config.button.words.removeAttribute("flash");
            config.button.words.click();
          }, 3000);
        }
      }
    }
  },
  "fill": {
    "word": {
      "list": {
        "side": function () {
          var words = config.global.engine.selectedwordslist();
          var aside = config.element.aside.getElementsByTagName('ul')[0];
          aside.textContent = '';
          /*  */
          for (var i = 0; i < words.length; i++) {
            var li = document.createElement('li');
            li.textContent = words[i];
            aside.appendChild(li);
          }
          /*  */
          config.flash.word.list.side();
        }
      }
    }
  },
  "check": {
    "completed": {
      "word": function (e) {
        var list = config.global.engine.selectedwordslist();
        if (list && list.length) {
          for (var i = 0; i < list.length; i++) {
            if (e === list[i]) {
              var items = [...document.querySelectorAll("#gridAside ul li")];
              for (var j = 0; j < items.length; j++) {
                if (e === items[j].textContent) {
                  items[j].style.textDecoration = "line-through";
                  items[j].style.color = "red";
                  return true;
                }
              }
            }
          }
        }
        /*  */
        return false;
      }
    }
  },
  "load": function () {
    var reload = document.querySelector("#reload");
    var support = document.querySelector("#support");
    var donation = document.querySelector("#donation");
    /*  */
    reload.addEventListener("click", function () {
      document.location.reload();
    });
    /*  */
    support.addEventListener("click", function () {
      var url = config.addon.homepage();
      chrome.tabs.create({"url": url, "active": true});
    }, false);
    /*  */
    donation.addEventListener("click", function () {
      var url = config.addon.homepage() + "?reason=support";
      chrome.tabs.create({"url": url, "active": true});
    }, false);
    /*  */
    config.storage.load(function () {
      config.global.engine = new core.word.search();
      /*  */
      if (config.storage.read("best-scores") !== undefined) {
        config.global.engine.bestscores = config.storage.read("best-scores");
      } else {
        config.storage.write("best-scores", config.global.engine.bestscores);
      }
      /*  */
      config.best.scores();
    });
    /*  */
    window.removeEventListener("load", config.load, false);
  },
  "post": {
    "processing": function (result) {
      if (document.getElementById('marker' + config.marker.counter)) {
        var current = document.getElementById('marker' + config.marker.counter);
        if (result !== null) {
          var items = [...config.element.aside.querySelectorAll('li')];
          for (var i = 0; i < items.length; i++) {
            if (items[i].textContent.toLowerCase() === result.toLowerCase()) {
              current.style.backgroundColor = config.color[config.marker.counter - 1];
              config.global.engine.correctanswer++;
              items[i].className = "correctCheck";
              config.marker.counter++;
              /*  */
              config.global.engine.score += config.global.engine.computescore(config.global.engine.spanedtime);
              config.button.answer.textContent = config.global.engine.correctanswer;
              config.info.score.textContent = config.global.engine.score;
              config.global.engine.spanedtime = 0;
              /*  */
              if ((config.marker.counter - 1) === config.global.engine.numberofwords()) {
                config.button.label.best.textContent = config.global.engine.computebestscore(config.global.engine.category);
                config.storage.write("best-scores", config.global.engine.bestscores);
                config.button.label.score.textContent = config.global.engine.score;
                config.button.finish.className += " show";
                config.best.scores();
              }
              /*  */
              return;
            }
          }
          /*  */
          if (current) current.remove();
        }
        /*  */
        if (current) current.remove();
      }
    }
  },
  "initialize": {
    "grid": function () {
      for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
          document.getElementById('' + i + '&' + j).textContent = '';
        }
      }
      /*  */
      for (var i = 0; i < config.marker.counter; i++) {
        if (document.getElementById("marker" + i)) {
          document.getElementById("marker" + i).remove();
        }
      }
      /*  */
      config.marker.counter = 1;
    },
    "variables": function () {
      config.button.label = {};
      config.cell.width = null;
      config.button.action = {};
      config.cell.height = null;
      config.interval.timer = null;
      config.button.overlay = {};
      config.direction.detected = '';
      config.direction.compute = false;
      config.info.score = document.getElementById("score");
      config.info.timer = document.getElementById("timer");
      /*  */
      config.element.aside = document.getElementById("gridAside");
      /*  */
      config.button.return = document.getElementById("btnMenu");
      config.button.words = document.getElementById("btnWords");
      config.button.box = document.getElementById("wordSearchBox");
      config.button.wrapper = document.getElementById("gridWrapper");
      config.button.category = document.getElementById("categoryBox");
      config.button.loader = document.getElementById("loaderWrapper");
      config.button.finish = document.getElementById("finishWrapper");
      config.button.answer = document.getElementById("correctAnswer");
      config.button.number = document.getElementById("numberOfWords");
      config.button.difficulty = document.getElementById("difficultyWrapper");
      /*  */
      config.button.hard = document.getElementById("config.button.hard");
      config.button.easy = document.getElementById("config.button.easy");
      config.button.pause = document.getElementById("config.button.pause");
      config.button.start = document.getElementById("config.button.start");
      config.button.store = document.getElementById("config.button.store");
      config.button.normal = document.getElementById("config.button.normal");
      config.button.restart = document.getElementById("config.button.restart");
      config.button.confirm = document.getElementById("config.button.confirm");
      config.button.continue = document.getElementById("config.button.continue");
      /*  */
      config.button.label.best = document.getElementById("lblBestScore");
      config.button.label.score = document.getElementById("lblYourScore");
      /*  */
      config.button.label.home = document.getElementById("config.button.label.home");
      config.button.label.cars = document.getElementById("config.button.label.cars");
      config.button.label.foods = document.getElementById("config.button.label.foods");
      config.button.label.sports = document.getElementById("config.button.label.sports");
      config.button.label.animals = document.getElementById("config.button.label.animals");
      config.button.label.internet = document.getElementById("config.button.label.internet");
      config.button.label.countries = document.getElementById("config.button.label.countries");
      /*  */
      config.button.overlay.pause = document.getElementById("pauseWrapper");
      config.button.overlay.best = document.getElementById("bestScoreWrapper");
      config.button.overlay.app = document.getElementById("wordSearchWrapper");
      config.button.overlay.start = document.getElementById("startPageWrapper");
      config.button.overlay.category = document.getElementById("categoryWrapper");
    }
  }
};

config.initialize.variables();

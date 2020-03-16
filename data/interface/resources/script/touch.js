var touch = {
  "div": null,
  "width": null,
  "degree": null,
  "height": null,
  "fixed": {"width": null, "angle": null},
  "span": config.button.wrapper.getElementsByTagName('span')[0],
  "listener": {
    "flag": false,
    "tmp": {"item": {"counter": 0}},
    "end": function (e) {
      var touches = e.changedTouches;
      if (document.elementFromPoint(touches[0].pageX, touches[0].pageY)) {
        config.cell.end = {
          "row": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row'),
          "cell": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')
        };
      }
      /*  */
      config.reset.marker();
      var result = config.global.engine.processwordcorrection(touch.degree, config.cell.start, config.cell.end);
      config.post.processing(result);
    },
    "start": function (e) {
      var touches = e.changedTouches;
      touch.div = document.createElement('div');
      touch.span = config.button.wrapper.getElementsByTagName('span')[0];
      /*  */
      touch.listener.flag = true;
      touch.div.className = "marker";
      touch.height = touch.span.clientHeight;
      touch.div.id = 'marker' + config.marker.counter;
      config.position.last = {'x': touches[0].clientX, 'y': touches[0].clientY};
      config.position.point.start = {'x': touches[0].clientX, 'y': touches[0].clientY};
      /*  */
      config.cell.start = {
        "row": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row'),
        "cell": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')
      };
      config.cell.last = {
        "row": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute("data-row"),
        "cell": document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute("data-cell")
      };
      /*  */
      touch.fixed.width = touch.span.clientWidth;
      touch.width = touch.fixed.width;
      touch.fixed.angle = Math.sqrt(Math.pow(touch.fixed.width, 2) + Math.pow(touch.height, 2));
      touch.div.style.height = touch.height + "px";
      touch.div.style.width = touch.width + "px";
      touch.div.style.left = touches[0].clientX - (touches[0].clientX - document.elementFromPoint(touches[0].pageX, touches[0].pageY).offsetLeft) + "px";
      touch.div.style.top = touches[0].clientY - 50 - (touches[0].clientY - 50 - document.elementFromPoint(touches[0].pageX, touches[0].pageY).offsetTop) + "px";
      config.button.wrapper.appendChild(touch.div);
    },
    "move": function(e) {
      var touches = e.changedTouches;
      if (touch.listener.flag) {
        if (document.elementFromPoint(touches[0].pageX, touches[0].pageY)) {
          if (document.elementFromPoint(touches[0].pageX, touches[0].pageY).nodeName.toLowerCase() == 'span') {
            touch.div.style.transformOrigin = (touch.fixed.width / 2) + 'px ' + (touch.fixed.width / 2) + 'px';
            if (config.cell.last.cell !== document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell') ||
              config.cell.last.row !== document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) {
              touch.degree = Math.atan2(touches[0].clientY - config.position.point.start.y, touches[0].clientX - config.position.point.start.x) * 180 / Math.PI;
              /*  */
              if (touch.degree >= -22.5 && touch.degree < 22.5) {
                touch.degree = 0;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) !== parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                } else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= 22.5 && touch.degree < 67.5) {
                touch.degree = 45;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
                else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                } else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  touch.width -= touch.fixed.angle / 2;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= 67.5 && touch.degree < 112.5) {
                touch.degree = 90;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) !== parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                } else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) !== parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= 112.5 && touch.degree < 157.5) {
                touch.degree = 135;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
                else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= 157.5 || touch.degree < -157.5) {
                touch.degree = 180;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                } else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= -67.5 && touch.degree < -22.5) {
                touch.degree = -45;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
                else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= -112.5 && touch.degree < -67.5) {
                touch.degree = -90;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                } else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) - parseInt(config.cell.start.row)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.width;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              if (touch.degree >= -157.5 && touch.degree < -112.5) {
                touch.degree = -135;
                if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) < parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
                else if (parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-row')) > parseInt(config.cell.last.row) ||
                  parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  touch.listener.tmp.item.counter = Math.abs(parseInt(document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  touch.width = touch.listener.tmp.item.counter * touch.fixed.angle;
                  touch.div.style.width = touch.width + "px";
                }
              }
              /*  */
              touch.div.style.transform = "rotate(" + (1 * touch.degree) + "deg)";
            }
            /*  */
            config.position.last = {'x': touches[0].clientX, 'y': touches[0].clientY};
            config.cell.last.cell = document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute("data-cell");
            config.cell.last.row = document.elementFromPoint(touches[0].pageX, touches[0].pageY).getAttribute("data-row");
          } else {
            config.reset.marker();
            var current = document.getElementById('marker' + config.marker.counter);
            if (current) current.remove();
          }
        }
      }
    }
  }
};

config.button.wrapper.addEventListener('touchend', touch.listener.end);
config.button.wrapper.addEventListener('touchmove', touch.listener.move);
config.button.wrapper.addEventListener('touchstart', touch.listener.start);

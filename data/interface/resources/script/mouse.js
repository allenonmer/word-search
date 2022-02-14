var mouse = {
  "div": null,
  "span": null,
  "width": null,
  "degree": null,
  "height": null,
  "fixed": {
    "width": null, 
    "angle": null
  },
  "listener": {
    "flag": false,
    "tmp": {"item": {"counter": 0}},
    "up": function (e) {
      config.cell.end = {'row': e.target.getAttribute('data-row'), 'cell': e.target.getAttribute('data-cell')};
      var result = config.global.engine.processwordcorrection(mouse.degree, config.cell.start, config.cell.end);
      /*  */
      config.post.processing(result);
      config.reset.marker();
    },
    "down": function (e) {
      mouse.span = config.button.wrapper.getElementsByTagName('span')[0];
      /*  */
      mouse.div = document.createElement('div');
      mouse.div.id = 'marker' + config.marker.counter;
      mouse.height = mouse.span.clientHeight;
      mouse.div.className = "marker";
      /*  */
      mouse.listener.flag = true;
      config.position.last = {'x': e.clientX, 'y': e.clientY};
      config.position.point.start = {'x': e.clientX, 'y': e.clientY};
      config.cell.last = {'row': e.target.getAttribute("data-row"), 'cell': e.target.getAttribute("data-cell")};
      config.cell.start = {'row': e.target.getAttribute('data-row'), 'cell': e.target.getAttribute('data-cell')};
      mouse.fixed.width = mouse.span.clientWidth;
      mouse.width = mouse.fixed.width;
      mouse.fixed.angle = Math.sqrt(Math.pow(mouse.fixed.width, 2) + Math.pow(mouse.height, 2));
      mouse.div.style.height = mouse.height + "px";
      mouse.div.style.width = mouse.width + "px";
      /*  */
      mouse.div.style.left = e.clientX - this.getClientRects()[0].left - e.offsetX + "px";
      mouse.div.style.top = e.clientY - this.getClientRects()[0].top - e.offsetY + "px";
      config.button.wrapper.appendChild(mouse.div);
    },
    "move": function (e) {
      if (mouse.listener.flag) {
        mouse.listener.tmp.item.counter = 0;
        if (e.target) {
          if (e.target.nodeName.toLowerCase() === 'span') {
            mouse.div.style.transformOrigin = (mouse.fixed.width / 2) + 'px ' + (mouse.fixed.width / 2) + 'px';
            if (config.cell.last.cell !== e.target.getAttribute('data-cell') || config.cell.last.row !== e.target.getAttribute('data-row')) {
              mouse.degree = Math.atan2(e.clientY - config.position.point.start.y, e.clientX - config.position.point.start.x) * 180 / Math.PI;
              /*  */
              if (mouse.degree >= -22.5 && mouse.degree < 22.5) {
                mouse.degree = 0;
                if (parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell) || parseInt(e.target.getAttribute('data-row')) !== parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= 22.5 && mouse.degree < 67.5) {
                mouse.degree = 45;
                if (parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell) || parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell) || parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell) || parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  mouse.width -= mouse.fixed.angle / 2;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= 67.5 && mouse.degree < 112.5) {
                mouse.degree = 90;
                if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) != parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) != parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= 112.5 && mouse.degree < 157.5) {
                mouse.degree = 135;
                if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= 157.5 || mouse.degree < -157.5) {
                mouse.degree = 180;
                if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= -67.5 && mouse.degree < -22.5) {
                mouse.degree = -45;
                if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= -112.5 && mouse.degree < -67.5) {
                mouse.degree = -90;
                if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-row')) - parseInt(config.cell.start.row)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.width;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              if (mouse.degree >= -157.5 && mouse.degree < -112.5) {
                mouse.degree = -135;
                if (parseInt(e.target.getAttribute('data-row')) < parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) < parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                } else if (parseInt(e.target.getAttribute('data-row')) > parseInt(config.cell.last.row) || parseInt(e.target.getAttribute('data-cell')) > parseInt(config.cell.last.cell)) {
                  mouse.listener.tmp.item.counter = Math.abs(parseInt(e.target.getAttribute('data-cell')) - parseInt(config.cell.start.cell)) + 1;
                  mouse.width = mouse.listener.tmp.item.counter * mouse.fixed.angle;
                  mouse.div.style.width = mouse.width + "px";
                }
              }
              /*  */
              mouse.div.style.transform = "rotate(" + (1 * mouse.degree) + "deg)";
            }
            /*  */
            config.position.last = {'x': e.clientX, 'y': e.clientY};
            config.cell.last.row = e.target.getAttribute("data-row");
            config.cell.last.cell = e.target.getAttribute("data-cell");
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
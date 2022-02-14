var core = {
  "alphebet": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "selected": {
    "words": []
  },
  "not": {
    "insert": {
      "text": {
        "flag": false
      }
    }
  },
  "direction": {
    "East": 3,
    "West": 7,
    "North": 1,
    "South": 5,
    "NorthEast": 2,
    "SouthEast": 4,
    "SouthWest": 6,
    "NorthWest": 8
  },
  "is": {
    "word": {
      "correct": function (e) {
        for (var i = 0; i < core.selected.words.length; i++) {
          if (e.toLowerCase() === core.selected.words[i].toLowerCase()) {
            return e;
          }
        }
        /*  */
        return null;
      }
    }
  },
  "create": {
    "random": {
      "direction": function () {
        return Math.floor((Math.random() * 8) + 1);
      },
      "point": function (e) {
        var row = Math.floor((Math.random() * e) + 1);
        var column = Math.floor((Math.random() * e) + 1);
        return [row, column];
      }
    }
  },
  "checking": {
    "length": function (length, point, direction, level) {
      switch (direction) {
        case core.direction.North:
          if (point[0] - 1 - length >= 0) return true;
          else return false;
        break;
        case core.direction.NorthEast:
          if (point[0] - 1 - length >= 0 && point[1] - 1 + length < level) return true;
          else return false;
        break;
        case core.direction.East:
          if (point[1] - 1 + length < level) return true;
          else return false;
        break;
        case core.direction.SouthEast:
          if (point[0] - 1 + length < level && point[1] - 1 + length < level) return true;
          else return false;
        break;
        case core.direction.South:
          if (point[0] - 1 + length < level) return true;
          else return false;
        break;
        case core.direction.SouthWest:
          if (point[0] - 1 + length < level && point[1] - 1 - length >= 0) return true;
          else return false;
        break;
        case core.direction.West:
          if (point[1] - 1 - length >= 0) return true;
          else return false;
        break;
        case core.direction.NorthWest:
          if (point[0] - 1 - length >= 0 && point[1] - 1 - length >= 0) return true;
          else return false;
        break;
        default:
      }
    }
  },
  "word": {
    "number": function (e) {
      switch (e) {
        case 6: return 4;
        case 8: return 6;
        case 12: return 8;
        default: break;
      }
    },
    "search": function () {
      this.score = 0;
      this.level = 0;
      this.category = 0;
      this.wordlist = [];
      this.spanedtime = 0;
      this.correctanswer = 0;
      this.bestscores = {"home": 0, "cars": 0, "foods": 0, "sports": 0, "animals": 0, "internet": 0, "countries": 0};
      /*  */
      this.computescore = function (e) {return 100 - e};
      this.selectedwordslist = function () {return core.selected.words};
      this.numberofwords = function () {return core.word.number(this.level)};
      this.selectrandomword = function () {return this.wordlist[Math.floor((Math.random() * this.wordlist.length))]};
      this.computebestscore = function (e) {
        switch (e) {
          case 0:
            if (this.bestscores.animals < this.score) this.bestscores.animals = this.score;
            return this.bestscores.animals;
          break;
          case 1:
            if (this.bestscores.cars < this.score) this.bestscores.cars = this.score;
            return this.bestscores.cars;
          break;
          case 2:
            if (this.bestscores.countries < this.score) this.bestscores.countries = this.score;
            return this.bestscores.countries;
          break;
          case 3:
            if (this.bestscores.foods < this.score) this.bestscores.foods = this.score;
            return this.bestscores.foods;
          break;
          case 4:
            if (this.bestscores.home < this.score) this.bestscores.home = this.score;
            return this.bestscores.home;
          break;
          case 5:
            if (this.bestscores.internet < this.score) this.bestscores.internet = this.score;
            return this.bestscores.internet;
          break;
          case 6:
            if (this.bestscores.sports < this.score) this.bestscores.sports = this.score;
            return this.bestscores.sports;
          break;
        }
      };
      /*  */
      this.processwordcorrection = function (degree, start, end) {
        var word = '';
        /*  */
        if (degree >= -22.5 && degree < 22.5) {
          for (var i = parseInt(start.cell); i <= parseInt(end.cell); i++) {
            word += document.getElementById('' + start.row + '&' + i).textContent;
          }
        }
        /*  */
        if (degree >= 157.5 || degree < -157.5) {
          for (var i = parseInt(start.cell); i >= parseInt(end.cell); i--) {
            word += document.getElementById('' + start.row + '&' + i).textContent;
          }
        }
        /*  */
        if (degree >= 67.5 && degree < 112.5) {
          for (var i = parseInt(start.row); i <= parseInt(end.row); i++) {
            word += document.getElementById('' + i + '&' + start.cell).textContent;
          }
        }
        /*  */
        if (degree >= -112.5 && degree < -67.5) {
          for (var i = parseInt(start.row); i >= parseInt(end.row); i--) {
            word += document.getElementById('' + i + '&' + start.cell).textContent;
          }
        }
        /*  */
        if (degree >= 22.5 && degree < 67.5) {
          var j = start.cell;
          for (var i = parseInt(start.row); i <= parseInt(end.row); i++) {
            word += document.getElementById('' + i + '&' + j).textContent;
            j++;
          }
        }
        /*  */
        if (degree >= 112.5 && degree < 157.5) {
          var j = start.cell;
          for (var i = parseInt(start.row); i <= parseInt(end.row); i++) {
            word += document.getElementById('' + i + '&' + j).textContent;
            j--;
          }
        }
        /*  */
        if (degree >= -67.5 && degree < -22.5) {
          var j = start.row;
          for (var i = parseInt(start.cell); i <= parseInt(end.cell); i++) {
            word += document.getElementById('' + j + '&' + i).textContent;
            j--;
          }
        }
        /*  */
        if (degree >= -157.5 && degree < -112.5) {
          var j = start.row;
          for (var i = parseInt(start.cell); i >= parseInt(end.cell); i--) {
            word += document.getElementById('' + j + '&' + i).textContent;
            j--;
          }
        }
        /*  */
        return core.is.word.correct(word);
      };
      /*  */
      this.investigateconditions = function () {
        var k = 0;
        while (core.selected.words.length > 0) core.selected.words.pop();
        /*  */
        if (core.word.number(this.level) !== undefined) {
          while (k !== core.word.number(this.level)) {
            var word = this.selectrandomword();
            while (this.level === 12 && word.length > 7) word = this.selectrandomword();
            while (this.level === 8 && word.length > 5) word = this.selectrandomword();
            while (this.level === 6 && word.length > 6) word = this.selectrandomword();
            var point = core.create.random.point(this.level, word.length);
            var direction = core.create.random.direction();
            /*  */
            for (var i = 0; i < k; i++) {
              if (word === core.selected.words[i]) {
                word = this.selectrandomword();
                while (this.level === 12 && word.length > 12) word = this.selectrandomword();
                while (this.level === 8 && word.length > 8) word = this.selectrandomword();
                while (this.level === 6 && word.length > 6) word = this.selectrandomword();
              }
            }
            /*  */
            var checkingLength = false;
            while (checkingLength === false) {
              if (direction > 8) {
                direction = 1;
                for (var i = 0; i <= k; i++) {
                  if (word === core.selected.words[i]) {
                    word = this.selectrandomword();
                    while (this.level === 12 && word.length > 8) word = this.selectrandomword();
                    while (this.level === 8 && word.length > 6) word = this.selectrandomword();
                    while (this.level === 6 && word.length > 4) word = this.selectrandomword();
                    i = -1;
                  }
                }
                /*  */
                point = core.create.random.point(this.level, word.length);
              }
              /*  */
              checkingLength = core.checking.length(word.length - 1, point, direction, this.level);
              if (checkingLength === false) direction++;
            }
            /*  */
            if (checkingLength === true) {
              core.not.insert.text.flag = false;
              config.element.grid = document.getElementById('grid');
              /*  */
              switch (direction) {
                case core.direction.North:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.NorthEast:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 + i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 + i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 + i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 + i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.East:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 + i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 + i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 + i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 + i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.SouthEast:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 + i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 + i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 + i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 + i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.South:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.SouthWest:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 - i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 - i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 - i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 + i) + '&' + (point[1] - 1 - i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.West:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 - i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 - i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 - i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1) + '&' + (point[1] - 1 - i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
                case core.direction.NorthWest:
                  for (var i = 0; i < word.length; i++) {
                    var cond_1 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 - i)).textContent !== '';
                    var cond_2 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 - i)).textContent !== word.charAt(i);
                    var cond_3 = document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 - i)).textContent !== '';
                    /*  */
                    if ((cond_1 && cond_2) || cond_3) {
                      core.not.insert.text.flag = true;
                      break;
                    }
                  }
                  /*  */
                  if (!core.not.insert.text.flag) {
                    for (var i = 0; i < word.length; i++) {
                      document.getElementById('' + (point[0] - 1 - i) + '&' + (point[1] - 1 - i)).textContent = word.charAt(i);
                      if (i === word.length - 1) k++;
                    }
                    /*  */
                    core.selected.words[core.selected.words.length] = word;
                  }
                break;
              }
            }
          }
        }
        /*  */
        for (var i = 0; i < this.level; i++) {
          for (var j = 0; j < this.level; j++) {
            if (i === 11 && j === 0) {
              var s = document.getElementById('' + i + j);
              /* ToDo */
            }
            /*  */
            var target = document.getElementById('' + i + '&' + j);
            if (target && target.textContent === '') {
              target.textContent = core.alphebet.charAt(Math.floor(Math.random() * core.alphebet.length));
            }
          }
        }
      };
    }
  }
};
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  self.Renderer = (function() {
    function Renderer() {
      this.transitionDone = __bind(this.transitionDone, this);      this.boxOpen = false;
      this.makeSpinner();
      this.testTransitions();
    }
    Renderer.prototype.load = function() {
      var item, link, links, _i, _len;
      links = document.getElementById("images").getElementsByTagName("a");
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        link = links[_i];
        item = {};
        item.full = link.getAttribute("href");
        item.thumb = link.firstChild.getAttribute("src");
        item.description = link.firstChild.getAttribute("alt");
        this.parent.addItem(item);
      }
      return this.addListeners();
    };
    Renderer.prototype.addListeners = function() {
      var a, links, _i, _len;
      links = document.getElementsByTagName("a");
      for (_i = 0, _len = links.length; _i < _len; _i++) {
        a = links[_i];
        if (a.firstChild === a.getElementsByTagName("img")[0]) {
          a.addEventListener("click", __bind(function(e) {
            e.preventDefault();
            return this.parent.loadItem(this.parent.index[e.currentTarget.getAttribute("href")]);
          }, this), false);
        }
      }
      return document.body.addEventListener("keydown", __bind(function(e) {
        if (e.keyCode === 27) {
          return this.close();
        } else if (e.keyCode === 37) {
          e.preventDefault();
          return this.parent.prev();
        } else if (e.keyCode === 39) {
          e.preventDefault();
          return this.parent.next();
        }
      }, this), false);
    };
    Renderer.prototype.makeSpinner = function() {
      var opts;
      this.spinarea = document.createElement("div");
      this.spinarea.className = "spin hidden";
      document.body.appendChild(this.spinarea);
      opts = {
        lines: 12,
        length: 5,
        width: 3,
        radius: 8,
        color: '#444',
        speed: 1,
        trail: 60,
        shadow: false
      };
      this.spinner = new Spinner(opts).spin(this.spinarea);
      return this.spinner.stop();
    };
    Renderer.prototype.testTransitions = function() {
      this.transitions = false;
      if ("ontransitionend" in window) {
        return this.transitionType = "transitionend";
      } else if ("onwebkittransitionend" in window) {
        this.transitions = true;
        return this.transitionType = "webkitTransitionEnd";
      } else if (navigator.appName === "Opera") {
        return this.transitionType = "OTransitionEnd";
      }
    };
    Renderer.prototype.startLoading = function() {
      this.spinner.spin(this.spinarea);
      return this.spinarea.className = "spin";
    };
    Renderer.prototype.endLoading = function() {
      this.spinner.stop();
      return this.spinarea.className = "spin hidden";
    };
    Renderer.prototype.updateCaption = function(text) {
      return this.caption.innerHTML = text;
    };
    Renderer.prototype.display = function(item) {
      var closeArea, img, innerBox;
      if (!this.boxOpen) {
        this.boxOpen = true;
        this.container = document.createElement("div");
        this.container.id = "overlay";
        if (this.transitions) {
          this.container.addEventListener(this.transitionType, this.transitionDone, false);
        }
        innerBox = document.createElement("div");
        innerBox.id = "inner";
        if (this.transitions) {
          innerBox.addEventListener(this.transitionType, function(e) {
            return e.stopPropagation();
          }, false);
        }
        this.container.appendChild(innerBox);
        this.closeBtn = document.createElement("a");
        this.closeBtn.href = "#";
        this.closeBtn.innerHTML = "Close";
        this.closeBtn.id = "close";
        this.closeBtn.addEventListener("click", __bind(function(e) {
          e.preventDefault();
          return this.close();
        }, this), false);
        innerBox.appendChild(this.closeBtn);
        this.caption = document.createElement("div");
        this.caption.id = "caption";
        innerBox.appendChild(this.caption);
        closeArea = document.createElement("div");
        closeArea.id = "closearea";
        closeArea.addEventListener("click", this.close, false);
        this.container.appendChild(closeArea);
        img = document.createElement("img");
        img.onload = __bind(function() {
          innerBox.style.marginLeft = "-" + (img.width / 2) + "px";
          innerBox.style.marginTop = "-" + (img.height / 2) + "px";
          innerBox.style.width = "" + img.width + "px";
          innerBox.style.height = "" + img.height + "px";
          innerBox.appendChild(img);
          document.body.appendChild(this.container);
          window.setTimeout(__bind(function() {
            return this.container.className = "visible";
          }, this), 0);
          if (!this.transitions) {
            return this.transitionDone();
          }
        }, this);
        img.setAttribute("src", item.full);
      } else {
        innerBox = this.container.firstChild;
        innerBox.removeChild(innerBox.lastChild);
        img = document.createElement("img");
        img.onload = __bind(function() {
          innerBox.style.marginLeft = "-" + (img.width / 2) + "px";
          innerBox.style.marginTop = "-" + (img.height / 2) + "px";
          innerBox.style.width = "" + img.width + "px";
          return innerBox.style.height = "" + img.height + "px";
        }, this);
        innerBox.appendChild(img);
        img.setAttribute("src", item.full);
      }
      return this.updateCaption(item.description);
    };
    Renderer.prototype.transitionDone = function() {
      if (this.container.className !== "visible") {
        return this.container.parentNode.removeChild(this.container);
      } else {
        return window.setTimeout(__bind(function() {
          return this.container.firstChild.className = "visible";
        }, this), 0);
      }
    };
    Renderer.prototype.close = function() {
      if (this.boxOpen) {
        this.boxOpen = false;
        this.container.className = "";
        if (!this.transitions) {
          return this.transitionDone();
        }
      }
    };
    Renderer.prototype.addThumbs = function(thumbs) {
      /*
      		Handles the adding of thumbnails tothe DOM.
      		thumbs is a required parameter and is an
      		array of all of the thumbnails' URLS.
      		*/
    };
    Renderer.prototype.setActiveThumb = function(number) {
      /*
      		Sets the active thumbnail. number is a
      		required parameter representing the position
      		in the array of objects (starts at 0).
      		*/
    };
    return Renderer;
  })();
}).call(this);

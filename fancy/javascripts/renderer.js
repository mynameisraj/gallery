(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  self.Renderer = (function() {
    function Renderer(id) {
      this.doneTransitioning = __bind(this.doneTransitioning, this);      this.animating = false;
      this.activeStarted = false;
      this.testTransitions();
      this.gallery = document.createElement("div");
      this.gallery.id = id;
      document.body.appendChild(this.gallery);
      this.checkiOS();
      this.makeViewport();
      this.makeNav();
      this.makeCaptions();
      this.makeSpinner();
      this.startLoading();
    }
    Renderer.prototype.load = function() {
      this.addListeners();
      return this.parent.load(this.parent.items[0]);
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
    Renderer.prototype.addThumbs = function(thumbs) {
      var clear, index, thumb, _i, _len;
      this.pages = document.createElement("div");
      this.pages.className = "pages";
      this.gallery.appendChild(this.pages);
      this.thumbsIndex = [];
      index = 0;
      for (_i = 0, _len = thumbs.length; _i < _len; _i++) {
        thumb = thumbs[_i];
        thumb = new Image();
        thumb.src = thumbs[index];
        thumb.indexNumber = index;
        this.thumbsIndex[index] = thumb;
        this.pages.appendChild(thumb);
        thumb.addEventListener(this.touchlistener, this.parent.thumbLoad(thumb, false));
        index++;
      }
      clear = document.createElement("div");
      clear.className = "clear";
      return this.pages.appendChild(clear);
    };
    Renderer.prototype.addListeners = function() {
      this.prevBtn.addEventListener("click", __bind(function(e) {
        e.preventDefault();
        return this.parent.prev();
      }, this), false);
      this.nextBtn.addEventListener("click", __bind(function(e) {
        e.preventDefault();
        return this.parent.next();
      }, this), false);
      return document.body.addEventListener("keyup", __bind(function(e) {
        if (!this.animating) {
          if (e.keyCode === 37) {
            e.preventDefault();
            return this.parent.prev();
          } else if (e.keyCode === 39) {
            e.preventDefault();
            return this.parent.next();
          }
        }
      }, this), false);
    };
    Renderer.prototype.checkiOS = function() {
      var iOS;
      iOS = navigator.userAgent.match(/iPad/i) !== null || navigator.userAgent.match(/iPhone/i) !== null;
      if (iOS) {
        return this.touchlistener = "touchend";
      } else {
        return this.touchlistener = "click";
      }
    };
    Renderer.prototype.makeViewport = function() {
      this.viewport = document.createElement("div");
      this.viewport.className = "viewport";
      return this.gallery.appendChild(this.viewport);
    };
    Renderer.prototype.makeNav = function() {
      var nav;
      nav = document.createElement("div");
      nav.className = "nav";
      this.gallery.appendChild(nav);
      this.prevBtn = document.createElement("a");
      this.prevBtn.href = "#";
      this.prevBtn.className = "prev";
      this.prevBtn.innerHTML = "Previous";
      nav.appendChild(this.prevBtn);
      this.nextBtn = document.createElement("a");
      this.nextBtn.href = "#";
      this.nextBtn.className = "next";
      this.nextBtn.innerHTML = "Next";
      return nav.appendChild(this.nextBtn);
    };
    Renderer.prototype.makeCaptions = function() {
      this.caption = document.createElement("div");
      this.caption.className = "caption";
      return this.gallery.appendChild(this.caption);
    };
    Renderer.prototype.makeSpinner = function() {
      var opts;
      this.spinarea = document.createElement("div");
      this.spinarea.className = "spin hidden";
      this.gallery.appendChild(this.spinarea);
      opts = {
        lines: 12,
        length: 5,
        width: 3,
        radius: 8,
        color: "#444",
        speed: 1,
        trail: 60,
        shadow: false
      };
      this.spinner = new Spinner(opts).spin(this.spinarea);
      return this.spinner.stop();
    };
    Renderer.prototype.display = function(item) {
      var incoming, num, _ref;
      this.updateCaption(item.description);
      if (this.viewport.childNodes.length === 0) {
        this.image = new Image();
        this.image.src = item.full;
        return this.viewport.appendChild(this.image);
      } else {
        if (this.viewport.childNodes.length > 1) {
          for (num = 1, _ref = this.viewport.childNodes.length - 1; 1 <= _ref ? num <= _ref : num >= _ref; 1 <= _ref ? num++ : num--) {
            this.viewport.removeChild(this.viewport.childNodes[num]);
          }
        }
        if (this.transitions) {
          this.viewport.firstChild.addEventListener(this.transitionType, this.doneTransitioning, false);
        }
        this.animating = true;
        this.viewport.className = "viewport start";
        this.viewport.firstChild.className = "out " + this.getAnimation();
        incoming = new Image();
        incoming.src = item.full;
        incoming.className = "in";
        this.viewport.appendChild(incoming);
        window.setTimeout(__bind(function() {
          return this.viewport.className = "viewport end";
        }, this), 0);
        if (!this.transitions) {
          return window.setTimeout(__bind(function() {
            return this.doneTransitioning();
          }, this), 0);
        }
      }
    };
    Renderer.prototype.updateCaption = function(caption) {
      return this.caption.innerHTML = caption;
    };
    Renderer.prototype.getAnimation = function() {
      var animations, rand;
      animations = ["squeeze", "cardleft", "cardright", "opacity", "movedown", "moveup", "hang topleft", "hang topright"];
      rand = animations[Math.round(Math.random() * (animations.length - 1))];
      return rand;
    };
    Renderer.prototype.doneTransitioning = function() {
      if (this.animating) {
        this.animating = false;
        this.viewport.removeChild(this.viewport.firstChild);
        this.viewport.className = "viewport";
        return this.viewport.getElementsByClassName("in")[0].className = "";
      }
    };
    Renderer.prototype.setActiveThumb = function(index) {
      var active, _i, _len, _ref;
      if (!this.activeStarted) {
        if (this.pages !== void 0) {
          this.pages.getElementsByTagName("img")[index].className = "active";
        }
        return this.activeStarted = true;
      } else {
        _ref = this.gallery.getElementsByClassName("active");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          active = _ref[_i];
          active.className = "";
        }
        return this.pages.getElementsByTagName("img")[index].className = "active";
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
    return Renderer;
  })();
}).call(this);

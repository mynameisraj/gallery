(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  self.Renderer = (function() {
    function Renderer(id, parentEl) {
      this.activeStarted = false;
      this.gallery = document.createElement("div");
      this.gallery.id = id;
      parentEl.appendChild(this.gallery);
      this.checkiOS();
      this.makeViewport();
    }
    Renderer.prototype.load = function() {
      this.addListeners();
      return this.parent.load(this.parent.items[0]);
    };
    Renderer.prototype.addThumbs = function(thumbs) {
      var index, li, thumb, _i, _len, _results;
      this.pages = document.createElement("ul");
      this.pages.className = "pages";
      this.gallery.appendChild(this.pages);
      this.thumbsIndex = [];
      index = 0;
      _results = [];
      for (_i = 0, _len = thumbs.length; _i < _len; _i++) {
        thumb = thumbs[_i];
        thumb = new Image();
        thumb.src = thumbs[index];
        thumb.indexNumber = index;
        this.thumbsIndex[index] = thumb;
        li = document.createElement("li");
        li.appendChild(thumb);
        this.pages.appendChild(li);
        thumb.addEventListener(this.touchlistener, this.parent.thumbLoad(thumb, false));
        _results.push(index++);
      }
      return _results;
    };
    Renderer.prototype.addListeners = function() {
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
    Renderer.prototype.display = function(item) {
      if (this.viewport.childNodes.length === 0) {
        this.image = new Image();
        this.image.src = item.full;
        return this.viewport.appendChild(this.image);
      } else {
        return this.image.src = item.full;
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
        _ref = gallery.getElementsByClassName("active");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          active = _ref[_i];
          active.className = "";
        }
        return this.pages.getElementsByTagName("img")[index].className = "active";
      }
    };
    Renderer.prototype.startLoading = function() {};
    Renderer.prototype.endLoading = function() {};
    return Renderer;
  })();
}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  self.Gallery = (function() {
    function Gallery(items, renderer) {
      this.items = items;
      this.renderer = renderer;
      this.loadItem = __bind(this.loadItem, this);
      this.preloadNext = __bind(this.preloadNext, this);
      this.setPreloaded = __bind(this.setPreloaded, this);
      this.preloadedThumb = __bind(this.preloadedThumb, this);
      this.thumbLoad = __bind(this.thumbLoad, this);
      this.loading = false;
      this.renderer.parent = this;
      this.createIndex();
      this.preloadThumbs();
      this.renderer.load();
    }
    Gallery.prototype.createIndex = function() {
      var item, tracker, _i, _len, _ref, _results;
      this.index = {};
      this.currentImage = 0;
      tracker = 0;
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.preloaded = false;
        this.index[item.full] = tracker;
        _results.push(tracker++);
      }
      return _results;
    };
    Gallery.prototype.addItem = function(item) {
      this.items[this.items.length] = item;
      return this.createIndex();
    };
    Gallery.prototype.thumbLoad = function(thumb) {
      return __bind(function() {
        return this.loadItem(thumb.indexNumber);
      }, this);
    };
    Gallery.prototype.preloadThumbs = function() {
      var item, tempThumb, _i, _len, _ref, _results;
      this.loadedThumbs = 0;
      this.thumbs = [];
      _ref = this.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        tempThumb = new Image();
        tempThumb.addEventListener("load", this.preloadedThumb, false);
        tempThumb.src = item.thumb;
        _results.push(this.thumbs[this.index[item.full]] = item.thumb);
      }
      return _results;
    };
    Gallery.prototype.preloadedThumb = function() {
      this.loadedThumbs++;
      if (this.loadedThumbs === this.items.length) {
        return this.renderer.addThumbs(this.thumbs);
      }
    };
    Gallery.prototype.preload = function(item) {
      var tempImage;
      this.renderer.startLoading();
      this.datestart = new Date();
      this.loading = true;
      tempImage = document.createElement("img");
      tempImage.onload = __bind(function() {
        return this.setPreloaded(item);
      }, this);
      return tempImage.src = item.full;
    };
    Gallery.prototype.setPreloaded = function(item) {
      var diff;
      this.dateend = new Date();
      diff = this.dateend.getTime() - this.datestart.getTime();
      console.log("Loaded image #" + (this.index[item.full] + 1) + " (" + diff + " ms).");
      delete this.dateend;
      delete this.datestart;
      item.preloaded = true;
      this.loading = false;
      this.renderer.endLoading();
      return this.load(item);
    };
    Gallery.prototype.preloadNext = function(item) {
      var tempImage;
      this.datestarttwo = new Date();
      tempImage = document.createElement("img");
      tempImage.onload = __bind(function() {
        var diff;
        this.dateendtwo = new Date();
        diff = this.dateendtwo.getTime() - this.datestarttwo.getTime();
        console.log("Loaded image #" + (this.index[item.full] + 1) + " (" + diff + " ms).");
        delete this.dateendtwo;
        delete this.datestarttwo;
        return item.preloaded = true;
      }, this);
      return tempImage.src = item.full;
    };
    Gallery.prototype.load = function(item) {
      if (!item.preloaded && !this.loading) {
        return this.preload(item);
      } else if (!this.loading) {
        this.renderer.display(item);
        this.renderer.setActiveThumb(this.index[item.full]);
        if ((this.index[item.full] + 1) < this.items.length && !this.items[this.index[item.full] + 1].preloaded) {
          this.preloadNext(this.items[this.index[item.full] + 1]);
        }
        return this.currentImage = this.index[item.full];
      } else {
        return this.load(item);
      }
    };
    Gallery.prototype.loadItem = function(number) {
      return this.load(this.items[number]);
    };
    Gallery.prototype.prev = function() {
      this.currentImage--;
      if (this.currentImage < 0) {
        this.currentImage = this.items.length - 1;
      }
      return this.load(this.items[this.currentImage]);
    };
    Gallery.prototype.next = function() {
      this.currentImage++;
      if (this.currentImage > this.items.length - 1) {
        this.currentImage = 0;
      }
      return this.load(this.items[this.currentImage]);
    };
    return Gallery;
  })();
}).call(this);

(function() {
  var init;
  init = function() {
    var g, images;
    images = [];
    return g = new Gallery(images, new Renderer("gallery"));
  };
  window.addEventListener("load", init, false);
}).call(this);

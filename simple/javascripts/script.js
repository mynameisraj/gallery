(function() {
  var init;
  init = function() {
    var g, images, body;
    images = [
      {
        full: "../assets/images/1.jpg",
        thumb: "../assets/images/1-thumb.jpg",
        description: "Ferie"
      }, {
        full: "../assets/images/2.jpg",
        thumb: "../assets/images/2-thumb.jpg",
        description: "Cloudy Edinburgh"
      }, {
        full: "../assets/images/3.jpg",
        thumb: "../assets/images/3-thumb.jpg",
        description: "Bodega Head Sunset"
      }, {
        full: "../assets/images/4.jpg",
        thumb: "../assets/images/4-thumb.jpg",
        description: "Mont Agel"
      }
    ];
    body = document.body;
    return g = new Gallery(images, new Renderer("gallery", body));
  };
  window.addEventListener("load", init, false);
}).call(this);
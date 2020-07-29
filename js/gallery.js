'use strict';
(function () {

  var drawBigPicture = window.preview.drawBigPicture;
  var drawMiniaturePictures = window.picture.drawMiniaturePictures;

  var updatePictures = function (data) {
    var pictures = document.querySelectorAll('.picture');

    Array.from(pictures).map(function (it) {
      it.remove();
    });

    drawMiniaturePictures(data);
    drawBigPicture(data);
  };

  window.gallery = {
    updatePictures: updatePictures
  };
})();

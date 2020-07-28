'use strict';
(function () {

  var drawBigPicture = window.preview.drawBigPicture;
  var drawMiniaturePictures = window.picture.drawMiniaturePictures;

  var updatePictures = function (data) {
    var pictures = document.querySelectorAll('.picture');

    for (var i = 0; i < pictures.length; i++) {
      document.querySelector('.picture').remove();
    }

    drawMiniaturePictures(data);
    drawBigPicture(data);
  };

  window.gallery = {
    updatePictures: updatePictures
  };
})();

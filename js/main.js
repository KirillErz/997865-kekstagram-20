'use strict';
(function () {
  var body = document.querySelector('body');

  var drawBigPicture = window.preview.drawBigPicture;
  var drawMiniaturePictures = window.picture.drawMiniaturePictures;
  var load = window.serverInteraction.load;
  var getDateFormApi = window.filter.getDateFormApi;
  var form = window.form;

  var editFormImg = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var imgFilters = document.querySelector('.img-filters');

  var onError = function (message) {
    document.body.innerHTML += message;
  };

  load('https://javascript.pages.academy/kekstagram/data', function (response) {
    getDateFormApi(response);
    drawMiniaturePictures(response);
    drawBigPicture(response);
    imgFilters.classList.remove('img-filters--inactive');

  }, onError);

  uploadFile.addEventListener('change', function () {
    form.openEditingImg(uploadFile);
    editFormImg.classList.remove('hidden');
    body.classList.add('modal-open');
  });
})();

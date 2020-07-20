'use strict';
var body = document.querySelector('body');

var createMocKekstagram = window.data.createMocKekstagram;
var drawBigPicture = window.preview.drawBigPicture;
var drawMiniaturePictures = window.picture.drawMiniaturePictures;
var load = window.serverInteraction.load;


var editFormImg = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');

var onError = function (message) {
  console.error(message);
};

load('https://javascript.pages.academy/kekstagram/data', function (response) {

  drawMiniaturePictures(response);
  drawBigPicture(response);

}, onError)

uploadFile.addEventListener('change', function () {
  editFormImg.classList.remove('hidden');
  body.classList.add('modal-open');
});

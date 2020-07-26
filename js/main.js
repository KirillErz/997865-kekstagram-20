'use strict';
var body = document.querySelector('body');

// var createMocKekstagram = window.data.createMocKekstagram;
var drawBigPicture = window.preview.drawBigPicture;
var drawMiniaturePictures = window.picture.drawMiniaturePictures;
var load = window.serverInteraction.load;
var form = window.form;


var editFormImg = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');

var onError = function (message) {

  document.body.innerHTML += message;
};

load('https://javascript.pages.academy/kekstagram/data', function (response) {

  drawMiniaturePictures(response);
  drawBigPicture(response);

}, onError);

var path = ''
uploadFile.addEventListener('change', function () {
  // if(path === '') {
  //   path = uploadFile.value
  // } else {
  //   if (path.includes(uploadFile.value))
  //     uploadFile.value = '';
  // }
  form.openEditingForm(uploadFile);
  editFormImg.classList.remove('hidden');
  body.classList.add('modal-open');
  console.log(uploadFile.value);
});

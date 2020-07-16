'use strict';
var body = document.querySelector('body');

var createMocKekstagram = window.data.createMocKekstagram;
var drawBigPicture = window.preview.drawBigPicture;
var drawMiniaturePictures = window.picture.drawMiniaturePictures;

var editFormImg = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');

var picturesMoc = createMocKekstagram(25);

drawMiniaturePictures(picturesMoc);

drawBigPicture(picturesMoc);


uploadFile.addEventListener('change', function () {
  editFormImg.classList.remove('hidden');
  body.classList.add('modal-open');
});

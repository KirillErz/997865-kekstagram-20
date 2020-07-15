'use strict';
(function () {
  var picture = document.querySelector('#picture');

  var pictures = document.querySelector('.pictures');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var drawMiniaturePictures = function (picturesArray) {
    var picturesMoc = picturesArray;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picturesMoc.length; i++) {
      var element = picture.content.cloneNode(true);
      element.querySelector('.picture').setAttribute('data-index-number', i);
      element.querySelector('.picture__img').src = picturesMoc[i].url;
      element.querySelector('.picture__likes').textContent = picturesMoc[i].likes;
      element.querySelector('.picture__comments').textContent = picturesMoc[i].comments.length;
      fragment.append(element);

    }
    pictures.append(fragment);
  };


  window.picture = {
    drawMiniaturePictures: drawMiniaturePictures
  };

})();

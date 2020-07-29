'use strict';
(function () {

  var KEY_CODE_ESC = 27;

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var newComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');
  var commentsLoader = document.querySelector('.comments-loader');

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      bigPicture.classList.add('hidden');
    }
  });


  var comments = [];
  var drawBigPicture = function (picturesMoc) {
    pictures.addEventListener('click', function (evt) {
      if (evt.target.closest('a')) {
        var pictureInfo = evt.target.closest('a');
        bigPicture.classList.remove('hidden');
        if(picturesMoc[pictureInfo.dataset.indexNumber]) {
          bigPicture.querySelector('.big-picture__img img').src = picturesMoc[pictureInfo.dataset.indexNumber].url;
          bigPicture.querySelector('.likes-count').textContent = picturesMoc[pictureInfo.dataset.indexNumber].likes;
          bigPicture.querySelector('.comments-count').textContent = picturesMoc[pictureInfo.dataset.indexNumber].comments.length;
          document.querySelector('.social__caption').textContent = picturesMoc[pictureInfo.dataset.indexNumber].description;
          drawComment(picturesMoc[pictureInfo.dataset.indexNumber].comments);
          comments = picturesMoc[pictureInfo.dataset.indexNumber].comments;

        }
      }
    });
  };


  commentsLoader.addEventListener('click', function (evt) {
    drawComment(comments);
  })
  var count = 0;
  var drawComment = function (comments) {
    var commentFragment = document.createDocumentFragment();
    commentFragment.length = 0;
    var max = 5;
    while (count == max) {
      var elementComment = commentTemplate.content.cloneNode(true);
      elementComment.querySelector('.social__picture').src = comment[count].avatar;
      elementComment.querySelector('.social__picture').alt = comment[count].name;
      elementComment.querySelector('.social__text').textContent = comment[count].message;
      commentFragment.append(elementComment);
      count++
    };
    count = comments.length - max;
    //newComments.innerHTML = '';
    newComments.append(commentFragment);

  };
  window.preview = {
    drawBigPicture: drawBigPicture
  };

})();

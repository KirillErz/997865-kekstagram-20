'use strict';
(function () {

  var KEY_CODE_ESC = 27;

  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var newComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC) {
      bigPicture.classList.add('hidden');
    }
  });

  var drawBigPicture = function (picturesMoc) {
    pictures.addEventListener('click', function (evt) {
      if (evt.target.closest('a')) {
        var pictureInfo = evt.target.closest('a');
        bigPicture.classList.remove('hidden');
        bigPicture.querySelector('.big-picture__img img').src = picturesMoc[pictureInfo.dataset.indexNumber].url;
        bigPicture.querySelector('.likes-count').textContent = picturesMoc[pictureInfo.dataset.indexNumber].likes;
        bigPicture.querySelector('.comments-count').textContent = picturesMoc[pictureInfo.dataset.indexNumber].comments.length;
        document.querySelector('.social__caption').textContent = picturesMoc[pictureInfo.dataset.indexNumber].description;
        drawComment(picturesMoc[pictureInfo.dataset.indexNumber].comments);
      }
    });
  };


  var drawComment = function (comments) {
    var commentFragment = document.createDocumentFragment();
    commentFragment.length = 0;

    comments.map(function (comment) {
      var elementComment = commentTemplate.content.cloneNode(true);

      elementComment.querySelector('.social__picture').src = comment.avatar;
      elementComment.querySelector('.social__picture').alt = comment.name;
      elementComment.querySelector('.social__text').textContent = comment.message;
      commentFragment.append(elementComment);
    });

    newComments.innerHTML = '';
    newComments.append(commentFragment);
  };
  window.preview = {
    drawBigPicture: drawBigPicture
  };

})();

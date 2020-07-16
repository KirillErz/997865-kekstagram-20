'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var newComments = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');

  bigPictureCancel.addEventListener('click', function () {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
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
    for (var j = 0; j < comments.length; j++) {
      var elementComment = commentTemplate.content.cloneNode(true);

      elementComment.querySelector('.social__picture').src = comments[j].avatar;
      elementComment.querySelector('.social__picture').alt = comments[j].name;
      elementComment.querySelector('.social__text').textContent = comments[j].message;
      commentFragment.append(elementComment);

    }
    newComments.innerHTML = '';
    newComments.append(commentFragment);
  };
  window.preview = {
    drawBigPicture: drawBigPicture
  };

})();

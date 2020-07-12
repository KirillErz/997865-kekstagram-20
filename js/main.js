'use strict';
var body = document.querySelector('body');

var randomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};


var NAMES = ['kirill', 'julia', 'Fergus', 'Crispin', 'Ellis', 'Piers', 'Conall', 'Kenzie'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var createMocKekstagram = function (quantityObj) {
  var posts = [];
  var arrayOfComments = [];

  for (var i = 0; i < randomInteger(1, 25); i++) {

    var randomNames = randomInteger(0, 7);
    var randomMessage = randomInteger(0, 5);

    arrayOfComments.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: MESSAGES[randomMessage],
      name: NAMES[randomNames]
    });
  }

  for (var j = 1; j <= quantityObj; j++) {
    posts.push({
      url: 'photos/' + (j) + '.jpg',
      description: 'описание фотографии.',
      likes: randomInteger(15, 200),
      comments: arrayOfComments,
    });
  }
  return posts;
};

var picturesMoc = createMocKekstagram(25);
var picture = document.querySelector('#picture');
var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');

for (var i = 0; i < picturesMoc.length; i++) {
  var element = picture.content.cloneNode(true);

  element.querySelector('.picture__img').src = picturesMoc[i].url;
  element.querySelector('.picture__likes').textContent = picturesMoc[i].likes;
  element.querySelector('.picture__comments').textContent = picturesMoc[i].comments.length;
  fragment.append(element);

}
pictures.append(fragment);

var bigPicture = document.querySelector('.big-picture');

var commentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');


commentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

var comments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment');
var commentFragment = document.createDocumentFragment();

for (var j = 0; j < picturesMoc[0].comments.length; j++) {
  var elementComment = commentTemplate.content.cloneNode(true);

  elementComment.querySelector('.social__picture').src = picturesMoc[0].comments[j].avatar;
  elementComment.querySelector('.social__picture').alt = picturesMoc[0].comments[j].name;
  elementComment.querySelector('.social__text').textContent = picturesMoc[0].comments[j].message;
  commentFragment.append(elementComment);

}
comments.append(commentFragment);


var bigPictureCancel = document.querySelector('.big-picture__cancel');

bigPictureCancel.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

var editFormImg = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');

uploadFile.addEventListener('change', function () {
  editFormImg.classList.remove('hidden');
  body.classList.add('modal-open');
});

var showBigPicture = function (img, iterator) {

  img.addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picturesMoc[iterator].url;
    bigPicture.querySelector('.likes-count').textContent = picturesMoc[iterator].likes;
    bigPicture.querySelector('.comments-count').textContent = picturesMoc[iterator].comments.length;
    document.querySelector('.social__caption').textContent = picturesMoc[iterator].description;
  });
};

var listPictures = document.querySelectorAll('.picture');
for (var g = 0; g < listPictures.length; g++) {
  showBigPicture(listPictures[g], g);
}

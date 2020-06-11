'use strict';
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

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').src = picturesMoc[0].url;
bigPicture.querySelector('.likes-count').textContent = picturesMoc[0].likes;
bigPicture.querySelector('.comments-count').textContent = picturesMoc[0].comments.length;
document.querySelector('.social__caption').textContent = picturesMoc[0].description;

var commentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');

body.classList.add('modal-open');
commentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

var comments = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment');
var commentFragment = document.createDocumentFragment();

for (var i = 0; i < picturesMoc[0].comments.length; i++) {
  var elementComment = commentTemplate.content.cloneNode(true);

  elementComment.querySelector('.social__picture').src = picturesMoc[0].comments[i].avatar;
  elementComment.querySelector('.social__picture').alt = picturesMoc[0].comments[i].name;
  elementComment.querySelector('.social__text').textContent = picturesMoc[0].comments[i].message;
  commentFragment.append(elementComment);

}
comments.append(commentFragment);


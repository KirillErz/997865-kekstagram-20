'use strict';
var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};


var NAMES = ['kirill', 'julia', 'Fergus', 'Crispin', 'Ellis', 'Piers', 'Conall', 'Kenzie'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var createMocKekstagram = function (quantityObj) {
  var images = [];
  var arrayOfComments = [];

  for (var i = 0; i < randomInteger(1, 25); i++) {

    var randomNames = randomInteger(1, 8);
    var randomMessage = randomInteger(1, 6);

    arrayOfComments.push({
      avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
      message: MESSAGES[randomNames],
      name: NAMES[randomMessage]
    });
  }

  for (var j = 1; j <= quantityObj; j++) {
    images.push({
      url: 'photos/" + (j) + ".jpg',
      description: 'описание фотографии.',
      likes: randomInteger(15, 200),
      comments: arrayOfComments,
    });
  }
  return images;
};

var picturesMoc = createMocKekstagram(25);
var picture = document.querySelectorAll('#picture');
var fragment = document.createDocumentFragment();
for (var i = 0; i < picturesMoc.length; i++) {

  var element = picture[0].content.cloneNode(true);
  element.querySelector('.picture__img').src = picturesMoc[i].url;
  element.querySelector('.picture__likes').textContent = picturesMoc[i].likes;
  element.querySelector('.picture__comments').textContent = picturesMoc[i].comments.length;
  fragment.append(element);
}

var pictures = document.querySelector('.pictures');
pictures.append(fragment);

'use strict';
(function () {

  var NAMES = ['kirill', 'julia', 'Fergus', 'Crispin', 'Ellis', 'Piers', 'Conall', 'Kenzie'];
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var randomInteger = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

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

  window.data = {
    createMocKekstagram: createMocKekstagram
  };

})();

'use strict';
(function () {

  var updatePictures = window.gallery.updatePictures;

  var pictures = [];

  var getDateFormApi = function (data) {
    pictures = data;
  };

  var imgFiltersForm = document.querySelector('.img-filters__form');

  var randomInteger = function (min, max) {
    var random = min + Math.random() * (max + 1 - min);
    return Math.floor(random);
  };

  var filterArr = ['filter-random', 'filter-discussed', 'filter-default'];

  var removeImgFilter = function (filter, arrFilter) {
    filter.classList.add('img-filters__button--active');
    arrFilter.forEach(function (element) {
      if (element !== filter.id) {
        var id = '#' + element;
        document.querySelector(id).classList.remove('img-filters__button--active');
      }
    });
  };

  var setFilterRandom = function (allPhotosFromAPI, callback) {

    var randomImg = [];
    var quantityPhotos = allPhotosFromAPI.length - 1;

    while (randomImg.length < 10) {

      var index = randomInteger(1, quantityPhotos);
      var photoFromServer = allPhotosFromAPI[index];
      photoFromServer.id = index;

      if (!randomImg.length) {
        randomImg.push(photoFromServer);
      } else {
        for (var i = 0; i < randomImg.length; i++) {
          if (randomImg[i].id !== photoFromServer.id) {
            randomImg.push(photoFromServer);
            break;
          }
        }
      }
    }
    callback(randomImg);
  };

  var setFilterDefault = function (allPhotosFromAPI, callback) {
    var copy = allPhotosFromAPI.slice();
    callback(copy);
  };

  var setFilterDiscussed = function (allPhotosFromAPI, callback) {
    var copy = allPhotosFromAPI.slice();
    copy.sort(function (a, b) {
      return a.comments.length - b.comments.length;
    });
    callback(copy);
  };

  var selectFilter = function (filter) {
    var picturesCopy = pictures.slice();

    switch (filter.id) {
      case 'filter-default':
        removeImgFilter(filter, filterArr);
        setFilterDefault(picturesCopy, function (filteredData) {
          updatePictures(filteredData);
        });
        break;
      case 'filter-random':
        removeImgFilter(filter, filterArr);
        setFilterRandom(picturesCopy, function (filteredData) {
          updatePictures(filteredData);
        });
        break;
      case 'filter-discussed':
        removeImgFilter(filter, filterArr);
        setFilterDiscussed(picturesCopy, function (filteredData) {
          updatePictures(filteredData);
        });
        break;
    }
  };

  imgFiltersForm.addEventListener('click', function (evt) {
    selectFilter(evt.target);
  });

  window.filter = {
    getDateFormApi: getDateFormApi
  };
})();

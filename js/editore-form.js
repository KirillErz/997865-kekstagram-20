'use strict';
(function () {

  var SCALE_STEP = 25;
  var SACALE_DEFAULT = 100;
  var FLAG_FOCUS = true;

  var body = document.querySelector('body');
  var editFormImg = document.querySelector('.img-upload__overlay');
  var cancelEditFormImg = document.querySelector('#upload-cancel');
  var scaleerButtonR = document.querySelector('.scale__control--bigger');
  var scaleerButtonL = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');
  var imgDownloaded = document.querySelector('.img-upload__preview');
  var imgEffects = document.querySelectorAll('.effects__radio');
  var imgEffectsLevel = document.querySelector('.img-upload__effect-level');

  var pin = document.querySelector('.effect-level__pin');
  var effectlevelLine = document.querySelector('.effect-level__line');
  var effectlevelDepth = document.querySelector('.effect-level__depth');
  var effectlevelValue = document.querySelector('.effect-level__value');

  var hashtag = document.querySelector('.text__hashtags');
  var comment = document.querySelector('.text__description');

  var publicForm = document.querySelector('.img-upload__submit');

  scaleValue.value = SACALE_DEFAULT + '%';
  var stepsCount = SACALE_DEFAULT;

  var setScale = function (scale) {
    var imgScale = scale / 100;
    scaleValue.value = scale + '%';
    imgDownloaded.style.transform = 'scale(' + imgScale + ')';
  };

  scaleerButtonR.addEventListener('click', function () {
    if (stepsCount < 100) {
      stepsCount += SCALE_STEP;
      setScale(stepsCount);
    }
  });

  scaleerButtonL.addEventListener('click', function () {
    if (stepsCount > 25) {
      stepsCount -= SCALE_STEP;
      setScale(stepsCount);
    }
  });

  cancelEditFormImg.addEventListener('click', function () {
    editFormImg.classList.add('hidden');
    body.classList.remove('modal-open');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27 && FLAG_FOCUS) {
      editFormImg.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });

  var setFilter = function (filterName) {
    imgDownloaded.style.filter = filterName;
    imgEffectsLevel.classList.remove('hidden');
    pin.style.left = '100%';
    effectlevelDepth.style.width = '100%';
  };

  var setDefaultFilter = function (type) {
    switch (type) {
      case 'none':
        imgEffectsLevel.classList.add('hidden');
        break;
      case 'chrome':
        setFilter('grayscale(1)');
        break;
      case 'sepia':
        setFilter('sepia(1)');
        break;
      case 'marvin':
        setFilter('invert(100%)');
        break;
      case 'phobos':
        setFilter('blur(3px)');
        break;
      case 'heat':
        setFilter('brightness(3)');
        break;
      default:
        return;
    }
  };


  var effectContainer = function () {
    var previousEffect = 'none';
    imgEffectsLevel.classList.add('hidden');
    return function (effect) {
      effect.addEventListener('click', function (evt) {
        var effectName = evt.target.value;
        if (imgDownloaded.classList.contains('effects__preview--' + previousEffect)) {
          imgDownloaded.classList.remove('effects__preview--' + previousEffect);
        }
        imgDownloaded.classList.add('effects__preview--' + effectName);
        setDefaultFilter(effectName);
        previousEffect = effectName;
      });
    };
  };

  var setLevelEffect = function (level) {
    effectlevelValue.value = level;
    if (imgDownloaded.classList.contains('effects__preview--none')) {
      effectlevelValue.value = 0;
    } else if (imgDownloaded.classList.contains('effects__preview--chrome')) {
      imgDownloaded.style.filter = 'grayscale(' + level / 100 + ')';
    } else if (imgDownloaded.classList.contains('effects__preview--sepia')) {
      imgDownloaded.style.filter = 'sepia(' + level / 100 + ')';
    } else if (imgDownloaded.classList.contains('effects__preview--marvin')) {
      imgDownloaded.style.filter = 'invert(' + level + '%' + ')';
    } else if (imgDownloaded.classList.contains('effects__preview--phobos')) {
      imgDownloaded.style.filter = 'blur(' + (level * 3) / 100 + 'px' + ')';
    } else if (imgDownloaded.classList.contains('effects__preview--heat')) {
      imgDownloaded.style.filter = 'brightness(' + (level * 3) / 100 + ')';
    }
  };


  var dragging = function (event) {

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var isDragged = false;

    var onMouseMove = function (moveEvt) {
      isDragged = true;

      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var levelL = pin.offsetLeft - shift.x;
      var levelLinePrecent = ((levelL / effectlevelLine.clientWidth) * 100);
      setLevelEffect(levelLinePrecent.toFixed(1));

      if (levelLinePrecent <= 100 && levelLinePrecent >= 0) {
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';
        effectlevelDepth.style.width = levelLinePrecent + '%';
      } else {
        moveEvt.preventDefault();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pin.removeEventListener('click', onClickPreventDefault);
        };
        pin.addEventListener('click', onClickPreventDefault);
        isDragged = false;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pin.addEventListener('mousedown', function (event) {
    dragging(event);
  });

  var charMatch = new RegExp('^#[а-яА-Яa-zA-Z_0-9]+$');

  hashtag.addEventListener('input', function () {

    // if (charMatch.test(evt.target.value)) {
    //   console.log(evt.target.value);
    // }
    // if (evt.target.value[0] != '#'){
    //   //alert('первый символ долден быть #')
    // }
  });

  publicForm.addEventListener('click', function () {
    var strHashtag = hashtag.value.toLowerCase();

    if (strHashtag[0] === '#' && strHashtag.length > 1 || strHashtag === '') {
      if (strHashtag !== '') {
        var arrHashtag = strHashtag.split(' ');
        for (var i = 0; i < arrHashtag.length; i++) {
          if (arrHashtag[i][0] === '#' && charMatch.test(arrHashtag[i]) && arrHashtag[i].length <= 20) {
            hashtag.setCustomValidity('');
          } else {
            hashtag.setCustomValidity('Неверный формат ввода');
            return;
          }
        }
        if (arrHashtag.length > 5) {
          hashtag.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        }
      } else {
        hashtag.setCustomValidity('');
      }
    } else {
      hashtag.setCustomValidity('Неверный формат ввода');
    }
  });

  comment.addEventListener('focusin', function (evt) {
    FLAG_FOCUS = !evt;
  });

  comment.addEventListener('focusout', function (evt) {
    FLAG_FOCUS = evt;
  });

  hashtag.addEventListener('focusin', function (evt) {
    FLAG_FOCUS = !evt;
  });

  hashtag.addEventListener('focusout', function (evt) {
    FLAG_FOCUS = evt;
  });

  var setEffect = effectContainer();
  for (var i = 0; i < imgEffects.length; i++) {
    setEffect(imgEffects[i]);
  }


  window.form = {

  };

})();

'use strict';
(function () {

  var sendForm = window.serverInteraction.sendForm;

  var SCALE_STEP = 25;
  var SACALE_DEFAULT = 100;
  var KEY_CODE_ESC = 27;

  var fileFocus = true;
  var file;

  var body = document.querySelector('body');
  var editFormImg = document.querySelector('.img-upload__overlay');
  var cancelEditFormImg = document.querySelector('#upload-cancel');
  var scaleerButtonR = document.querySelector('.scale__control--bigger');
  var scaleerButtonL = document.querySelector('.scale__control--smaller');
  var scaleValue = document.querySelector('.scale__control--value');
  var imgDownloaded = document.querySelector('.img-upload__preview');
  var imgEffects = document.querySelectorAll('.effects__radio');
  var imgEffectsLevel = document.querySelector('.img-upload__effect-level');
  var main = document.querySelector('main');

  var pin = document.querySelector('.effect-level__pin');
  var effectlevelLine = document.querySelector('.effect-level__line');
  var effectlevelDepth = document.querySelector('.effect-level__depth');
  var effectlevelValue = document.querySelector('.effect-level__value');

  var hashtag = document.querySelector('.text__hashtags');
  var comment = document.querySelector('.text__description');

  var publicForm = document.querySelector('.img-upload__form');

  var successTemplate = document.querySelector('#success');
  var elementSuccess = successTemplate.content.cloneNode(true);
  var success = elementSuccess.querySelector('.success');
  var successButton = elementSuccess.querySelector('.success__button');

  var errorTemplate = document.querySelector('#error');
  var elementError = errorTemplate.content.cloneNode(true);
  var error = elementError.querySelector('.error');
  var errorButton = elementError.querySelector('.error__button');

  var stepsCount = 0;

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
    clearForm();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE_ESC && fileFocus) {
      editFormImg.classList.add('hidden');
      clearForm();
    }
  });

  var setFilter = function (filterName, efect) {
    imgDownloaded.style.filter = efect;
    if (filterName === 'none') {
      imgEffectsLevel.classList.add('hidden');
    } else {
      imgEffectsLevel.classList.remove('hidden');
    }
    pin.style.left = '100%';
    effectlevelDepth.style.width = '100%';
  };

  var setDefaultFilter = function (type) {
    switch (type) {
      case 'none':
        setFilter('none', '');
        break;
      case 'chrome':
        setFilter('chrome', 'grayscale(1)');
        break;
      case 'sepia':
        setFilter('sepia', 'sepia(1)');
        break;
      case 'marvin':
        setFilter('marvin', 'invert(100%)');
        break;
      case 'phobos':
        setFilter('phobos', 'blur(3px)');
        break;
      case 'heat':
        setFilter('heat', 'brightness(3)');
        break;
      default:
        return;
    }
  };

  var effectContainer = function () {
    var previousEffect = 'none';
    imgEffectsLevel.classList.add('hidden');

    var additionEffect = function (evt) {
      var effectName = evt.target.value;
      if (imgDownloaded.classList.contains('effects__preview--' + previousEffect)) {
        imgDownloaded.classList.remove('effects__preview--' + previousEffect);
      }
      imgDownloaded.classList.add('effects__preview--' + effectName);
      setDefaultFilter(effectName);
      previousEffect = effectName;
    };
    return function (effect) {
      effect.addEventListener('click', additionEffect);
    };
  };

  var setLevelEffect = function (level) {
    effectlevelValue.value = level;
    effectlevelValue.defaultValue = level;
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
      var number = Number(level);
      if (number < 33) {
        number = number + 33.3;
      }
      imgDownloaded.style.filter = 'brightness(' + (number * 3) / 100 + ')';
    }
  };


  var clearForm = function () {
    Array.from(imgEffects).map(function (imgEffect) {

      if (imgDownloaded.classList.contains('effects__preview--' + imgEffect.value)) {
        imgDownloaded.classList.remove('effects__preview--' + imgEffect.value);
        imgEffect.checked = false;
      }

    });

    setDefaultFilter('none');
    hashtag.value = '';
    comment.value = '';
    body.classList.remove('modal-open');
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

  var sendEditedPicture = function (data) {
    sendForm(data, onSuccess, onError);
  };

  var onError = function () {
    editFormImg.classList.add('hidden');

    if (main.querySelector('.error')) {
      error.classList.remove('hidden');
    } else {
      main.append(elementError);
    }
    closePopUp(error, errorButton);
    clearForm();
    publicForm.removeEventListener('submit', validateForm);
  };

  var onSuccess = function (response) {
    if (response.readyState === 4) {
      editFormImg.classList.add('hidden');

      if (main.querySelector('.success')) {
        success.classList.remove('hidden');
      } else {
        main.append(elementSuccess);
      }
      closePopUp(success, successButton);
      clearForm();
      publicForm.removeEventListener('submit', validateForm);
    }
  };

  var closePopUp = function (PopUp, button) {

    button.addEventListener('click', function () {
      PopUp.classList.add('hidden');
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_CODE_ESC) {
        PopUp.classList.add('hidden');
      }
    });

    document.addEventListener('click', function () {
      PopUp.classList.add('hidden');
    });
  };

  var charMatch = new RegExp('^#[а-яА-Яa-zA-Z_0-9]+$');

  var validateForm = function (evt) {
    evt.preventDefault();
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
        } else {
          sendEditedPicture(publicForm);
          file.value = '';
          hashtag.setCustomValidity('');
        }
      } else {
        sendEditedPicture(publicForm);
        file.value = '';
        hashtag.setCustomValidity('');
      }
    } else {
      hashtag.setCustomValidity('Неверный формат ввода');
    }

  };

  comment.addEventListener('focusin', function (evt) {
    fileFocus = !evt;
  });

  comment.addEventListener('focusout', function (evt) {
    fileFocus = evt;
  });

  hashtag.addEventListener('focusin', function (evt) {
    fileFocus = !evt;
  });

  hashtag.addEventListener('focusout', function (evt) {
    fileFocus = evt;
  });

  var openEditingImg = function (uploadFile) {
    file = uploadFile;
    stepsCount = SACALE_DEFAULT;
    scaleValue.value = SACALE_DEFAULT + '%';
    imgEffects[0].checked = true;
    setScale(100);
    var setEffect = effectContainer();
    for (var i = 0; i < imgEffects.length; i++) {
      setEffect(imgEffects[i]);
    }
    publicForm.addEventListener('submit', validateForm);
  };


  window.form = {
    openEditingImg: openEditingImg
  };

})();

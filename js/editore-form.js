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
  var img = document.querySelector('.img-upload__preview');
  var imgEffects = document.querySelectorAll('.effects__radio');
  var imgEffectsLevel = document.querySelector('.img-upload__effect-level');

  var pin = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');
  var levelDepth = document.querySelector('.effect-level__depth');
  var levelValue = document.querySelector('.effect-level__value');

  var hashtag = document.querySelector('.text__hashtags');
  var comment = document.querySelector('.text__description');

  var publicForm = document.querySelector('.img-upload__submit');

  scaleValue.value = SACALE_DEFAULT + '%';
  var stepsCount = SACALE_DEFAULT;

  var setScale = function (scale) {
    var sca = scale / 100;
    scaleValue.value = scale + '%';
    img.style.transform = 'scale(' + sca + ')';
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

  var setDefultFilter = function (type) {
    switch (type) {
      case 'none':
        imgEffectsLevel.classList.add('hidden');
        break;
      case 'chrome':
        img.style.filter = 'grayscale(1)';
        imgEffectsLevel.classList.remove('hidden');
        pin.style.left = '100%';
        levelDepth.style.width = '100%';
        break;
      case 'sepia':
        img.style.filter = 'sepia(1)';
        imgEffectsLevel.classList.remove('hidden');
        pin.style.left = '100%';
        levelDepth.style.width = '100%';
        break;
      case 'marvin':
        img.style.filter = 'invert(100%)';
        imgEffectsLevel.classList.remove('hidden');
        pin.style.left = '100%';
        levelDepth.style.width = '100%';
        break;
      case 'phobos':
        img.style.filter = 'blur(3px)';
        imgEffectsLevel.classList.remove('hidden');
        pin.style.left = '100%';
        levelDepth.style.width = '100%';
        break;
      case 'heat':
        img.style.filter = 'brightness(3)';
        imgEffectsLevel.classList.remove('hidden');
        pin.style.left = '100%';
        levelDepth.style.width = '100%';
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
        if (img.classList.contains('effects__preview--' + previousEffect)) {
          img.classList.remove('effects__preview--' + previousEffect);
        }
        img.classList.add('effects__preview--' + evt.target.value);
        setDefultFilter(evt.target.value);
        previousEffect = evt.target.value;
      });
    };
  };

  var setLevelEffect = function (level) {
    levelValue.value = level;
    if (img.classList.contains('effects__preview--none')) {
      levelValue.value = 0;
    } else if (img.classList.contains('effects__preview--chrome')) {

      img.style.filter = 'grayscale(' + level / 100 + ')';

    } else if (img.classList.contains('effects__preview--sepia')) {

      img.style.filter = 'sepia(' + level / 100 + ')';

    } else if (img.classList.contains('effects__preview--marvin')) {

      img.style.filter = 'invert(' + level + '%' + ')';

    } else if (img.classList.contains('effects__preview--phobos')) {

      img.style.filter = 'blur(' + (level * 3) / 100 + 'px' + ')';

    } else if (img.classList.contains('effects__preview--heat')) {

      img.style.filter = 'brightness(' + (level * 3) / 100 + ')';
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
      var levelLinePrecent = ((levelL / levelLine.clientWidth) * 100);
      setLevelEffect(levelLinePrecent.toFixed(1));

      if (levelLinePrecent <= 100 && levelLinePrecent >= 0) {
        pin.style.left = (pin.offsetLeft - shift.x) + 'px';
        levelDepth.style.width = levelLinePrecent + '%';
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

  var charMatch = new RegExp('^#[а-яА-Яa-zA-Z_0-9]*$');

  hashtag.addEventListener('input', function () {

    // if (charMatch.test(evt.target.value)) {
    //   console.log(evt.target.value);
    // }
    // if (evt.target.value[0] != '#'){
    //   //alert('первый символ долден быть #')
    // }
  });

  publicForm.addEventListener('click', function () {

    if (charMatch.test(hashtag.value) && hashtag.value.trim() !== '' && hashtag.value.length > 1 && hashtag.value.length <= 20 || hashtag.value === '') {
      return;
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

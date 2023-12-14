const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = imgUploadOverlay.querySelector('.cancel');
const inputList = imgUploadOverlay.querySelectorAll('input, textarea');
const hashTagInput = imgUploadOverlay.querySelector('.text__hashtags');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const scaleControlList = imgUploadOverlay.querySelector('.scale');
const controlSmaller = scaleControlList.children[0];
const controlValue = scaleControlList.children[1];
const controlBigger = scaleControlList.children[2];
const effectList = imgUploadOverlay.querySelectorAll('.effects__radio');
const formSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const pictureOverlay = imgUploadOverlay.querySelector('img');
const hiddenValue = imgUploadOverlay.querySelector('.effect-level__value');

const showForm = () => {
  uploadFile.addEventListener('input', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  cancelButton.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';

    inputList.forEach((inputItem) => {
      inputItem.value = '';
    });
  });

  document.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 27) {
      imgUploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadFile.value = '';

      inputList.forEach((inputItem) => {
        inputItem.value = '';
      });
    }
  });

  inputList.forEach((item) => {
    item.addEventListener('focus', (evt) => {
      evt.stopPropagation();
    });
  });

  const hashTagRe = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  hashTagInput.addEventListener('input', (evt) => {
    hashTagInput.value.split(' ').forEach((hashTag) => {
      if (!hashTagRe.test(hashTag)) {
        evt.preventDefault();
        submitButton.setAttribute('disabled', true);
      } else {
        submitButton.removeAttribute('disabled');
      }
    });
  });
  controlValue.value = '100%';
  controlSmaller.addEventListener('click', () => {
    if (Number(controlValue.value.slice(0, -1)) > 25) {
      controlValue.value = `${Number(controlValue.value.slice(0, -1)) - 25}%`;
      pictureOverlay.style.transform = `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
    }
  });
  controlBigger.addEventListener('click', () => {
    if (Number(controlValue.value.slice(0, -1)) < 100) {
      controlValue.value = `${Number(controlValue.value.slice(0, -1)) + 25}%`;
      pictureOverlay.style.transform= `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
    }
  });
  noUiSlider.create(formSlider, {
    range: {
      min: 1,
      max: 3,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  formSlider.classList.add('hidden');
  effectList.forEach((effectItem) => {
    effectItem.addEventListener('click', () => {
      pictureOverlay.className = '';
      formSlider.classList.add('hidden');
      if (effectItem.value !== 'none') {
        pictureOverlay.className = '';
        pictureOverlay.classList.add(`effects__preview--${effectItem.value}`);
        formSlider.classList.remove('hidden');
        if(pictureOverlay.classList.contains('effects__preview--chrome')) {
          formSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
            connect: 'lower',
          });
        }
        if(pictureOverlay.classList.contains('effects__preview--sepia')) {
          formSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
            connect: 'lower',
          });
        }
        if(pictureOverlay.classList.contains('effects__preview--marvin')) {
          formSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
            connect: 'lower',
          });
        }
        if(pictureOverlay.classList.contains('effects__preview--phobos')) {
          formSlider.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
            connect: 'lower',
          });
        }
        if(pictureOverlay.classList.contains('effects__preview--heat')) {
          formSlider.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
            connect: 'lower',
          });
        }
      }
    });
  });
  formSlider.noUiSlider.on('update', () => {
    if (pictureOverlay.className==='') {
      pictureOverlay.filter = 'none';
    }
    const fixedValue = Number(formSlider.noUiSlider.get());
    hiddenValue.value = fixedValue;
    if(pictureOverlay.classList.contains('effects__preview--chrome')) {
      pictureOverlay.style.filter = `grayscale(${fixedValue})`;
    }
    if(pictureOverlay.classList.contains('effects__preview--sepia')) {
      pictureOverlay.style.filter = `sepia(${fixedValue})`;
    }
    if(pictureOverlay.classList.contains('effects__preview--marvin')) {
      pictureOverlay.style.filter = `invert(${fixedValue}%)`;
    }
    if(pictureOverlay.classList.contains('effects__preview--phobos')) {
      pictureOverlay.style.filter = `blur(${fixedValue}px)`;
    }
    if(pictureOverlay.classList.contains('effects__preview--heat')) {
      pictureOverlay.style.filter = `brightness(${fixedValue})`;
    }
  });
};

export { showForm };

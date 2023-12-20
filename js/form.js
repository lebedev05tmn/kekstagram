import {createError} from './data.js';

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = imgUploadOverlay.querySelector('.cancel');
const inputList = imgUploadOverlay.querySelectorAll('input:not(input[type=radio]), textarea');
const radioList = imgUploadOverlay.querySelectorAll('input[type=radio]');
const hashTagInput = imgUploadOverlay.querySelector('.text__hashtags');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');
const formUpload = document.forms.upload;
const scaleControlList = imgUploadOverlay.querySelector('.scale');
const controlSmaller = scaleControlList.children[0];
const controlValue = scaleControlList.children[1];
const controlBigger = scaleControlList.children[2];
const effectList = imgUploadOverlay.querySelectorAll('.effects__radio');
const formSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const pictureOverlay = imgUploadOverlay.querySelector('img');
const hiddenValue = imgUploadOverlay.querySelector('.effect-level__value');
const successMessage = document.querySelector('#success').content.children[0];
const successButton = successMessage.children[0].children[1];

const showForm = () => {
  uploadFile.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
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
      pictureOverlay.style.transform = `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
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
      pictureOverlay.style.filter = 'none';
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
    const fixedValue = Number(formSlider.noUiSlider.get());
    hiddenValue.value = fixedValue;
    if(pictureOverlay.classList.contains('effects__preview--none')) {
      pictureOverlay.style.filter = 'sepia(0)';
    }
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
  uploadFile.addEventListener('input', () => {
    pictureOverlay.src = URL.createObjectURL(uploadFile.files[0]);
  });
  formUpload.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(formUpload);
    fetch(' https://25.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body: formData,
    }).then(()=>{
      inputList.forEach((inputItem) => {
        inputItem.value = '';
      });
      uploadFile.value = '';
      controlValue.value = '100%';
      pictureOverlay.style.transform = `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
      formSlider.noUiSlider.set(100);
      pictureOverlay.className = '';
      pictureOverlay.style.filter = 'none';
      imgUploadOverlay.classList.add('hidden');
      radioList.forEach((item) => {
        item.removeAttribute('checked');
      });
      radioList[0].setAttribute('checked', 'checked');
      formSlider.classList.add('hidden');
      document.body.append(successMessage);
      successButton.addEventListener('click', () => {
        document.body.classList.remove('modal-open');
        document.body.removeChild(successMessage);
      });
    }).catch((error) => {
      createError(error, 1);
    });
  });
  cancelButton.addEventListener('click', () => {
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFile.value = '';
    controlValue.value = '100%';
    pictureOverlay.style.transform = `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
    formSlider.noUiSlider.set(100);
    radioList.forEach((item) => {
      item.removeAttribute('checked');
    });
    radioList[0].setAttribute('checked', 'checked');
    formSlider.classList.add('hidden');
    pictureOverlay.className = '';
    pictureOverlay.style.filter = 'none';

    inputList.forEach((inputItem) => {
      inputItem.value = '';
    });
  });
  document.addEventListener('keydown', (evt) => {
    if(evt.keyCode === 27) {
      imgUploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadFile.value = '';
      controlValue.value = '100%';
      pictureOverlay.style.transform = `scale(${(Number(controlValue.value.slice(0, -1)) / 100)})`;
      formSlider.noUiSlider.set(100);
      radioList.forEach((item) => {
        item.removeAttribute('checked');
      });
      radioList[0].setAttribute('checked', 'checked');
      formSlider.classList.add('hidden');
      pictureOverlay.className = '';
      pictureOverlay.style.filter = 'none';

      inputList.forEach((inputItem) => {
        inputItem.value = '';
      });
    }
  });
};

export { showForm };

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = imgUploadOverlay.querySelector('.cancel');
const inputList = imgUploadOverlay.querySelectorAll('input, textarea');
const hashTagInput = imgUploadOverlay.querySelector('.text__hashtags');
const submitButton = imgUploadOverlay.querySelector('.img-upload__submit');

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

  inputList.forEach((item)=>{
    item.addEventListener('focus', (evt) => {
      evt.stopPropagation();
    });
  });

  const hashTagRe = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  hashTagInput.addEventListener('input', (evt) => {
    hashTagInput.value.split(' ').forEach((hashTag) => {
      if (!hashTagRe.test(hashTag)) {
        evt.preventDefault();
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    });
  });
};

export { showForm };

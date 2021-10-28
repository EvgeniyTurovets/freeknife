@@include('micromodal.min.js');
document.addEventListener("DOMContentLoaded", function () {
  // Меню бургер
  const burgerBtn = document.querySelector('.burger');
  const headerMenu = document.querySelector('.menu');
  const wrapper = document.querySelector('.wrapper');

  burgerBtn.onclick = function () {
    burgerBtn.classList.toggle('burger_active');
    headerMenu.classList.toggle('active');
    wrapper.classList.toggle('menu-active');
  };

  const menuItem = document.querySelector('.menu__item-schedule');

  menuItem.onclick = function () {
    burgerBtn.classList.remove('burger_active');
    headerMenu.classList.remove('active');
    wrapper.classList.remove('menu-active');
  };

  // Кнопка вернутся на главную
  const backBtn = document.querySelectorAll('.section-heading__back');
  const schedulePage = document.querySelector('.schedule');

  backBtn.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.closest('.page').classList.remove('page--show');
      burgerBtn.classList.remove('burger_active');
      headerMenu.classList.remove('active');
      schedulePage.classList.add('page--show');
    }
  })

  // Переход по страницам
  function initPageTransition() {
    let pageBtn = document.querySelectorAll('.page-btn');

    pageBtn.forEach((button) => {
      let interactivePage = button.dataset.page;

      button.addEventListener('click', () => {
        // pageBtn.forEach((b) => {
        //   b.classList.remove('active')
        // })
        // button.classList.add('active')
        //Получаем блок, который нужно показать
        let block = document.querySelector(interactivePage);
        //Получаем все остальнные блоки, чтобы их скрыть
        let allBlocks = document.querySelectorAll('.page');
        //Скрываем блоки
        allBlocks.forEach(item => {
          item.classList.remove('page--show')// класс для скрытыя
        });
        toggleClass({
          items: allBlocks,
          className: 'page--show',
          add: false
        })
        //Показываем нужный блок
        if (block) {
          block.classList.add('page--show')
        }
      })
    })
  }
  initPageTransition()


  const scheduleBtn = document.querySelectorAll('.schedule__title')

  scheduleBtn.forEach(item => {
    item.addEventListener('click', (e) => {

      item.closest('.schedule__box').classList.toggle('active')
    })
  })


  function toggleClass({ items, className, findItem = null, add = true }) {
    try {
      if (typeof (items) === 'object') {
        items.forEach(i => {
          if (typeof findItem == 'function') {
            if (add == true) {
              findItem(i).classList.add(className)
            } else {
              findItem(i).classList.remove(className)
            }
          } else {
            if (add == true) {
              i.classList.add(className)
            } else {
              i.classList.remove(className)
            }
          }
        })
      } else {
        return false
      }
    } catch (e) {
      console.log(e)
      return false
    }
  }

  // Клик на кнопку Запись закончена
  const btnOver = document.querySelectorAll('.btn__over_icon');

  btnOver.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.classList.toggle('icon-bell-slash');
      elem.classList.toggle('icon-bell');
    }
  })

  // Клик на чекбокс возле студента
  const checkboxStudent = document.querySelectorAll('.signed-up__checkbox-icon');

  checkboxStudent.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.closest('.signed-up__label').classList.toggle('active')
    }
  })

  // Клик на кнопку Показать ссылку
  const showLinkBtn = document.querySelector('.link-add');
  const showLink = document.querySelector('.generate-link');

  showLinkBtn.onclick = function () {
    showLink.classList.add('active');
  };

  // Клик на кнопку Скопировать ссылку
  const copyLink = document.querySelector('.link-copy');
  const copyLinkInput = document.querySelector('.link-invite');

  copyLink.onclick = function () {
    navigator.clipboard.writeText(copyLinkInput.value)
  };

  // Клик на кнопку Скрыть ссылку
  const hideLink = document.querySelector('.link-remove');

  hideLink.onclick = function () {
    showLink.classList.remove('active');
  };


  // Модальные окна
  MicroModal.init({
    onShow: modal => { }, // [1]
    onClose: modal => {
      let evenetForm = modal.querySelector('.event-form')
      if (evenetForm) {
        delete evenetForm.dataset.eventBlockId
      }
    }, // [2]
    // openTrigger: 'data-custom-open', // [3]
    // closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // [10]
  });

  // Добавить оплату
  let paymentPlus = document.querySelectorAll('.add-payment__plus');
  let paymentMinus = document.querySelectorAll('.add-payment__minus');

  paymentPlus.forEach(function (elem) {
    elem.onclick = function (e) {
      let paymentWrapper = elem.closest('.add-payment__box')
      let paymentInput = paymentWrapper.querySelector('.add-payment__input')

      if (paymentInput) {
        let value = parseInt(paymentInput.value)
        paymentInput.value = ++value
      }
    }
  })

  paymentMinus.forEach(function (elem) {
    elem.onclick = function (e) {
      let paymentWrapper = elem.closest('.add-payment__box')
      let paymentInput = paymentWrapper.querySelector('.add-payment__input')

      if (paymentInput) {
        let value = parseInt(paymentInput.value)
        value = (value - 1) >= 0 ? --value : value
        paymentInput.value = value
      }
    }
  })

  const addStudent = document.querySelectorAll('.btn__add');

  addStudent.forEach(function (elem) {
    elem.onclick = function (e) {
      let studentList = elem.closest('.schedule__lesson').querySelector('.signed-up')
      let form = document.querySelector('#add-student-form').cloneNode(true)
      form.id = ''
      form.classList.remove('hiden')
      form.addEventListener('reset', (e) => {
        form.remove()
      })
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const formValues = Array.from(formData.entries())

        let formObj = {};
        for (let pair of formData.entries()) {
          formObj[pair[0]] = pair[1]
        }
        if (formObj.name == undefined) {
          return
        }
        let studentLi = document.createElement('li')
        studentLi.classList.add('signed-up__student')
        let studentRow = '<div>'
          + '<label class="signed-up__label">'
          + '   <input type="checkbox" class="signed-up__checkbox">'
          + '   <span class="signed-up__checkbox-icon"></span>'
          + '</label>'
          + '<span class="signed-up__name page-btn italic" data-page="#balance">' + formObj.name + '</span>'
          + '</div>'
          + '<div class="signed-up__log-out">'
          + '  <span class="signed-up__counter">8</span>'
          + '  <button class="btn__log-out">'
          + '    <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">'
          + '      <path d="M37.5 76C58.2107 76 75 59.2107 75 38.5C75 17.7893 58.2107 1 37.5 1C16.7893 1 0 17.7893 0 38.5C0 59.2107 16.7893 76 37.5 76Z" fill="#C22D22" />'
          + '      <path d="M24.2856 23.4695L23.1799 24.5981C22.519 25.2728 22.5302 26.3554 23.2048 27.0163L49.3358 52.6146C50.0104 53.2755 51.0931 53.2643 51.7539 52.5897L52.8596 51.461C53.5205 50.7864 53.5093 49.7037 52.8347 49.0428L26.7038 23.4446C26.0291 22.7837 24.9465 22.7948 24.2856 23.4695Z" fill="white" />'
          + '      <path d="M52.5828 24.2885L51.4542 23.1829C50.7795 22.522 49.6969 22.5331 49.036 23.2078L23.4377 49.3387C22.7769 50.0134 22.788 51.096 23.4626 51.7569L24.5913 52.8626C25.266 53.5234 26.3486 53.5123 27.0095 52.8377L52.6077 26.7067C53.2686 26.0321 53.2575 24.9494 52.5828 24.2885Z" fill="white" />'
          + '    </svg>'
          + '  </button>'
          + '</div>'
        console.log(studentLi)
        studentLi.innerHTML = studentRow
        studentList.append(studentLi)
        form.remove()
      })
      studentList.after(form)
    }
  })

  const addCoach = document.querySelectorAll('.add-coach');
  const eventModalBtn = document.querySelectorAll('.js-open-event-modal');

  eventModalBtn.forEach(function (elem) {
    elem.onclick = function (e) {
      let scheduleBoxId = elem.dataset.scheduleId
      let evenetForm = document.querySelector('#modal-1').querySelector('.event-form')
      if (evenetForm) {
        evenetForm.dataset.eventBlockId = scheduleBoxId
      }
    }
  })

  addCoach.forEach(function (elem) {
    elem.addEventListener('click', (e) => {
      e.preventDefault()
      let selectCoach = elem.closest('.settings__coach').querySelector('.coach-select');
      let eventBlockForm = elem.closest('.event-form')
      let coachList = eventBlockForm.querySelector('.settings__inner')
      if (selectCoach.value && coachList) {
        console.log(selectCoach.value, coachList)
        let coachDiv = document.createElement('div')
        coachDiv.classList.add('settings__coach')
        let coachRow = `${selectCoach.value}<button type="button" class="btn__log-out"><svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.5 76C58.2107 76 75 59.2107 75 38.5C75 17.7893 58.2107 1 37.5 1C16.7893 1 0 17.7893 0 38.5C0 59.2107 16.7893 76 37.5 76Z" fill="#C22D22" />
            <path d="M24.2856 23.4695L23.1799 24.5981C22.519 25.2728 22.5302 26.3554 23.2048 27.0163L49.3358 52.6146C50.0104 53.2755 51.0931 53.2643 51.7539 52.5897L52.8596 51.461C53.5205 50.7864 53.5093 49.7037 52.8347 49.0428L26.7038 23.4446C26.0291 22.7837 24.9465 22.7948 24.2856 23.4695Z" fill="white" />
            <path d="M52.5828 24.2885L51.4542 23.1829C50.7795 22.522 49.6969 22.5331 49.036 23.2078L23.4377 49.3387C22.7769 50.0134 22.788 51.096 23.4626 51.7569L24.5913 52.8626C25.266 53.5234 26.3486 53.5123 27.0095 52.8377L52.6077 26.7067C53.2686 26.0321 53.2575 24.9494 52.5828 24.2885Z" fill="white" />
            </svg>
          </button>`
        coachDiv.innerHTML = coachRow
        coachList.append(coachDiv)
      }
      // if (eventBlockForm) {
      //   let eventBlockId = eventBlockForm.dataset.eventBlockId
      //   if (eventBlockId) {
      //     let eventBlock = document.querySelector('#' + eventBlockId)
      //     console.log(eventBlock)
      //   }
      // }
    })
  })
});

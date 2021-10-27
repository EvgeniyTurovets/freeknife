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
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
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
});

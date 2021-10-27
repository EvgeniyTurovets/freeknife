"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).MicroModal = t();
}(void 0, function () {
  "use strict";

  function e(e, t) {
    for (var o = 0; o < t.length; o++) {
      var n = t[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  function t(e) {
    return function (e) {
      if (Array.isArray(e)) return o(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return o(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(n);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return o(e, t);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function o(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var o = 0, n = new Array(t); o < t; o++) {
      n[o] = e[o];
    }

    return n;
  }

  var n,
      i,
      a,
      r,
      s,
      l = (n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], i = function () {
    function o(e) {
      var n = e.targetModal,
          i = e.triggers,
          a = void 0 === i ? [] : i,
          r = e.onShow,
          s = void 0 === r ? function () {} : r,
          l = e.onClose,
          c = void 0 === l ? function () {} : l,
          d = e.openTrigger,
          u = void 0 === d ? "data-micromodal-trigger" : d,
          f = e.closeTrigger,
          h = void 0 === f ? "data-micromodal-close" : f,
          v = e.openClass,
          m = void 0 === v ? "is-open" : v,
          g = e.disableScroll,
          b = void 0 !== g && g,
          y = e.disableFocus,
          p = void 0 !== y && y,
          w = e.awaitCloseAnimation,
          E = void 0 !== w && w,
          k = e.awaitOpenAnimation,
          M = void 0 !== k && k,
          C = e.debugMode,
          A = void 0 !== C && C;
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, o), this.modal = document.getElementById(n), this.config = {
        debugMode: A,
        disableScroll: b,
        openTrigger: u,
        closeTrigger: h,
        openClass: m,
        onShow: s,
        onClose: c,
        awaitCloseAnimation: E,
        awaitOpenAnimation: M,
        disableFocus: p
      }, a.length > 0 && this.registerTriggers.apply(this, t(a)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
    }

    var i, a, r;
    return i = o, (a = [{
      key: "registerTriggers",
      value: function value() {
        for (var e = this, t = arguments.length, o = new Array(t), n = 0; n < t; n++) {
          o[n] = arguments[n];
        }

        o.filter(Boolean).forEach(function (t) {
          t.addEventListener("click", function (t) {
            return e.showModal(t);
          });
        });
      }
    }, {
      key: "showModal",
      value: function value() {
        var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;

        if (this.activeElement = document.activeElement, this.modal.setAttribute("aria-hidden", "false"), this.modal.classList.add(this.config.openClass), this.scrollBehaviour("disable"), this.addEventListeners(), this.config.awaitOpenAnimation) {
          var o = function t() {
            e.modal.removeEventListener("animationend", t, !1), e.setFocusToFirstNode();
          };

          this.modal.addEventListener("animationend", o, !1);
        } else this.setFocusToFirstNode();

        this.config.onShow(this.modal, this.activeElement, t);
      }
    }, {
      key: "closeModal",
      value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            t = this.modal;

        if (this.modal.setAttribute("aria-hidden", "true"), this.removeEventListeners(), this.scrollBehaviour("enable"), this.activeElement && this.activeElement.focus && this.activeElement.focus(), this.config.onClose(this.modal, this.activeElement, e), this.config.awaitCloseAnimation) {
          var o = this.config.openClass;
          this.modal.addEventListener("animationend", function e() {
            t.classList.remove(o), t.removeEventListener("animationend", e, !1);
          }, !1);
        } else t.classList.remove(this.config.openClass);
      }
    }, {
      key: "closeModalById",
      value: function value(e) {
        this.modal = document.getElementById(e), this.modal && this.closeModal();
      }
    }, {
      key: "scrollBehaviour",
      value: function value(e) {
        if (this.config.disableScroll) {
          var t = document.querySelector("body");

          switch (e) {
            case "enable":
              Object.assign(t.style, {
                overflow: ""
              });
              break;

            case "disable":
              Object.assign(t.style, {
                overflow: "hidden"
              });
          }
        }
      }
    }, {
      key: "addEventListeners",
      value: function value() {
        this.modal.addEventListener("touchstart", this.onClick), this.modal.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onKeydown);
      }
    }, {
      key: "removeEventListeners",
      value: function value() {
        this.modal.removeEventListener("touchstart", this.onClick), this.modal.removeEventListener("click", this.onClick), document.removeEventListener("keydown", this.onKeydown);
      }
    }, {
      key: "onClick",
      value: function value(e) {
        e.target.hasAttribute(this.config.closeTrigger) && this.closeModal(e);
      }
    }, {
      key: "onKeydown",
      value: function value(e) {
        27 === e.keyCode && this.closeModal(e), 9 === e.keyCode && this.retainFocus(e);
      }
    }, {
      key: "getFocusableNodes",
      value: function value() {
        var e = this.modal.querySelectorAll(n);
        return Array.apply(void 0, t(e));
      }
    }, {
      key: "setFocusToFirstNode",
      value: function value() {
        var e = this;

        if (!this.config.disableFocus) {
          var t = this.getFocusableNodes();

          if (0 !== t.length) {
            var o = t.filter(function (t) {
              return !t.hasAttribute(e.config.closeTrigger);
            });
            o.length > 0 && o[0].focus(), 0 === o.length && t[0].focus();
          }
        }
      }
    }, {
      key: "retainFocus",
      value: function value(e) {
        var t = this.getFocusableNodes();
        if (0 !== t.length) if (t = t.filter(function (e) {
          return null !== e.offsetParent;
        }), this.modal.contains(document.activeElement)) {
          var o = t.indexOf(document.activeElement);
          e.shiftKey && 0 === o && (t[t.length - 1].focus(), e.preventDefault()), !e.shiftKey && t.length > 0 && o === t.length - 1 && (t[0].focus(), e.preventDefault());
        } else t[0].focus();
      }
    }]) && e(i.prototype, a), r && e(i, r), o;
  }(), a = null, r = function r(e) {
    if (!document.getElementById(e)) return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e, "'"), "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "ID somewhere in your code. Refer example below to resolve it."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<div class="modal" id="'.concat(e, '"></div>')), !1;
  }, s = function s(e, t) {
    if (function (e) {
      e.length <= 0 && (console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", "data attribute."), console.warn("%cExample:", "background-color: #f8f9fa;color: #50596c;font-weight: bold;", '<a href="#" data-micromodal-trigger="my-modal"></a>'));
    }(e), !t) return !0;

    for (var o in t) {
      r(o);
    }

    return !0;
  }, {
    init: function init(e) {
      var o = Object.assign({}, {
        openTrigger: "data-micromodal-trigger"
      }, e),
          n = t(document.querySelectorAll("[".concat(o.openTrigger, "]"))),
          r = function (e, t) {
        var o = [];
        return e.forEach(function (e) {
          var n = e.attributes[t].value;
          void 0 === o[n] && (o[n] = []), o[n].push(e);
        }), o;
      }(n, o.openTrigger);

      if (!0 !== o.debugMode || !1 !== s(n, r)) for (var l in r) {
        var c = r[l];
        o.targetModal = l, o.triggers = t(c), a = new i(o);
      }
    },
    show: function show(e, t) {
      var o = t || {};
      o.targetModal = e, !0 === o.debugMode && !1 === r(e) || (a && a.removeEventListeners(), (a = new i(o)).showModal());
    },
    close: function close(e) {
      e ? a.closeModalById(e) : a.closeModal();
    }
  });
  return window.MicroModal = l, l;
});
;
document.addEventListener("DOMContentLoaded", function () {
  // Меню бургер
  var burgerBtn = document.querySelector('.burger');
  var headerMenu = document.querySelector('.menu');
  var wrapper = document.querySelector('.wrapper');

  burgerBtn.onclick = function () {
    burgerBtn.classList.toggle('burger_active');
    headerMenu.classList.toggle('active');
    wrapper.classList.toggle('menu-active');
  };

  var menuItem = document.querySelector('.menu__item-schedule');

  menuItem.onclick = function () {
    burgerBtn.classList.remove('burger_active');
    headerMenu.classList.remove('active');
    wrapper.classList.remove('menu-active');
  }; // Кнопка вернутся на главную


  var backBtn = document.querySelectorAll('.section-heading__back');
  var schedulePage = document.querySelector('.schedule');
  backBtn.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.closest('.page').classList.remove('page--show');
      burgerBtn.classList.remove('burger_active');
      headerMenu.classList.remove('active');
      schedulePage.classList.add('page--show');
    };
  }); // Переход по страницам

  function initPageTransition() {
    var pageBtn = document.querySelectorAll('.page-btn');
    pageBtn.forEach(function (button) {
      var interactivePage = button.dataset.page;
      button.addEventListener('click', function () {
        // pageBtn.forEach((b) => {
        //   b.classList.remove('active')
        // })
        // button.classList.add('active')
        //Получаем блок, который нужно показать
        var block = document.querySelector(interactivePage); //Получаем все остальнные блоки, чтобы их скрыть

        var allBlocks = document.querySelectorAll('.page'); //Скрываем блоки

        allBlocks.forEach(function (item) {
          item.classList.remove('page--show'); // класс для скрытыя
        });
        toggleClass({
          items: allBlocks,
          className: 'page--show',
          add: false
        }); //Показываем нужный блок

        if (block) {
          block.classList.add('page--show');
        }
      });
    });
  }

  initPageTransition();
  var scheduleBtn = document.querySelectorAll('.schedule__title');
  scheduleBtn.forEach(function (item) {
    item.addEventListener('click', function (e) {
      item.closest('.schedule__box').classList.toggle('active');
    });
  });

  function toggleClass(_ref) {
    var items = _ref.items,
        className = _ref.className,
        _ref$findItem = _ref.findItem,
        findItem = _ref$findItem === void 0 ? null : _ref$findItem,
        _ref$add = _ref.add,
        add = _ref$add === void 0 ? true : _ref$add;

    try {
      if (_typeof(items) === 'object') {
        items.forEach(function (i) {
          if (typeof findItem == 'function') {
            if (add == true) {
              findItem(i).classList.add(className);
            } else {
              findItem(i).classList.remove(className);
            }
          } else {
            if (add == true) {
              i.classList.add(className);
            } else {
              i.classList.remove(className);
            }
          }
        });
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  } // Клик на кнопку Запись закончена


  var btnOver = document.querySelectorAll('.btn__over_icon');
  btnOver.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.classList.toggle('icon-bell-slash');
      elem.classList.toggle('icon-bell');
    };
  }); // Клик на чекбокс возле студента

  var checkboxStudent = document.querySelectorAll('.signed-up__checkbox-icon');
  checkboxStudent.forEach(function (elem) {
    elem.onclick = function (e) {
      elem.closest('.signed-up__label').classList.toggle('active');
    };
  }); // Клик на кнопку Показать ссылку

  var showLinkBtn = document.querySelector('.link-add');
  var showLink = document.querySelector('.generate-link');

  showLinkBtn.onclick = function () {
    showLink.classList.add('active');
  }; // Клик на кнопку Скопировать ссылку


  var copyLink = document.querySelector('.link-copy');
  var copyLinkInput = document.querySelector('.link-invite');

  copyLink.onclick = function () {
    navigator.clipboard.writeText(copyLinkInput.value);
  }; // Клик на кнопку Скрыть ссылку


  var hideLink = document.querySelector('.link-remove');

  hideLink.onclick = function () {
    showLink.classList.remove('active');
  }; // Модальные окна


  MicroModal.init({
    onShow: function onShow(modal) {
      return console.info("".concat(modal.id, " is shown"));
    },
    // [1]
    onClose: function onClose(modal) {
      return console.info("".concat(modal.id, " is hidden"));
    },
    // [2]
    // openTrigger: 'data-custom-open', // [3]
    // closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open',
    // [5]
    disableScroll: true,
    // [6]
    disableFocus: false,
    // [7]
    awaitOpenAnimation: false,
    // [8]
    awaitCloseAnimation: false,
    // [9]
    debugMode: true // [10]

  }); // Добавить оплату

  var paymentPlus = document.querySelectorAll('.add-payment__plus');
  var paymentMinus = document.querySelectorAll('.add-payment__minus');
  paymentPlus.forEach(function (elem) {
    elem.onclick = function (e) {
      var paymentWrapper = elem.closest('.add-payment__box');
      var paymentInput = paymentWrapper.querySelector('.add-payment__input');

      if (paymentInput) {
        var value = parseInt(paymentInput.value);
        paymentInput.value = ++value;
      }
    };
  });
  paymentMinus.forEach(function (elem) {
    elem.onclick = function (e) {
      var paymentWrapper = elem.closest('.add-payment__box');
      var paymentInput = paymentWrapper.querySelector('.add-payment__input');

      if (paymentInput) {
        var value = parseInt(paymentInput.value);
        value = value - 1 >= 0 ? --value : value;
        paymentInput.value = value;
      }
    };
  });
});
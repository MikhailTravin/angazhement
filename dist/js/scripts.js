const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

const iconMenu = document.querySelector('.icon-menu');
const headerBody = document.querySelector('.header-menu');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();

    if (document.documentElement.classList.contains('search-open')) {
      if (typeof closeSearch === 'function') {
        closeSearch();
      } else {
        document.documentElement.classList.remove('search-open');
        const searchBlockLocal = document.querySelector('.header-search');
        const searchInputLocal = document.querySelector('.header-search input');
        if (searchBlockLocal) {
          searchBlockLocal.classList.remove('active');
        }
        if (searchInputLocal) {
          searchInputLocal.value = '';
        }
        const headerSearch = document.querySelector('.header-search');
        if (headerSearch) {
          headerSearch.style.width = '';
        }
      }
    }

    document.documentElement.classList.toggle("menu-open");
  });

  document.addEventListener('click', function (e) {
    const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
    const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);

    if (!isClickInsideHeaderBody && !isClickOnMenuIcon) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

const menuItems = document.querySelectorAll('.header-menu__item');

if (menuItems) {
  function handleArrowClick(event) {
    if (window.innerWidth <= 1100) {
      const menuItem = this.closest('.header-menu__item');
      if (menuItem) {
        event.stopPropagation();
        menuItem.classList.toggle('active');
      }
    }
  }

  function handleBackClick(event) {
    if (window.innerWidth <= 1100) {
      const menuItem = this.closest('.header-menu__item');
      if (menuItem) {
        event.stopPropagation();
        menuItem.classList.remove('active');
      }
    }
  }

  menuItems.forEach(item => {
    const arrow = item.querySelector('.header-menu-arrow');
    if (arrow) {
      arrow.addEventListener('click', handleArrowClick);
    }

    const backButton = item.querySelector('.header-menu__back');
    if (backButton) {
      backButton.addEventListener('click', handleBackClick);
    }
  });

  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 1100) {
      const isClickInsideMenu = event.target.closest('.header-menu__item');
      if (!isClickInsideMenu) {
        menuItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1100) {
      menuItems.forEach(item => {
        item.classList.remove('active');
      });
    }
  });
}

//========================================================================================================================================================

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
      document.documentElement.classList.add('header-scroll');
    } else {
      header.classList.remove('_header-scroll');
      document.documentElement.classList.remove('header-scroll');
    }
  });
}

//========================================================================================================================================================

if (document.querySelector('.block-advertising__slider')) {
  const slidesCount = document.querySelectorAll('.block-advertising__slider .swiper-slide').length;

  const swiperAdvertising = new Swiper('.block-advertising__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: slidesCount >= 2,
    loopedSlides: slidesCount,
    loopAdditionalSlides: slidesCount,
    lazy: true,
    speed: 1000,
    autoplay: {
      delay: 1000,
    },
    breakpoints: {
      480: {
        slidesPerView: Math.min(2, slidesCount),
      },
      992: {
        slidesPerView: Math.min(3, slidesCount),
      },
    },
  });
}

if (document.querySelector('.block-other__slider')) {
  const swiperOther = new Swiper('.block-other__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 400,
    navigation: {
      prevEl: '.block-other__arrow-prev',
      nextEl: '.block-other__arrow-next',
    },
    breakpoints: {
      480: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 24,
      },
    },
  });
}

if (document.querySelector('.block-intro__slider')) {
  const swiperIntro = new Swiper('.block-intro__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: true,
    speed: 800,
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.block-intro__pagination',
      clickable: true,
    }
  });
}

if (document.querySelector('.block-card__slider')) {
  const swiperCard = new Swiper('.block-card__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    lazy: true,
    speed: 800,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.block-card__pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });
}

if (document.querySelector('.block-article__slider')) {
  const swiperArticle = new Swiper('.block-article__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      prevEl: '.block-article__arrow-prev',
      nextEl: '.block-article__arrow-next',
    },
    pagination: {
      el: '.block-article__pagination',
      clickable: true,
    },
  });
}

const slidersCalendar = document.querySelectorAll('.block-calendar__slider');
if (slidersCalendar.length) {
  slidersCalendar.forEach((slider) => {
    const paginationEl = slider.querySelector('.block-calendar__pagination');

    const swiperCalendar = new Swiper(slider, {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      lazy: true,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: paginationEl,
        clickable: true,
      }
    });
  });
}

const sliderCalendarNav = document.querySelector('.block-calendar-nav__slider');
if (sliderCalendarNav) {
  const wrapper = document.querySelector('.block-calendar-nav__wrapper');
  const prevBtn = document.querySelector('.block-calendar-nav__arrow-prev');
  const nextBtn = document.querySelector('.block-calendar-nav__arrow-next');
  const content = document.querySelector('.block-calendar-nav__content');

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  function updateButtonsState() {
    const scrollLeft = sliderCalendarNav.scrollLeft;
    const maxScrollLeft = sliderCalendarNav.scrollWidth - sliderCalendarNav.clientWidth;

    if (scrollLeft <= 1) {
      sliderCalendarNav.classList.add('is-start');
      if (content) content.classList.add('is-start');
      if (prevBtn) prevBtn.classList.add('disabled');
    } else {
      sliderCalendarNav.classList.remove('is-start');
      if (content) content.classList.remove('is-start');
      if (prevBtn) prevBtn.classList.remove('disabled');
    }

    if (scrollLeft >= maxScrollLeft - 1) {
      sliderCalendarNav.classList.add('is-end');
      if (content) content.classList.add('is-end');
      if (nextBtn) nextBtn.classList.add('disabled');
    } else {
      sliderCalendarNav.classList.remove('is-end');
      if (content) content.classList.remove('is-end');
      if (nextBtn) nextBtn.classList.remove('disabled');
    }
  }

  function scrollTo(direction) {
    const scrollAmount = sliderCalendarNav.clientWidth * 0.8;
    let newScrollLeft;

    if (direction === 'next') {
      newScrollLeft = sliderCalendarNav.scrollLeft + scrollAmount;
    } else {
      newScrollLeft = sliderCalendarNav.scrollLeft - scrollAmount;
    }

    sliderCalendarNav.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    setTimeout(updateButtonsState, 400);
  }

  sliderCalendarNav.addEventListener('scroll', updateButtonsState);
  window.addEventListener('resize', updateButtonsState);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (prevBtn.classList.contains('disabled')) return;
      scrollTo('prev');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (nextBtn.classList.contains('disabled')) return;
      scrollTo('next');
    });
  }

  sliderCalendarNav.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - sliderCalendarNav.offsetLeft;
    startScrollLeft = sliderCalendarNav.scrollLeft;
    sliderCalendarNav.style.cursor = 'grabbing';
    sliderCalendarNav.style.userSelect = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderCalendarNav.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderCalendarNav.scrollLeft = startScrollLeft - walk;
    updateButtonsState();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    sliderCalendarNav.style.cursor = 'grab';
    sliderCalendarNav.style.userSelect = '';
  });

  sliderCalendarNav.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  sliderCalendarNav.style.cursor = 'grab';

  let touchStartX = 0;
  let touchStartScrollLeft = 0;

  sliderCalendarNav.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX;
    touchStartScrollLeft = sliderCalendarNav.scrollLeft;
  });

  sliderCalendarNav.addEventListener('touchmove', (e) => {
    const touchX = e.touches[0].pageX;
    const walk = (touchX - touchStartX) * 1.5;
    sliderCalendarNav.scrollLeft = touchStartScrollLeft - walk;
    updateButtonsState();
  });

  updateButtonsState();
};

//========================================================================================================================================================

let dataTabs = document.querySelectorAll('[data-tabs]');
if (dataTabs) {
  dataTabs.forEach(tabBlock => {
    const tabButtons = tabBlock.querySelectorAll('[data-tab-title]');
    const tabContents = tabBlock.querySelectorAll('[data-tab-body]');

    if (!tabButtons.length || !tabContents.length) return;

    const activateTab = (tabId) => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      const activeButton = tabBlock.querySelector(`[data-tab-title][data-tab="${tabId}"]`);
      const activeContent = tabBlock.querySelector(`[data-tab-body][data-tab="${tabId}"]`);

      if (activeButton) activeButton.classList.add('active');
      if (activeContent) activeContent.classList.add('active');
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) activateTab(tabId);
      });
    });

    const activeTabButton = tabBlock.querySelector('[data-tab-title].active');
    if (activeTabButton) {
      const initialTabId = activeTabButton.getAttribute('data-tab');
      if (initialTabId) activateTab(initialTabId);
    } else if (tabButtons.length) {
      const firstTabId = tabButtons[0].getAttribute('data-tab');
      if (firstTabId) activateTab(firstTabId);
    }

    const prevArrow = tabBlock.querySelector('.arrow-prev');
    const nextArrow = tabBlock.querySelector('.arrow-next');
    const sliderWrapper = tabBlock.querySelector('.block-calendar-nav__wrapper');
    const slides = tabBlock.querySelectorAll('.block-calendar-nav__slide');

    if (prevArrow && nextArrow && sliderWrapper && slides.length) {
      let currentSlide = 0;
      let slideWidth = slides[0].offsetWidth;

      const updateSliderPosition = (animate = true) => {
        if (sliderWrapper) {
          sliderWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
          sliderWrapper.style.transition = animate ? 'transform 0.3s ease' : 'none';
        }
      };

      const updateArrowsVisibility = () => {
        prevArrow.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevArrow.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';
        nextArrow.style.opacity = currentSlide === slides.length - 1 ? '0.5' : '1';
        nextArrow.style.pointerEvents = currentSlide === slides.length - 1 ? 'none' : 'auto';
      };

      prevArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          updateSliderPosition(true);
          updateArrowsVisibility();
        }
      });

      nextArrow.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
          currentSlide++;
          updateSliderPosition(true);
          updateArrowsVisibility();
        }
      });

      let isResizing = false;
      window.addEventListener('resize', () => {
        if (isResizing) return;
        isResizing = true;
        requestAnimationFrame(() => {
          const newSlideWidth = slides[0].offsetWidth;
          if (newSlideWidth !== slideWidth) {
            slideWidth = newSlideWidth;
            updateSliderPosition(false);
            updateArrowsVisibility();
          }
          isResizing = false;
        });
      });

      updateArrowsVisibility();
    }
  });
}

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

const toggle = document.getElementById('specialVisionToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('special-vision');
    localStorage.setItem('specialVision', document.body.classList.contains('special-vision'));
  });

  if (localStorage.getItem('specialVision') === 'true') {
    document.body.classList.add('special-vision');
  }
}

//========================================================================================================================================================

//Яндекс карта
const map = document.querySelector('#map1');
if (map) {
  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map1', {
      center: [55.765990, 37.684560],
      zoom: 15,
      controls: ['zoomControl'],
      behaviors: ['drag']
    }, {
      searchControlProvider: 'yandex#search'
    });

    myMap.geoObjects
      .add(new ymaps.Placemark([55.765990, 37.684560], {
        /*
        iconColor: '#0c8ce9',
        iconImageSize: [105, 140],
        iconImageOffset: [-57, -137],*/
      }))

  };
}

//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});

let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');

        el.classList.remove('_form-success');
        el.parentElement.classList.remove('_form-success');

        el.parentElement.classList.remove('filled');

        formValidate.removeError(el);

        if (el.classList.contains('telephone') && el.clearFilled) {
          el.clearFilled();
        }
      }

      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
          checkbox.classList.remove('_form-success');
          checkbox.closest('.checkbox')?.classList.remove('_form-success');
        }
      }

      if (modules_flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            modules_flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};

function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }
  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));

    const telephoneInputs = form.querySelectorAll('.telephone');
    telephoneInputs.forEach(input => {
      const parent = input.closest('.form__input');
      if (parent) {
        parent.classList.remove('filled');
      }
    });

    setTimeout(() => {
      if (modules_flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? modules_flsModules.popup.open(popup) : null;
      }
    }, 0);

    formValidate.formClean(form);
  }
}
formSubmit();

//========================================================================================================================================================

const formFile = document.querySelector('.form-file');

if (formFile) {
  const fileInput = document.querySelector('.form-file input[type="file"]');
  const fileNameElement = document.querySelector('.form-file__name');
  const fileSubnameElement = document.querySelector('.form-file__subname');
  const fileIcon = document.querySelector('.form-file__icon');
  const closeButton = document.querySelector('.form-file__close');

  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        alert('Файл слишком большой. Максимальный размер 5 МБ.');
        resetFileInput();
        return;
      }

      const fileName = file.name;

      let fileSize = formatFileSize(file.size);

      fileNameElement.textContent = fileName;
      fileSubnameElement.textContent = fileSize;

      const newIconSrc = fileIcon.getAttribute('data-image');
      if (newIconSrc) {
        fileIcon.src = newIconSrc;
      }

      formFile.classList.add('active');
    }
  });

  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    resetFileInput();
  });

  function resetFileInput() {
    fileInput.value = '';

    fileNameElement.textContent = 'Прикрепить файл';
    fileSubnameElement.textContent = 'Макс. 5Мб';

    const originalIconSrc = fileIcon.getAttribute('data-original-src');
    if (originalIconSrc) {
      fileIcon.src = originalIconSrc;
    } else {
      const originalSrc = fileIcon.src;
      fileIcon.setAttribute('data-original-src', originalSrc);
      fileIcon.src = originalSrc;
    }

    formFile.classList.remove('active');
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Байт';

    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = bytes / Math.pow(k, i);
    const formattedSize = size.toFixed(2).replace(/\.00$/, '');

    if (i === 0) {
      return `${Math.round(size)} ${sizes[i]}`;
    }

    return `${formattedSize} ${sizes[i]}`;
  }

  const originalIconSrc = fileIcon.src;
  fileIcon.setAttribute('data-original-src', originalIconSrc);

  formFile.addEventListener('dragover', function (e) {
    e.preventDefault();
    formFile.classList.add('drag-over');
  });

  formFile.addEventListener('dragleave', function (e) {
    e.preventDefault();
    formFile.classList.remove('drag-over');
  });

  formFile.addEventListener('drop', function (e) {
    e.preventDefault();
    formFile.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      fileInput.files = files;
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
  });
}

//========================================================================================================================================================

//Наблюдатель
class ScrollWatcher {
  constructor(props) {
    let defaultConfig = {
      logging: true,
    }
    this.config = Object.assign(defaultConfig, props);
    this.observer;
    !document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
  }
  scrollWatcherUpdate() {
    this.scrollWatcherRun();
  }
  scrollWatcherRun() {
    document.documentElement.classList.add('watcher');
    this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
  }
  scrollWatcherConstructor(items) {
    if (items.length) {
      let uniqParams = uniqArray(Array.from(items).map(function (item) {
        if (item.dataset.watch === 'navigator' && !item.dataset.watchThreshold) {
          let valueOfThreshold;
          if (item.clientHeight > 2) {
            valueOfThreshold =
              window.innerHeight / 2 / (item.clientHeight - 1);
            if (valueOfThreshold > 1) {
              valueOfThreshold = 1;
            }
          } else {
            valueOfThreshold = 1;
          }
          item.setAttribute(
            'data-watch-threshold',
            valueOfThreshold.toFixed(2)
          );
        }
        return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
      }));
      uniqParams.forEach(uniqParam => {
        let uniqParamArray = uniqParam.split('|');
        let paramsWatch = {
          root: uniqParamArray[0],
          margin: uniqParamArray[1],
          threshold: uniqParamArray[2]
        }
        let groupItems = Array.from(items).filter(function (item) {
          let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
          let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
          let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
          if (
            String(watchRoot) === paramsWatch.root &&
            String(watchMargin) === paramsWatch.margin &&
            String(watchThreshold) === paramsWatch.threshold
          ) {
            return item;
          }
        });

        let configWatcher = this.getScrollWatcherConfig(paramsWatch);

        this.scrollWatcherInit(groupItems, configWatcher);
      });
    }
  }
  getScrollWatcherConfig(paramsWatch) {
    let configWatcher = {}
    if (document.querySelector(paramsWatch.root)) {
      configWatcher.root = document.querySelector(paramsWatch.root);
    }
    configWatcher.rootMargin = paramsWatch.margin;
    if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
      return
    }
    if (paramsWatch.threshold === 'prx') {
      paramsWatch.threshold = [];
      for (let i = 0; i <= 1.0; i += 0.005) {
        paramsWatch.threshold.push(i);
      }
    } else {
      paramsWatch.threshold = paramsWatch.threshold.split(',');
    }
    configWatcher.threshold = paramsWatch.threshold;

    return configWatcher;
  }
  scrollWatcherCreate(configWatcher) {
    console.log(configWatcher);
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.scrollWatcherCallback(entry, observer);
      });
    }, configWatcher);
  }
  scrollWatcherInit(items, configWatcher) {
    this.scrollWatcherCreate(configWatcher);
    items.forEach(item => this.observer.observe(item));
  }
  scrollWatcherIntersecting(entry, targetElement) {
    if (entry.isIntersecting) {
      !targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
    } else {
      targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
    }
  }
  scrollWatcherOff(targetElement, observer) {
    observer.unobserve(targetElement);
  }
  scrollWatcherCallback(entry, observer) {
    const targetElement = entry.target;
    this.scrollWatcherIntersecting(entry, targetElement);
    targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
    document.dispatchEvent(new CustomEvent("watcherCallback", {
      detail: {
        entry: entry
      }
    }));
  }
}
modules_flsModules.watcher = new ScrollWatcher({});

//========================================================================================================================================================

//Прокрутка к блоку
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
  const targetBlockElement = document.querySelector(targetBlock);
  if (targetBlockElement) {
    let headerItem = '';
    let headerItemHeight = 0;
    if (noHeader) {
      headerItem = 'header.header';
      const headerElement = document.querySelector(headerItem);
      if (!headerElement.classList.contains('_header-scroll')) {
        headerElement.style.cssText = `transition-duration: 0s;`;
        headerElement.classList.add('_header-scroll');
        headerItemHeight = headerElement.offsetHeight;
        headerElement.classList.remove('_header-scroll');
        setTimeout(() => {
          headerElement.style.cssText = ``;
        }, 0);
      } else {
        headerItemHeight = headerElement.offsetHeight;
      }
    }
    let options = {
      speedAsDuration: true,
      speed: speed,
      header: headerItem,
      offset: offsetTop,
      easing: 'easeOutQuad',
    };
    document.documentElement.classList.contains("menu-open") ? menuClose() : null;

    if (typeof SmoothScroll !== 'undefined') {
      new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
      window.scrollTo({
        top: targetBlockElementPosition,
        behavior: "smooth"
      });
    }
  }
};
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
        const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
        if (modules_flsModules.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest('[data-fp-section]');
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
          if (fullpageSectionId !== null) {
            modules_flsModules.fullpage.switchingSection(fullpageSectionId);
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
        }
      }
    }
  }
}
pageNavigation()

//========================================================================================================================================================

window.A11yWidget.init({
  trigger: '.a11y-start',
  icon: 'glasses',
  features: { fontSize: true }
});


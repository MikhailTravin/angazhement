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
    const arrow = item.querySelector('.header-menu__arrow');
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
"use strict";

var clientSwiper = new Swiper('.clients__swiper', {
  direction: 'horizontal',
  loop: true,
  spaceBetween: 35,
  speed: 400,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    1366: {
      slidesPerView: 2
    }
  },
  navigation: {
    nextEl: '.swiper-button-next-client',
    prevEl: '.swiper-button-prev-client'
  }
});
var wrapper;
var diplomSwiper = new Swiper('.diploms__swiper', {
  direction: 'horizontal',
  loop: true,
  breakpoints: {
    320: {
      spaceBetween: 40,
      centeredSlides: true,
      slidesPerView: 1.1
    },
    340: {
      spaceBetween: 40,
      centeredSlides: true,
      slidesPerView: 1.3
    },
    400: {
      centeredSlides: true,
      slidesPerView: 1.4,
      spaceBetween: 60
    },
    450: {
      spaceBetween: 15,
      centeredSlides: false,
      slidesPerView: 2
    },
    650: {
      centeredSlides: true,
      slidesPerView: 3.2
    },
    1024: {
      spaceBetween: 5,
      centeredSlides: false,
      slidesPerView: 4
    },
    1366: {
      centeredSlides: true,
      spaceBetween: 15,
      slidesPerView: 5.2
    }
  },
  navigation: {
    nextEl: '.swiper-button-next-diplom',
    prevEl: '.swiper-button-prev-diplom'
  }
}); //IE HTMLcollection foreach polyfill

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

;
var burger = document.querySelector('.burger');

burger.onclick = function (e) {
  burger.classList.toggle('active');

  if (burger.classList.contains('active')) {
    $("html, body").animate({
      scrollTop: 0
    }, 300);
    bodyScrollLock.disableBodyScroll(document.body);
  } else {
    bodyScrollLock.enableBodyScroll(document.body);
  }
};

function getVideoHtml(dataLink) {
  return '<iframe height="100%" width="100%" src=' + dataLink + ' frameborder="0" allow="accelerometer; autoplay="1"; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

document.querySelectorAll('.card__videotrigger').forEach(function (item) {
  return item.onclick = function () {
    var parent = item.parentNode;
    parent.style.width = parent.clientWidth + 'px';
    parent.innerHTML = getVideoHtml(parent.getAttribute('data-link'));
  };
});
document.querySelectorAll('.close-icon').forEach(function (item) {
  return item.onclick = function () {
    for (var parent = item.parentNode;; parent = parent.parentNode) {
      if (parent.classList.contains('interactive')) {
        parent.classList.add('hidden');
        return;
      }
    }
  };
});
document.querySelectorAll('.interactive-trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var selector = item.getAttribute('data-sel'),
        toggleClass = item.getAttribute('data-toggleClass');
    document.querySelector(selector).classList.toggle(toggleClass);
  });
});
var imagepopupcontainer = document.querySelector('.imagepopup');
var imgpopuped = false,
    imgpopupposition = 0,
    prevCoord = 0;
document.querySelectorAll('.popuping').forEach(function (item) {
  return item.onclick = function () {
    imagepopupcontainer.innerHTML = "";
    var clone = item.cloneNode();
    imagepopupcontainer.appendChild(clone);
    imagepopupcontainer.classList.remove('hidden');
    imgpopuped = true;
    imgpopupposition = pageYOffset;
  };
});

imagepopupcontainer.onclick = function () {
  imgpopuped = false;
  this.classList.add('hidden');
};

var yandexmap = '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A2b01ece4b1596cd128b7e50c929a0373d8a215720d6bd5873a46f674486cfa47&amp;source=constructor" width="100%" height="100%" frameborder="0"></iframe>';
var maploaded = false;

var container = document.querySelector('.footer__mapcontainer'),
    drawmap = function drawmap() {
  maploaded = true;
  container.innerHTML = yandexmap;
},
    checkmap = function checkmap() {
  return container.getBoundingClientRect().top > 0 && container.getBoundingClientRect().top < window.innerHeight;
};

window.addEventListener('load', function () {
  prevCoord = pageYOffset;
  if (!maploaded && checkmap()) drawmap();
  setTimeout(function () {
    return !maploaded ? drawmap() : false;
  }, 1500);
  document.querySelectorAll('.card__text').forEach(function (item) {
    var lh = getComputedStyle(item)['lineHeight'];
    var linecount = Math.floor(item.getBoundingClientRect().height / parseFloat(lh));
    item.style.height = linecount * parseFloat(lh) + 'px';
    $(item).ellipsis({
      responsive: true,
      lines: linecount
    });
  });
});

document.onscroll = function () {
  prevCoord = pageYOffset;
  if (!maploaded && checkmap()) drawmap();

  if (imgpopuped && Math.abs(imgpopupposition - pageYOffset) > 15) {
    imgpopuped = false;
    imagepopupcontainer.classList.add('hidden');
  }
};

objectFitImages();
window.addEventListener('resize', function () {
  document.querySelectorAll('.card__text').forEach(function (item) {
    item.style = "";
    var lh = getComputedStyle(item)['lineHeight'];
    var linecount = Math.floor(item.getBoundingClientRect().height / parseFloat(lh));
    item.style.height = linecount * parseFloat(lh) + 'px';
    $(item).ellipsis({
      responsive: true,
      lines: linecount
    });
  });
});
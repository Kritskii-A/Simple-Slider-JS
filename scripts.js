let sliderItem = document.querySelectorAll(".slider-item"); //указываем обертку каждого слайда

const interval = 5000; // интервал в мс между пролистыванием слайдов

let slideActive = 0;

function showSlide(doing) {
  if (typeof doing == "number") {
    // проверяем является ли числом, если да, то просто включаем нужный слайд
    sliderItem[slideActive].style.display = "none";
    sliderItem[doing].style.display = "block";

    activeDots(slideActive, doing)

    slideActive = doing;
  } else if (doing === "next") {
    // листаем слайды вперед
    slideActive++;
    if (slideActive === sliderItem.length) {
      slideActive = 0;
    }
    if (slideActive < sliderItem.length) {
      sliderItem[slideActive].style.display = "block";
    }

    if (slideActive === 0) {
      sliderItem[sliderItem.length - 1].style.display = "none";
      sliderItem[slideActive].style.display = "block";
      activeDots(sliderItem.length - 1, slideActive)
    } else {
      sliderItem[slideActive - 1].style.display = "none";
      activeDots(slideActive - 1, slideActive)
    }
  } else if (doing === "prev") {
    // листаем слайды назад
    slideActive--;
    if (slideActive === -1) {
      slideActive = sliderItem.length - 1;
    }

    if (slideActive < sliderItem.length) {
      sliderItem[slideActive].style.display = "block";
    }
    if (slideActive === sliderItem.length - 1) {
      sliderItem[0].style.display = "none";
      sliderItem[slideActive].style.display = "block";
      activeDots(0, slideActive)
    } else {
      sliderItem[slideActive + 1].style.display = "none";
      activeDots(slideActive + 1, slideActive)
    }
  } else {
    // дефолтный слайд при старте
    sliderItem[slideActive].style.display = "block";
  }

}

// листаем вперед
function nextSlide() {
  showSlide("next");
}

// листаем назад
function prevSlide() {
  showSlide("prev");
}

// включаем, чтобы слайд сразу отобразился при загрузке
showSlide();

/* DOTS */

sliderItem.forEach((dot, index) => {
  let sliderDots = document.querySelectorAll(".sliderDots");
  sliderDots[0].innerHTML =
    sliderDots[0].innerHTML + '<div onclick="showSlide(' + index + ')"></div>';
});

// показываем активную точку
function activeDots (before, after) {
  let newDots = document.querySelectorAll('.sliderDots')
  newDots = Array.from(newDots)

  newDots[0].childNodes[before].className = ""
  newDots[0].childNodes[after].className = "active"
}

/* END DOTS */

// включаем автолистинг
setInterval(nextSlide, interval);

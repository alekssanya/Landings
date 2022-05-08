let names = ['North', 'South', 'West', 'East']
let pathes = [Array.from(document.getElementsByClassName("one")),
Array.from(document.getElementsByClassName("two")),
Array.from(document.getElementsByClassName("three")),
Array.from(document.getElementsByClassName("four"))]

let currentPath
pathes[0].forEach(element => {
  element.classList.add("path--active")
});

function pathSwaper(current) {
  pathes[current - 1].forEach(element => {
    element.classList.add("path--active")
  });
  if (currentPath != undefined) {
    pathes[currentPath].forEach(element => {
      element.classList.remove("path--active")
    });
  }
  currentPath = current - 1
}

const headerSlider = new Swiper('.header-slider', {
  loop: true,
  navigation: {
    nextEl: '.header-slider__button-next',
    prevEl: '.header-slider__button-prev',
  },
  pagination: {
    el: '.header-slider__pag',
    type: 'custom',
    renderCustom: function (swiper, current, total) {
      let text = '';
      for (let i = 1; i <= total; i++) {
        if (current == i) {
          pathSwaper(current)
          text += `<div class="pag-inner pag-inner--active">
                      <p class="pag-inner__number">0${i}</p>
                      <p class="pag-inner__name">${names[i - 1]} Shore</p>
                  </div>`;
        }
        else {
          text += `<div class="pag-inner">
                      <p class="pag-inner__number">0${i}</p>
                      <p class="pag-inner__name">${names[i - 1]} Shore</p>
                  </div>`;
        }
      }
      return text;
    }
  },
});

let coordinatesArr = [['21.9263', '-159.6419'], ['34.0208', '-118.8302'], ['21.2862', '-76.6342'],
['-23.0126', '-43.3993'], ['48.4024', '-4.7734'], ['-34.7078', '20.1286'],
['8.5289', '76.8701'], ['34.3599', '126.1300'], ['-28.6390', '153.6089']]
document.getElementById(`map__coordinates-north`).textContent = coordinatesArr[0][0]
document.getElementById(`map__coordinates-west`).textContent = coordinatesArr[0][1]

const mapSlider = new Swiper('.map-slider', {
  loop: true,
  slidesPerView: 4,
  initialSlide: 0,
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideClass: 'swiper-slide',
  slideVisibleClass: 'swiper-slide--visible',
  slideNextClass: 'map-slide-next',
  navigation: {
    nextEl: '.map-slider__button-next',
    prevEl: '.map-slider__button-prev',
  },
});

let currentBeach = 1
document.getElementById('map__window-1').style.display = 'block'

mapSlider.on('slideChange', function () {
  document.getElementById(`map__window-${currentBeach}`).style.display = 'none'
  document.getElementById(`map__window-${mapSlider.realIndex + 1}`).style.display = 'block'
  currentBeach = mapSlider.realIndex + 1
  document.getElementById(`map__coordinates-north`).textContent = coordinatesArr[mapSlider.realIndex][0]
  document.getElementById(`map__coordinates-west`).textContent = coordinatesArr[mapSlider.realIndex][1]
})

Array.from(document.getElementsByClassName('map__pag-point')).forEach(element => {
  element.addEventListener('mouseenter', function () {
    let triggerElem = Number(this.getAttribute('id').split('-')[2])
    mapSlider.slideToLoop(triggerElem - 1)
  })
});


const travelSlider = new Swiper('.travel-slider', {
  loop: true,
  effect: "fade",
  watchSlidesVisibility: true,
  navigation: {
    nextEl: '.travel-slider__button-next',
    prevEl: '.travel-slider__button-prev',
  },
});


const sleepSlider = new Swiper('.sleep-slider', {
  loop: true,
  navigation: {
    nextEl: '.sleep-slider__button-next',
    prevEl: '.sleep-slider__button-prev',
  },
});


const shopSlider = new Swiper('.shop-slider', {
  loop: true,
  navigation: {
    nextEl: '.shop-slider__button-next',
    prevEl: '.shop-slider__button-prev',
  },
});






//scroll down button

let pointsArr = [document.getElementById("header"),
document.getElementById("map-section"),
document.getElementById("travel-section"),
document.getElementById("sleep-section"),
document.getElementById("shop-section")]

function handleCondition(arg1, arg2) {
  return pointsArr[arg1].getBoundingClientRect().top - document.body.getBoundingClientRect().top - 1 <= scrollY
    && pointsArr[arg2].getBoundingClientRect().top - document.body.getBoundingClientRect().top - 1 >= scrollY
}

document.getElementById('header-slider___scrolldown-btn-id').addEventListener('click', function (e) {
  e.preventDefault()
  let blockID

  if (handleCondition(3, 4)) {
    blockID = pointsArr[4].getAttribute('id')
  } else if (handleCondition(2, 3)) {
    blockID = pointsArr[3].getAttribute('id')
  } else if (handleCondition(1, 2)) {
    blockID = pointsArr[2].getAttribute('id')
  } else if (handleCondition(0, 1)) {
    blockID = pointsArr[1].getAttribute('id')
  }

  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
})

window.addEventListener('scroll', function () {
  if (pointsArr[4].getBoundingClientRect().top - document.body.getBoundingClientRect().top - 1 <= scrollY) {
    document.getElementById('header-slider___scrolldown-btn-id').style.display = "none"
  } else {
    document.getElementById('header-slider___scrolldown-btn-id').style.display = "block"
  }
})








// shop surf buttons
let buttons = Array.from(document.getElementsByClassName("shop-center-btn"))
buttons.forEach(element => {
  element.addEventListener("click", function () {
    let whichElement = this.getAttribute('id').split('-', 1)
    let textElement = this.parentNode.querySelector('#' + whichElement + '-shop-center__text-wr')
    let line = this.querySelector('#second-line')
    if (line.style.transform == "rotate(0deg)") {
      textElement.style.opacity = "0"
      line.style.transform = "rotate(90deg)"
    } else {
      textElement.style.opacity = "1"
      line.style.transform = "rotate(0deg)"
    }
  })
});

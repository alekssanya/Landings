//Боковой показатель скролла
let pointsArr = [document.getElementById("0"),
                 document.getElementById("1"),
                 document.getElementById("2"),
                 document.getElementById("3")]

let scrollArr = Array.from(document.getElementsByClassName("scroll-position__item"))
let activePosition = 0

function addRemoveClass(elemIndex) {
    scrollArr[activePosition].classList.remove("scroll-position__item--active")
    scrollArr[elemIndex].classList.add("scroll-position__item--active")
    activePosition = elemIndex
}

function handleCondition(arg1, arg2) {
    let proportion = window.innerWidth / 10
    return pointsArr[arg1].getBoundingClientRect().top - document.body.getBoundingClientRect().top - proportion <= scrollY
        && pointsArr[arg2].getBoundingClientRect().top - document.body.getBoundingClientRect().top - proportion >= scrollY
}

function handleScroll() {
    if (handleCondition(0, 1)) {
        addRemoveClass(0)
    } else if (handleCondition(1, 2)) {
        addRemoveClass(1)
    } else if (handleCondition(2, 3)) {
        addRemoveClass(2)
    } else {
        addRemoveClass(3)
    }
}

window.addEventListener('scroll', handleScroll)



//Плавный скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}
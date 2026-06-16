/*Carousel*/
const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let originalCards = [...track.children];

const firstClone = originalCards[0].cloneNode(true);
const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.prepend(lastClone);

let cards = [...track.children];

let index = 1;

let isAnimating = false;

function cardSize() {
    const gap =
        parseFloat(getComputedStyle(track).gap) || 0;
    return cards[0].offsetWidth + gap;
}

function updatePosition(animated = true) {
    if (animated) {
        track.style.transition =
            "transform 0.4s ease";
    }else{
        track.style.transition =
            "none";
    }
    track.style.transform =
        `translateX(-${index * cardSize()}px)`;
}
updatePosition(false);

nextBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    index++;
    updatePosition(true);
});

prevBtn.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;
    index--;
    updatePosition(true);
});

track.addEventListener("transitionend", () => {
    if (index === cards.length - 1) {
        index = 1;
        updatePosition(false);
    }

    if (index === 0) {
        index = cards.length - 2;
        updatePosition(false);
    }
    isAnimating = false;
});

window.addEventListener("resize", () => {
    cards = [...track.children];
    updatePosition(false);
});
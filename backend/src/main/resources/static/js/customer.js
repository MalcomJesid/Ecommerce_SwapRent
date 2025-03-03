let slideIndex = 0;
let autoSlide = true;

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = 'block';

    if (autoSlide) {
        setTimeout(showSlides, 7000);
    }
}

function plusSlides(n) {
    autoSlide = false;
    showSlidesManually(slideIndex += n);
}

function showSlidesManually(n) {
    const slides = document.querySelectorAll('.slide');
    if (n > slides.length) {
        slideIndex = 1;
    } else if (n < 1) {
        slideIndex = slides.length;
    } else {
        slideIndex = n;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSlides();
});

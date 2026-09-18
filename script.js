document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // SLIDESHOW - změna obrázku každých 10 sekund
    // ==========================================

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slide-dot");

    let currentSlide = 0;
    let slideTimer;

    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        currentSlide = index;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }


    function nextSlide() {

        let next = currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);
    }


    function startSlideshow() {

        clearInterval(slideTimer);

        slideTimer = setInterval(() => {
            nextSlide();
        }, 10000);

    }


    // Kliknutí na tečky

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            // po ručním přepnutí začne nový 10s odpočet
            startSlideshow();

        });

    });


    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();
    }



    // ==========================================
    // FAQ
    // ==========================================

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const isOpen = item.classList.contains("open");

            // zavře ostatní
            faqItems.forEach(otherItem => {
                otherItem.classList.remove("open");
            });

            // otevře kliknuté
            if (!isOpen) {
                item.classList.add("open");
            }

        });

    });



    // ==========================================
    // NAVIGACE
    // Obchod / Status / Tým / Panel / Home
    // ==========================================

    const navButtons = document.querySelectorAll("[data-page]");
    const pages = document.querySelectorAll(".page");

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const targetPage = button.dataset.page;
            const target = document.getElementById(targetPage);

            if (!target) {
                return;
            }

            pages.forEach(page => {
                page.classList.remove("active");
            });

            target.classList.add("active");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });

});

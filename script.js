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

/* =====================================================
   METWOOD - TESTOVACÍ LOGIN
===================================================== */

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = document
            .getElementById("username")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;


        /* TESTOVACÍ ADMIN ÚČET */

        if (username === "Admin" && password === "Admin") {

            // Čas přihlášení
            const loginTime = new Date();

            // Zapamatování přihlášení
            localStorage.setItem("metwoodLoggedIn", "true");
            localStorage.setItem("metwoodUsername", "Admin");
            localStorage.setItem(
                "metwoodLoginTime",
                loginTime.toISOString()
            );

            // Heslo se nikam neukládá

            loginError.classList.remove("show");

            // Zatím zobrazíme potvrzení
            showAccountDashboard();

        } else {

            loginError.classList.add("show");

        }

    });

}


/* =====================================================
   KONTROLA PŘIHLÁŠENÍ
===================================================== */

function showAccountDashboard() {

    const loginBox = document.getElementById("loginBox");

    if (!loginBox) {
        return;
    }

    const username =
        localStorage.getItem("metwoodUsername") || "Admin";

    const storedTime =
        localStorage.getItem("metwoodLoginTime");


    let formattedTime = "Neznámý";

    if (storedTime) {

        const date = new Date(storedTime);

        formattedTime = date.toLocaleString(
            "cs-CZ",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    loginBox.innerHTML = `

        <div class="login-logo">
            M
        </div>

        <h3>Vítej zpět, ${username}.</h3>

        <p>
            Přihlášení proběhlo úspěšně.
        </p>


        <div class="account-preview">

            <span>
                PŘIHLÁŠENÝ ÚČET
            </span>

            <strong>
                ${username}
            </strong>

        </div>


        <div class="account-preview">

            <span>
                POSLEDNÍ PŘIHLÁŠENÍ
            </span>

            <strong>
                ${formattedTime}
            </strong>

        </div>


        <button
            id="openDashboard"
            class="login-button"
            type="button"
        >
            OTEVŘÍT PANEL
        </button>


        <button
            id="logoutButton"
            class="account-logout"
            type="button"
        >
            ODHLÁSIT SE
        </button>

    `;


    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logoutAccount
        );

    }


    const dashboardButton =
        document.getElementById("openDashboard");

    if (dashboardButton) {

        dashboardButton.addEventListener(
            "click",
            function () {

                alert(
                    "Dashboard MetWood vytvoříme v dalším kroku."
                );

            }
        );

    }

}


/* =====================================================
   ODHLÁŠENÍ
===================================================== */

function logoutAccount() {

    localStorage.removeItem("metwoodLoggedIn");
    localStorage.removeItem("metwoodUsername");
    localStorage.removeItem("metwoodLoginTime");

    // Obnovení stránky
    window.location.reload();

}


/* =====================================================
   OBNOVENÍ PŘIHLÁŠENÍ PO F5
===================================================== */

if (
    localStorage.getItem("metwoodLoggedIn") === "true"
) {

    showAccountDashboard();

}

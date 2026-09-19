document.addEventListener("DOMContentLoaded", function () {

    console.log("MetWood JavaScript loaded");


    /* =====================================================
       1. NAVIGACE
    ===================================================== */

    const pages = document.querySelectorAll(".page");
    const navButtons = document.querySelectorAll("[data-page]");

    function showPage(pageId) {

        const targetPage = document.getElementById(pageId);

        if (!targetPage) {
            console.warn("Stránka neexistuje:", pageId);
            return;
        }

        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        targetPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    navButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const pageId = button.getAttribute("data-page");

            showPage(pageId);

        });

    });



    /* =====================================================
       2. SLIDESHOW
    ===================================================== */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slide-dot");

    let currentSlide = 0;
    let slideTimer = null;


    function showSlide(index) {

        if (slides.length === 0) {
            return;
        }

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }


        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        slides[index].classList.add("active");


        if (dots[index]) {
            dots[index].classList.add("active");
        }


        currentSlide = index;
    }


    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    function startSlideshow() {

        if (slideTimer) {
            clearInterval(slideTimer);
        }

        if (slides.length <= 1) {
            return;
        }


        slideTimer = setInterval(function () {

            nextSlide();

        }, 10000);
    }


    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

            startSlideshow();

        });

    });


    if (slides.length > 0) {

        showSlide(0);

        startSlideshow();

    }



    /* =====================================================
       3. FAQ
    ===================================================== */

    const faqItems = document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question = item.querySelector(".faq-question");

        if (!question) {
            return;
        }


        question.addEventListener("click", function () {

            const wasOpen =
                item.classList.contains("open");


            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("open");

            });


            if (!wasOpen) {

                item.classList.add("open");

            }

        });

    });



    /* =====================================================
       4. LOGIN
    ===================================================== */

    function formatLoginTime(storedTime) {

        if (!storedTime) {
            return "Neznámý";
        }


        const date = new Date(storedTime);


        if (isNaN(date.getTime())) {
            return "Neznámý";
        }


        return date.toLocaleString("cs-CZ", {

            day: "2-digit",
            month: "2-digit",
            year: "numeric",

            hour: "2-digit",
            minute: "2-digit"

        });

    }



    function showAccountDashboard() {

        const loginBox =
            document.getElementById("loginBox");


        if (!loginBox) {
            return;
        }


        const username =
            localStorage.getItem("metwoodUsername") || "Admin";


        const loginTime =
            localStorage.getItem("metwoodLoginTime");


        const formattedTime =
            formatLoginTime(loginTime);


        loginBox.innerHTML = `

            <div class="login-logo">
                M
            </div>


            <h3>
                Vítej zpět, ${username}.
            </h3>


            <p>
                Jsi přihlášen do svého MetWood účtu.
            </p>


            <div class="account-preview">

                <span>
                    UŽIVATELSKÉ JMÉNO
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
                function () {

                    logoutAccount();

                }
            );

        }


        const openDashboard =
    document.getElementById("openDashboard");


if (openDashboard) {

    openDashboard.addEventListener(
        "click",
        function () {

            showFullDashboard();

        }
    );

}


    function logoutAccount() {
        
        /* =====================================================
   METWOOD - FULL DASHBOARD
===================================================== */

function showFullDashboard() {

    const loginBox =
        document.getElementById("loginBox");

    if (!loginBox) {
        return;
    }


    const username =
        localStorage.getItem("metwoodUsername") || "Admin";

    const loginTime =
        localStorage.getItem("metwoodLoginTime");

    const formattedTime =
        formatLoginTime(loginTime);


    loginBox.innerHTML = `

        <div class="account-dashboard">

            <div class="account-sidebar">

                <div class="dashboard-logo">
                    M
                </div>

                <div class="dashboard-user">
                    <small>PŘIHLÁŠEN JAKO</small>
                    <strong>${username}</strong>
                </div>


                <div class="dashboard-menu">

                    <button
                        class="dashboard-nav active"
                        data-account-tab="dashboard"
                    >
                        Dashboard
                    </button>


                    <span class="dashboard-menu-title">
                        MŮJ ÚČET
                    </span>


                    <button
                        class="dashboard-nav"
                        data-account-tab="whitelist"
                    >
                        Whitelist
                    </button>

                    <button
                        class="dashboard-nav"
                        data-account-tab="tickets"
                    >
                        Tickety
                    </button>

                    <button
                        class="dashboard-nav"
                        data-account-tab="character"
                    >
                        Moje postava
                    </button>

                    <button
                        class="dashboard-nav"
                        data-account-tab="profile"
                    >
                        Profil
                    </button>


                    <span class="dashboard-menu-title">
                        ADMINISTRACE
                    </span>


                    <button
                        class="dashboard-nav"
                        data-account-tab="staff"
                    >
                        Staff Panel
                    </button>

                    <button
                        class="dashboard-nav"
                        data-account-tab="game-data"
                    >
                        Herní data
                    </button>

                </div>


                <button
                    id="dashboardLogout"
                    class="dashboard-logout"
                    type="button"
                >
                    ODHLÁSIT SE
                </button>

            </div>


            <div class="dashboard-content">


                <!-- DASHBOARD -->

                <div
                    class="dashboard-view active"
                    data-account-view="dashboard"
                >

                    <span class="section-label">
                        METWOOD ACCOUNT
                    </span>

                    <h2>
                        Vítej zpět, ${username}.
                    </h2>

                    <p>
                        Přehled tvého MetWood účtu.
                    </p>


                    <div class="dashboard-cards">

                        <div class="dashboard-card">

                            <small>
                                UŽIVATELSKÉ JMÉNO
                            </small>

                            <strong>
                                ${username}
                            </strong>

                        </div>


                        <div class="dashboard-card">

                            <small>
                                ROLE
                            </small>

                            <strong>
                                Administrator
                            </strong>

                        </div>


                        <div class="dashboard-card">

                            <small>
                                WHITELIST
                            </small>

                            <strong class="status-green">
                                SCHVÁLEN
                            </strong>

                        </div>


                        <div class="dashboard-card">

                            <small>
                                STAV ÚČTU
                            </small>

                            <strong class="status-green">
                                BEZ BANU
                            </strong>

                        </div>

                    </div>


                    <div class="dashboard-info">

                        <small>
                            POSLEDNÍ PŘIHLÁŠENÍ
                        </small>

                        <strong>
                            ${formattedTime}
                        </strong>

                    </div>

                </div>



                <!-- WHITELIST -->

                <div
                    class="dashboard-view"
                    data-account-view="whitelist"
                >

                    <span class="section-label">
                        MŮJ ÚČET
                    </span>

                    <h2>Whitelist</h2>

                    <p>
                        Informace o whitelistu se zde zobrazí později.
                    </p>

                </div>



                <!-- TICKETY -->

                <div
                    class="dashboard-view"
                    data-account-view="tickets"
                >

                    <span class="section-label">
                        MŮJ ÚČET
                    </span>

                    <h2>Tickety</h2>

                    <p>
                        Zatím nemáš žádné otevřené tickety.
                    </p>

                </div>



                <!-- POSTAVA -->

                <div
                    class="dashboard-view"
                    data-account-view="character"
                >

                    <span class="section-label">
                        MŮJ ÚČET
                    </span>

                    <h2>Moje postava</h2>

                    <p>
                        Herní postava bude později propojena
                        s MetWood serverem.
                    </p>

                </div>



                <!-- PROFIL -->

                <div
                    class="dashboard-view"
                    data-account-view="profile"
                >

                    <span class="section-label">
                        MŮJ ÚČET
                    </span>

                    <h2>Profil</h2>


                    <div class="profile-row">
                        <span>Uživatelské jméno</span>
                        <strong>${username}</strong>
                    </div>

                    <div class="profile-row">
                        <span>Role</span>
                        <strong>Administrator</strong>
                    </div>

                    <div class="profile-row">
                        <span>Whitelist</span>
                        <strong class="status-green">
                            Schválen
                        </strong>
                    </div>

                    <div class="profile-row">
                        <span>Ban</span>
                        <strong class="status-green">
                            Bez banu
                        </strong>
                    </div>

                    <div class="profile-row">
                        <span>Poslední přihlášení</span>
                        <strong>${formattedTime}</strong>
                    </div>

                </div>



                <!-- STAFF -->

                <div
                    class="dashboard-view"
                    data-account-view="staff"
                >

                    <span class="section-label">
                        ADMINISTRACE
                    </span>

                    <h2>Staff Panel</h2>

                    <p>
                        Administrace MetWood bude doplněna později.
                    </p>

                </div>



                <!-- HERNÍ DATA -->

                <div
                    class="dashboard-view"
                    data-account-view="game-data"
                >

                    <span class="section-label">
                        ADMINISTRACE
                    </span>

                    <h2>Herní data</h2>

                    <p>
                        Zde budou později informace
                        z herního serveru a databáze.
                    </p>

                </div>


            </div>

        </div>

    `;


    /* =========================================
       MENU DASHBOARDU
    ========================================= */

    const dashboardButtons =
        document.querySelectorAll(".dashboard-nav");

    const dashboardViews =
        document.querySelectorAll(".dashboard-view");


    dashboardButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const target =
                    button.getAttribute(
                        "data-account-tab"
                    );


                dashboardButtons.forEach(
                    function (otherButton) {

                        otherButton.classList.remove(
                            "active"
                        );

                    }
                );


                dashboardViews.forEach(
                    function (view) {

                        view.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add("active");


                const targetView =
                    document.querySelector(
                        '[data-account-view="' +
                        target +
                        '"]'
                    );


                if (targetView) {

                    targetView.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    const dashboardLogout =
        document.getElementById(
            "dashboardLogout"
        );


    if (dashboardLogout) {

        dashboardLogout.addEventListener(
            "click",
            logoutAccount
        );

    }

}

        localStorage.removeItem(
            "metwoodLoggedIn"
        );

        localStorage.removeItem(
            "metwoodUsername"
        );

        localStorage.removeItem(
            "metwoodLoginTime"
        );


        window.location.reload();

    }



    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const usernameInput =
                    document.getElementById("username");

                const passwordInput =
                    document.getElementById("password");

                const loginError =
                    document.getElementById("loginError");


                if (
                    !usernameInput ||
                    !passwordInput
                ) {

                    console.error(
                        "Login inputy nebyly nalezeny."
                    );

                    return;
                }


                const username =
                    usernameInput.value.trim();

                const password =
                    passwordInput.value;


                /* =========================================
                   TESTOVACÍ ÚČET

                   Username: Admin
                   Password: Admin

                   POZOR:
                   Toto není skutečné zabezpečení.
                ========================================= */


                if (
                    username === "Admin" &&
                    password === "Admin"
                ) {

                    const loginTime =
                        new Date().toISOString();


                    localStorage.setItem(
                        "metwoodLoggedIn",
                        "true"
                    );


                    localStorage.setItem(
                        "metwoodUsername",
                        "Admin"
                    );


                    localStorage.setItem(
                        "metwoodLoginTime",
                        loginTime
                    );


                    if (loginError) {

                        loginError.classList.remove(
                            "show"
                        );

                    }


                    showAccountDashboard();

                }

                else {

                    if (loginError) {

                        loginError.classList.add(
                            "show"
                        );

                    }

                }

            }
        );

    }



    /* =====================================================
       5. OBNOVENÍ LOGINU
    ===================================================== */

    if (
        localStorage.getItem("metwoodLoggedIn") === "true"
    ) {

        showAccountDashboard();

    }

});

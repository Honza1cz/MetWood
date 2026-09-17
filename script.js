// ==============================
// METWOOD - PŘEPÍNÁNÍ STRÁNEK
// ==============================

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-button");
const christmasSword = document.getElementById("christmasSword");

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// NAVIGACE
// ==============================

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        showPage(page);

    });

});


// ==============================
// CHRISTMAS SALE
// ==============================

christmasSword.addEventListener("click", () => {

    showPage("christmas");

});


// ==============================
// ESC = ZPĚT DOMŮ
// ==============================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        showPage("home");
    }

});


// ==============================
// LOG
// ==============================

console.log("MetWood website loaded.");

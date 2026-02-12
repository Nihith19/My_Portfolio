// ================= NAVBAR FUNCTIONALITY =================

const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinkItems = document.querySelectorAll(".nav-link");

// ================= MOBILE MENU =================

if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// ================= NAVBAR BACKGROUND ON SCROLL =================

window.addEventListener("scroll", () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});

// ================= ACTIVE LINK HIGHLIGHT =================

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (
            window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinkItems.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

// ================= SCROLL REVEAL =================

const fadeElements = document.querySelectorAll(".fade-in");

function revealOnScroll() {
    fadeElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 120) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= PAGE LOADER =================

window.addEventListener("load", function () {
    const loader = document.querySelector(".page-loader");

    if (loader) {
        loader.classList.add("hide");
    }
});

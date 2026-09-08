// ===============================
// CODEFLOW - JavaScript
// ===============================

// ---------- Theme Toggle ----------
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("codeflow-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

function updateThemeIcon() {
    if (document.body.classList.contains("light-theme")) {
        themeIcon.textContent = "☀";
        themeToggle.setAttribute("aria-label", "Switch to dark theme");
        themeToggle.setAttribute("title", "Switch to dark theme");
    } else {
        themeIcon.textContent = "☾";
        themeToggle.setAttribute("aria-label", "Switch to light theme");
        themeToggle.setAttribute("title", "Switch to light theme");
    }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";

    localStorage.setItem("codeflow-theme", currentTheme);

    updateThemeIcon();
});


// ---------- Mobile Menu ----------
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    document.querySelectorAll("#navMenu a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
}


// ---------- Navbar Scroll ----------
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ---------- Reveal Animation ----------
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ---------- Active Navigation ----------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${entry.target.id}`
                    ) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.4
    }
);

sections.forEach((section) => {
    sectionObserver.observe(section);
});


// ---------- Current Year ----------
const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// ---------- Smooth Anchor Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ---------- Escape Key ----------
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }
    }
});

console.log("CODEFLOW JavaScript loaded successfully.");
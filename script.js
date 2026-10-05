document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       NAVBAR
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });


    /* =========================
       NAVBAR ACTIVE LINK
    ========================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar nav a");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =========================
       SCROLL ANIMATIONS
    ========================= */

    const animatedElements = document.querySelectorAll(
        ".section, .project-card, .info-card, .skill, .contact-section"
    );


    animatedElements.forEach(element => {
        element.classList.add("hidden");
    });


    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    animatedElements.forEach(element => {
        observer.observe(element);
    });


    /* =========================
       TYPING EFFECT
    ========================= */

    const typingText = document.getElementById("typing-text");

    const phrases = [
        "Estudiante · Creadora · Exploradora digital",
        "Aprendiendo · Creando · Experimentando",
        "Tecnología · Programación · Creatividad"
    ];


    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentPhrase = phrases[phraseIndex];


        if (!deleting) {

            typingText.textContent =
                currentPhrase.substring(0, characterIndex + 1);

            characterIndex++;


            if (characterIndex === currentPhrase.length) {

                deleting = true;

                setTimeout(typeEffect, 1800);

                return;
            }


        } else {

            typingText.textContent =
                currentPhrase.substring(0, characterIndex - 1);

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                phraseIndex++;

                if (phraseIndex >= phrases.length) {
                    phraseIndex = 0;
                }

            }

        }


        setTimeout(
            typeEffect,
            deleting ? 35 : 65
        );

    }


    typeEffect();


    /* =========================
       PROFILE PARALLAX
    ========================= */

    const profile = document.querySelector(".profile");


    document.addEventListener("mousemove", event => {

        if (window.innerWidth <= 900) {
            return;
        }


        const x =
            (window.innerWidth / 2 - event.clientX) / 35;

        const y =
            (window.innerHeight / 2 - event.clientY) / 35;


        profile.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    document.addEventListener("mouseleave", () => {

        profile.style.transform = "";

    });


    /* =========================
       PROJECT CARD TILT
    ========================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 900) {
                return;
            }


            const rect = card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX = rect.width / 2;
            const centerY = rect.height / 2;


            const rotateX =
                ((y - centerY) / centerY) * -4;

            const rotateY =
                ((x - centerX) / centerX) * 4;


            card.style.transform =
                `perspective(700px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =========================
       LOGO -> TOP
    ========================= */

    const logo = document.querySelector(".logo");


    logo.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

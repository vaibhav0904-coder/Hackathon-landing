
//  ------------------  Navigation Bar starts ------------------ //

function resizeNav() {
    // Set the nav height to fill the window
    $("#nav-fullscreen").css({"height": window.innerHeight});

    // Set the circle radius to the length of the window diagonal,
    // this way we're only making the circle as big as it needs to be.
    const radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
    const diameter = radius * 2;
    $("#nav-overlay").width(diameter);
    $("#nav-overlay").height(diameter);
    $("#nav-overlay").css({"margin-top": -radius, "margin-left": -radius});
}

// Set up click and window resize callbacks, then init the nav.
$(document).ready(function() {
    $("#nav-toggle").click(function() {
        $("#nav-toggle, #nav-overlay, #nav-fullscreen").toggleClass("open");
    });
    $(window).resize(resizeNav);
    resizeNav();
});

//  ------------------  Navigation Bar ends ------------------ //

//  ------------------  Scroll-Out config starts ------------------ //

ScrollOut({
    targets: 'p, span'
})

//  ------------------  Scroll-Out config ends ------------------ //


gsap.registerPlugin(ScrollTrigger);


window.onload = () => {
    GSAPScrollTrigger()
}

const sections = [...document.querySelectorAll("section")];

let options = {
    rootMargin: "0px",
    threshold: 0.75
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        const { target } = entry;

        if (entry.intersectionRatio >= 0.75) {
            target.classList.add("is-visible");
        } else {
            target.classList.remove("is-visible");
        }
    });
};

const observer = new IntersectionObserver(callback, options);

sections.forEach((section, index) => {
    const sectionChildren = [...section.querySelector("[data-content]").children];

    sectionChildren.forEach((el, index) => {
        el.style.setProperty("--delay", `${index * 250}ms`);
    });

    observer.observe(section);
});


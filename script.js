const hoverGradient = document.querySelector("#hover-gradient");
const gradientDuration = 1000;

// Utility Functions
// (rect : DOMRect, px : number, py : number)
function moveHoverGradient(rect, px, py) {
    hoverGradient.style.width = rect.width + px * 2;
    hoverGradient.style.height = rect.height + py * 2;
    hoverGradient.style.left = rect.x - px;
    hoverGradient.style.top = rect.y - py;
}

function easeInOut(t) {
  return t * t * (3 - 2 * t);
}

function piecewiseEase(t) {
    if (t < 0.5) {
        const u = t / 0.5;
        return 0.5 * easeInOut(u);
    }

    const u = (t - 0.5) / 0.5;
    return 0.5 + 0.5 * easeInOut(u);
}

function getGradientAngle(duration) {
    const t = (Date.now() % duration) / duration;
    return piecewiseEase(t) * 360.0;
}

// Global Events
window.addEventListener("resize", (e) => {
    moveHoverGradient({x: -100, y: -100, width: 0, height: 0}, 0, 0);
});

setInterval(() => {
    document.body.style.setProperty("--gradient-rot", `${getGradientAngle(gradientDuration)}deg`);
}, 0);

// Project List Alpha Gradient
const projects = document.querySelectorAll(".project");
projects.forEach((elm, i, _) => {
    const a = ((projects.length - i - 1) / projects.length) * 0.5 + 0.5;
    elm.style.color = `rgba(255, 255, 255, ${a})`;
});

// Link Hover Event
const links = document.querySelectorAll("a");
links.forEach((elm, i, _) => {
    elm.addEventListener("mouseenter", (e) => {
        const rect = elm.getBoundingClientRect();
        moveHoverGradient(rect, 15, 5);
    });
});
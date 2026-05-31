const q = x => { return document.querySelector(x); }

function doScrolling(elementY, duration) { 
    var startingY = window.pageYOffset;
    var diff = elementY - startingY;
    var start;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start;
        var percent = Math.min(time / duration, 1);
        
        var eased = percent < 0.5
            ? 2 * percent * percent
            : 1 - Math.pow(-2 * percent + 2, 2) / 2;

        window.scrollTo(0, startingY + diff * eased);

        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    });
}

q(".titlecard>.title").addEventListener("click", (e) => {
    doScrolling(document.body.clientHeight, 500);
});

function onResize(e) {
    // size to width ratio (fontSize / width)
    const r = 0.1364649789029536;
    let m = document.body.clientWidth - 200;
    if (m > 1200) m = 1200;
    q(".titlecard>.title").style.fontSize = `${m * r}px`;
    q(".titlecard>.title").style.lineHeight = q(".titlecard>.title").style.fontSize;
}
window.addEventListener("resize", onResize);
onResize(null);

document.addEventListener("scroll", (e) => {
    document.body.style.setProperty("--scrollPercentage", (window.scrollY / (document.body.scrollHeight - document.body.clientHeight) * 100) + "%");
});

document.querySelectorAll(".progress").forEach((e, i, _) => {
    const value = parseFloat(e.getAttribute("data-value")) | 0;
    const text = document.createElement("div");
    text.innerText = e.innerText;
    e.innerText = "";
    text.className = "text";
    e.appendChild(text);
    const slider = document.createElement("div");
    slider.className = "slider";
    const color = document.createElement("div");
    color.className = "color";
    color.style.width = `${45 * value / 100}vw`;
    slider.appendChild(color);
    e.appendChild(slider);
    const percText = document.createElement("div");
    percText.innerText = `${value}%`;
    percText.className = "percText";
    e.appendChild(percText);
});
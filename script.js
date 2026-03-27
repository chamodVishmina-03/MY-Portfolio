// window.addEventListener("scroll", () => {
//
//     const scrollTop = window.scrollY;
//     const docHeight = document.body.scrollHeight - window.innerHeight;
//     const p = scrollTop / docHeight;
//
//     const color1 = `rgb(${10 + p*30}, ${15 + p*40}, ${45 + p*50})`;
//     const color2 = `rgb(${0}, ${50 + p*40}, ${100 + p*50})`;
//
//     document.body.style.background =
//         `linear-gradient(270deg, ${color1}, ${color2}, ${color1})`;
//
// });

// Hamburger menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');

    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
}

// Nav link click කළාම menu close වෙන්න
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('nav-menu').classList.remove('open');
            document.getElementById('hamburger').classList.remove('active');
        });
    });
});
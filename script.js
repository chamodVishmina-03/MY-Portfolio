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

// ========== BUBBLE ANIMATION ==========
const canvas = document.getElementById('bubble-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse position track
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Touch support (mobile)
window.addEventListener('touchmove', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});

// Color palette
const colors = [
    '#cb79fa',
    '#8240f3',
    '#00e5ff',
    '#9fffcc',
    '#ff4081',
    '#ff9100',
    '#f8efa3',
    '#2979ff',
];

// Bubble class
class Bubble {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 40 + 10;
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.color = this.baseColor;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.speedY = (Math.random() - 0.5) * 1.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.growing = Math.random() > 0.5;
        this.pulseSpeed = Math.random() * 0.008 + 0.003;
    }

    // Distance from mouse
    distFromMouse() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse size
        if (this.growing) {
            this.radius += this.pulseSpeed * 10;
            if (this.radius > 55) this.growing = false;
        } else {
            this.radius -= this.pulseSpeed * 10;
            if (this.radius < 8) this.growing = true;
        }

        // Mouse interaction — color change + repel
        const dist = this.distFromMouse();
        if (dist < 120) {
            // Change color near mouse
            this.color = colors[Math.floor(Math.random() * colors.length)];
            // Repel from mouse
            const angle = Math.atan2(this.y - mouse.y, this.x - mouse.x);
            this.x += Math.cos(angle) * 2.5;
            this.y += Math.sin(angle) * 2.5;
            this.opacity = 0.7;
        } else {
            this.color = this.baseColor;
            this.opacity = Math.max(0.1, this.opacity - 0.01);
        }

        // Bounce off edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Gradient fill
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3,
            this.y - this.radius * 0.3,
            this.radius * 0.1,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, this.color + 'cc');
        gradient.addColorStop(1, this.color + '11');

        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.opacity;

        // Border glow
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Create bubbles
const bubbles = [];
const BUBBLE_COUNT = 35;

for (let i = 0; i < BUBBLE_COUNT; i++) {
    bubbles.push(new Bubble());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
    });

    requestAnimationFrame(animate);
}

animate();









// Hamburger menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');

    nav.classList.toggle('open');
    hamburger.classList.toggle('active');
}

// close click
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('nav-menu').classList.remove('open');
            document.getElementById('hamburger').classList.remove('active');
        });
    });
});







function openAllProjects() {
    const overlay = document.getElementById('all-projects-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAllProjects() {
    const overlay = document.getElementById('all-projects-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}







// Gallery click interaction
const galleryCards = document.querySelectorAll('.gallery-card');
const galleryDots  = document.querySelectorAll('.gdot');

galleryCards.forEach((card, i) => {
    card.addEventListener('click', () => {
        const isActive = card.classList.contains('g-active');
        galleryCards.forEach(c => c.classList.remove('g-active'));
        if (!isActive) {
            card.classList.add('g-active');
            galleryDots.forEach(d => d.classList.remove('active'));
            galleryDots[Math.min(Math.floor(i * 3 / 5), 2)].classList.add('active');
        }
    });
});
// Canvas setup for stars
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Star properties
const stars = [];
const shootingStars = [];
const numStars = 750;
const shootingStarThreshold = 0.1; // Scroll position where shooting stars appear (0-1)

// Create stars with different sizes
function initStars() {
    for (let i = 0; i < numStars; i++) {
        const size = Math.random() < 0.6 ? 1 : (Math.random() < 0.8 ? 2 : 3);
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: size,
            speed: 0.05 + (size * 0.05) // Larger stars move slightly faster
        });
    }
}

// Draw the stars
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get scroll position for parallax
    const scrollY = window.scrollY;
    const scrollFactor = scrollY / (document.body.scrollHeight - window.innerHeight);
    
    // Draw regular stars with parallax
    ctx.fillStyle = '#FFF';
    stars.forEach(star => {
        const parallaxY = (scrollY * star.speed) % canvas.height;
        let y = star.y - parallaxY;
        
        // If star goes off the top, wrap it to the bottom
        if (y < 0) {
            y += canvas.height;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Add shooting stars when we reach a certain scroll threshold
    if (scrollFactor > shootingStarThreshold && Math.random() < 0.01) {
        createShootingStar();
    }
    
    // Draw and update shooting stars
    updateShootingStars();
}

// Create a new shooting star
function createShootingStar() {
    const startX = Math.random() < 0.5 ? 0 : canvas.width;
    const startY = Math.random() * (canvas.height / 2);
    const angle = startX === 0 ? Math.PI * 0.25 : Math.PI * 0.75;
    
    shootingStars.push({
        x: startX,
        y: startY,
        dirX: Math.cos(angle) * (2 + Math.random() * 3),
        dirY: Math.sin(angle) * (2 + Math.random() * 3),
        size: 1,
        trail: [],
        alpha: 1
    });
}

// Update and draw shooting stars
function updateShootingStars() {
    ctx.strokeStyle = '#FFF';
    shootingStars.forEach((star, index) => {
        // Update position
        star.x += star.dirX;
        star.y += star.dirY;
        
        // Add to trail
        star.trail.push({x: star.x, y: star.y, alpha: 1});
        
        // Draw trail
        star.trail.forEach((point, i) => {
            point.alpha -= 0.05;
            if (point.alpha > 0) {
                ctx.globalAlpha = point.alpha;
                ctx.beginPath();
                ctx.arc(point.x, point.y, star.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        ctx.globalAlpha = 1;
        
        // Remove old trail points
        star.trail = star.trail.filter(point => point.alpha > 0);
        
        // Check if star is off-screen or trail is empty
        if (
            star.x < 0 || 
            star.x > canvas.width || 
            star.y < 0 || 
            star.y > canvas.height || 
            star.trail.length === 0
        ) {
            shootingStars.splice(index, 1);
        }
    });
}

// Animation loop
function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

// Initialize and start animation
initStars();
animate();
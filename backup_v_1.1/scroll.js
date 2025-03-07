// Handle scroll effects for projects
const projects = document.querySelectorAll('.project-showcase');
const skillButtons = document.querySelectorAll('.skill-button');

// Add staggered animation to skill buttons
function animateSkillButtons() {
    skillButtons.forEach((button, index) => {
        button.style.opacity = "0";
        button.style.transform = "translateY(20px)";
        button.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        button.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
    });
}

// Check if elements are visible in the viewport
function checkVisibility() {
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const isVisible = (
            rect.top < window.innerHeight * 0.8 && 
            rect.bottom > window.innerHeight * 0.2
        );
        
        if (isVisible && !project.classList.contains('visible')) {
            project.classList.add('visible');
            // Animate skill buttons when project becomes visible
            setTimeout(() => {
                skillButtons.forEach((button, index) => {
                    button.style.opacity = "1";
                    button.style.transform = "translateY(0)";
                });
            }, 800);
        }
    });
}

// Initialize skill buttons for animation
document.addEventListener('DOMContentLoaded', () => {
    animateSkillButtons();
});

// Event listeners for scrolling and resizing
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Initial check after a short delay to ensure elements are rendered
setTimeout(checkVisibility, 500);
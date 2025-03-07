// Handle scroll effects for projects
const projects = document.querySelectorAll('.project');

// Check if elements are visible in the viewport
function checkVisibility() {
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const isVisible = (
            rect.top < window.innerHeight * 0.8 && 
            rect.bottom > window.innerHeight * 0.2
        );
        
        if (isVisible) {
            project.classList.add('visible');
        } else {
            project.classList.remove('visible');
        }
    });
}

// Event listeners for scrolling and resizing
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Initial check after a short delay to ensure elements are rendered
setTimeout(checkVisibility, 100);
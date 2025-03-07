// Handle scroll effects for projects
document.addEventListener('DOMContentLoaded', () => {
    const projectWrappers = document.querySelectorAll('.project-wrapper');

    // Check if elements are visible in the viewport
    function checkVisibility() {
        projectWrappers.forEach((project) => {
            const rect = project.getBoundingClientRect();
            const isVisible = (
                rect.top < window.innerHeight * 0.8 && 
                rect.bottom > window.innerHeight * 0.2
            );
            
            if (isVisible) {
                project.classList.add('visible');
                
                // Add staggered animation to skill buttons within visible projects
                const skillButtons = project.querySelectorAll('.skill-button');
                skillButtons.forEach((button, index) => {
                    button.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
                });
            }
        });
    }

    // Event listeners for scrolling and resizing
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);

    // Initial check after a short delay to ensure elements are rendered
    setTimeout(checkVisibility, 500);
});
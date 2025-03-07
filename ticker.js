// Handle slideshow functionality
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slideshow .slide');
    let currentSlide = 0;
    
    // Function to move to the next slide
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide (loop back to beginning if at the end)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
    }
    
    // Start slideshow with a 5-second interval
    setInterval(nextSlide, 5000);
});
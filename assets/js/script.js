document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Cake cutting animation
    const cakeCuttingButton = document.getElementById('cake-cutting-button');
    if (cakeCuttingButton) {
        cakeCuttingButton.addEventListener('click', function() {
            const cakeImage = document.getElementById('cake-image');
            cakeImage.classList.add('animate');
            setTimeout(() => {
                alert('Happy Birthday! 🎉');
            }, 2000);
        });
    }

    // Image gallery lightbox
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            const img = document.createElement('img');
            img.src = this.src;
            lightbox.appendChild(img);
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
        });
    });
});
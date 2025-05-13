document.addEventListener('DOMContentLoaded', () => {
    const cube = document.querySelector('.cube');
    const container = document.querySelector('.cube-container');
    let isAutoRotating = true;
    let initialX, initialY;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;

    // Pause rotation when hovering over the cube
    container.addEventListener('mouseenter', () => {
        cube.style.animationPlayState = 'paused';
        isAutoRotating = false;
    });

    container.addEventListener('mouseleave', () => {
        if (!isDragging) {
            cube.style.animationPlayState = 'running';
            isAutoRotating = true;
        }
    });

    // Manual rotation with mouse drag
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        cube.style.animation = 'none';
        
        // Get the current rotation values
        const transform = window.getComputedStyle(cube).getPropertyValue('transform');
        const values = transform.split('(')[1].split(')')[0].split(',');
        if (values.length === 16) { // matrix3d
            currentRotationY = Math.atan2(parseFloat(values[8]), parseFloat(values[0])) * (180/Math.PI);
            currentRotationX = Math.atan2(-parseFloat(values[2]), Math.sqrt(parseFloat(values[0])**2 + parseFloat(values[1])**2)) * (180/Math.PI);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;
            
            const newRotationY = currentRotationY + (deltaX * 0.5);
            const newRotationX = currentRotationX + (deltaY * 0.5);
            
            cube.style.transform = `rotateX(${newRotationX}deg) rotateY(${newRotationY}deg)`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        if (!isAutoRotating) {
            cube.style.animation = 'rotate 20s infinite linear';
            cube.style.animationPlayState = 'paused';
        }
    });

    // Add pop-out effect on image hover
    const faces = document.querySelectorAll('.face');
    faces.forEach(face => {
        face.addEventListener('mouseenter', () => {
            face.style.transform = `${face.style.transform.split(')')[0]}) scale(1.1)`;
            face.style.zIndex = '1';
        });

        face.addEventListener('mouseleave', () => {
            face.style.transform = face.style.transform.split('scale')[0];
            face.style.zIndex = '0';
        });
    });

    // Add sparkle effect on click
    container.addEventListener('click', (e) => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
}); 
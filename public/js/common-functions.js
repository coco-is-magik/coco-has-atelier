/*
 * Noise generator
 */
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.querySelector('.noise');
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function generateNoise(density = 0.1) {
        const imageData = ctx.createImageData(width, height);

        for (let i = 0; i < imageData.data.length; i += 4) {
            // Use density to control the likelihood of a white dot appearing
            if (Math.random() < density) {
                const whiteValue = 255;
                const greyAdjust = 75;
                const alpha = Math.random() * 255; // Random opacity for the white dots

                imageData.data[i] = whiteValue - greyAdjust;
                imageData.data[i + 1] = whiteValue - greyAdjust;
                imageData.data[i + 2] = whiteValue - greyAdjust;
                imageData.data[i + 3] = alpha;
            } else {
                // Leave the pixel fully transparent
                imageData.data[i + 3] = 0;
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function animateNoise() {
        generateNoise(0.05); // Adjust this value (density) to control noise density
        setTimeout(animateNoise, 100); // Adjust this value to control the speed of noise changes
    }

    animateNoise();
});

/*
 * Sidebar buttons
 */
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.grid-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            handleButtonClick(action);
        });
    });

    function handleButtonClick(action) {
        switch(action) {
            case 'go-to-prodefch':
                window.open('https://prodefch.net/', '_blank');
                break;
            case 'go-to-wapchan':
                window.open('https://wapchan.org/', '_blank');
                break;
            case 'go-to-invid':
                window.open('https://docs.invidious.io/instances/', '_blank');
                break;
            case 'toggle-music':
                // Toggle the music on and off
                alert('In progress feature!');
                break;
            case 'toggle-anim':
                // Toggle the animation on and off
                alert('In progress feature!');
                break;
            case 'toggle-matrix':
                // Toggle the matrix on and off
                alert('In progress feature!');
                break;
            case 'toggle-gifs':
                // Toggle the gifs on and off
                alert('In progress feature!');
                break;
            case 'go-to-blog':
                window.location.href = 'blog.html';
                break;
            case 'go-to-money':
                window.location.href = 'financialplanner.html';
                break;
            case 'go-to-pokemon':
                window.location.href = 'pokemonteambuilder.html';
                break;
            case 'go-to-cybernews':
                window.location.href = 'cybersecuritynewsfeed.html';
                break;
            default:
                console.log('Unknown action:', action);
        }
    }
});

/*
 * Shaking boxes
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animateTremble() {
    const elementswhite = document.getElementsByClassName('shake');

    for (const element of elementswhite) {
        const beforeElement = window.getComputedStyle(element, '::before');
    
        let lastTime = 0;
        const interval = 500; // Time between trembles in milliseconds

        function tremble(timestamp) {
            if (timestamp - lastTime >= interval) {
                // Generate random values for the trembling effect
                const borderWidth = getRandomInt(1, 3) + 'px';
                const transformX = getRandomInt(-1, 1) + 'px';
                const transformY = getRandomInt(-1, 1) + 'px';
                const rotate = getRandomInt(-1, 1) + 'deg';

                // Apply the random styles
                element.style.borderWidth = borderWidth;
                element.style.transform = `translate(${transformX}, ${transformY}) rotate(${rotate})`;

                // Change the ::before element (this requires adding a dynamic style)
                element.style.setProperty('--before-border-width', borderWidth);
                element.style.setProperty('--before-transform', `translate(${transformX}, ${transformY}) rotate(${rotate})`);

                lastTime = timestamp; // Update the last time
            }
            
            // Repeat the animation
            requestAnimationFrame(tremble);
        }

        tremble(0); // Start the animation
    }
}

// Start the animation when the page loads
document.addEventListener('DOMContentLoaded', animateTremble);
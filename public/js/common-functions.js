/*
 * common-functions.js
 * script for common functions across pages
 * Wrap everything in an IIFE to prevent polluting the global scope
 */
(function() {
    /*
    * Listener tracker
    */
    const listenerTracker = {
        listeners: [],

        addListener(element, event, handler) {
            element.addEventListener(event, handler);
            this.listeners.push({ element, event, handler });
        },

        removeAllListeners() {
            this.listeners.forEach(({ element, event, handler }) => {
                element.removeEventListener(event, handler);
            });
            this.listeners = []; // Clear the list after removing all listeners
        }
    };

    /*
    * Noise generator
    */
    function setupNoiseGenerator() {
        const canvas = document.querySelector('.noise');
        const ctx = canvas.getContext('2d');
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        function generateNoise(density = 0.1) {
            const imageData = ctx.createImageData(width, height);

            for (let i = 0; i < imageData.data.length; i += 4) {
                if (Math.random() < density) {
                    const whiteValue = 255;
                    const greyAdjust = 75;
                    const alpha = Math.random() * 255;

                    imageData.data[i] = whiteValue - greyAdjust;
                    imageData.data[i + 1] = whiteValue - greyAdjust;
                    imageData.data[i + 2] = whiteValue - greyAdjust;
                    imageData.data[i + 3] = alpha;
                } else {
                    imageData.data[i + 3] = 0;
                }
            }

            ctx.putImageData(imageData, 0, 0);
        }

        function animateNoise() {
            generateNoise(0.05);
            setTimeout(animateNoise, 100);
        }

        animateNoise();
    }

    listenerTracker.addListener(document, 'DOMContentLoaded', setupNoiseGenerator);

    function setupBoxNoiseGenerator() {
        // Target all elements with class 'box-noise'
        const noiseCanvases = document.querySelectorAll('.box-noise');
        
        noiseCanvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            canvas.width = width;
            canvas.height = height;

            function generateBoxNoise(density = 0.05) {
                const imageData = ctx.createImageData(width, height);

                for (let i = 0; i < imageData.data.length; i += 4) {
                    // Use density to control the likelihood of a black dot appearing
                    if (Math.random() < density) {
                        const blackValue = 0;
                        const greyAdjust = 100; // Adjust for darker dots if desired
                        const alpha = Math.random() * 255; // Random opacity for the black dots

                        imageData.data[i] = blackValue + greyAdjust;
                        imageData.data[i + 1] = blackValue + greyAdjust;
                        imageData.data[i + 2] = blackValue + greyAdjust;
                        imageData.data[i + 3] = alpha;
                    } else {
                        // Leave the pixel fully transparent
                        imageData.data[i + 3] = 0;
                    }
                }

                ctx.putImageData(imageData, 0, 0);
            }

            function animateBoxNoise() {
                generateBoxNoise(0.05); // Adjust this value (density) to control noise density
                setTimeout(animateBoxNoise, 1000); // Adjust this value to control the speed of noise changes
            }

            animateBoxNoise();
        });
    }

    listenerTracker.addListener(document, 'DOMContentLoaded', setupBoxNoiseGenerator);

    /*
    * Sidebar buttons
    */
    function setupSidebarButtons() {
        const buttons = document.querySelectorAll('.grid-button');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const action = this.getAttribute('data-action');
                handleButtonClick(action);
            });
        });

        function handleButtonClick(action) {
            switch(action) {
                /*
                * Cool sites
                */
                case 'go-to-prodefch':
                    window.open('https://prodefch.net/', '_blank');
                    break;
                case 'go-to-wapchan':
                    window.open('https://wapchan.org/', '_blank');
                    break;
                /*
                * Minor Features
                */
                case 'toggle-animation':
                    // Toggle the animation on and off
                    alert('In progress feature!');
                    break;
                case 'toggle-music':
                    // Toggle the music on and off
                    alert('In progress feature!');
                    break;
                case 'toggle-matrix':
                    // Toggle the matrix on and off
                    alert('In progress feature!');
                    break;
                /*
                * Load other sites
                */
                case 'go-to-index':
                    window.location.href = 'index.html';
                    break;
                case 'go-to-blog':
                    //window.location.href = 'blog.html';
                    window.location.href = 'underconstruction.html';
                    break;
                case 'go-to-money':
                    //window.location.href = 'financialplanner.html';
                    window.location.href = 'underconstruction.html';
                    break;
                case 'go-to-forum':
                    //window.location.href = 'forum.html';
                    window.location.href = 'underconstruction.html';
                    break;
                case 'go-to-cybersecurity':
                    //window.location.href = 'cybersecuritynewsfeed.html';
                    window.location.href = 'underconstruction.html';
                    break;
                case 'go-to-applanding':
                    //window.location.href = 'applanding.html';
                    window.location.href = 'underconstruction.html';
                    break;
                default:
                    console.log('Unknown action:', action);
            }
        }
    }

    listenerTracker.addListener(document, 'DOMContentLoaded', setupSidebarButtons);

    /*
    * Shaking boxes
    */
    function setupShake() {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

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

    listenerTracker.addListener(document, 'DOMContentLoaded', setupShake);

    /*
    * Unload all listeners
    */
    window.addEventListener('unload', () => {
        listenerTracker.removeAllListeners();
    });
})();
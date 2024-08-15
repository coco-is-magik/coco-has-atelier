/*
 * index-script.js
 * Script for the index.html page
 * wrap everything in an IIFE to prevent polluting the global scope
 */
(function() {
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

    function setupCollapsibleHeaders() {
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
        collapsibleHeaders.forEach(header => {
            header.addEventListener('click', function () {
                // Find the arrow span within the header
                const arrow = this.querySelector('.arrow');
                
                // Check the current text and switch it
                if (arrow.textContent === '▶') { // Side arrow
                    arrow.textContent = '▼'; // Down arrow
                } else {
                    arrow.textContent = '▶'; // Side arrow
                }
    
                // Toggle the display of the content
                const content = this.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        });
    }

    listenerTracker.addListener(window, 'DOMContentLoaded', setupCollapsibleHeaders);
})();
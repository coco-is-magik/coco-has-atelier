document.addEventListener('DOMContentLoaded', function () {
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
});

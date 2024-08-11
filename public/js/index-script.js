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

function submitComment() {
    const formData = new FormData();
    formData.append('entry.720654468', document.getElementById('entryName').value); // Name
    formData.append('entry.1934187383', document.getElementById('entryWebsite').value); // Website
    formData.append('entry.1874852356', document.getElementById('entryMessage').value); // Message

    fetch('https://docs.google.com/forms/d/e/1FAIpQLSfUznmmxVUaUa89AEXHDXCLMohL-T3RFDJE2aKuSwxaiJ9aMQ/formResponse', {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // 'no-cors' mode is required for cross-origin POST requests to Google Forms
    }).then(() => {
        document.getElementById('c_form').reset(); // Clear the form after submission
        // Delay the loading of comments to ensure Google Sheets has updated
        setTimeout(() => {
            loadComments(); // Reload comments after submission
        }, 2000); // 2-second delay to allow Google Sheets to update
    }).catch(error => {
        console.error('Error:', error);
    });
}

function checkTimestampExists(timestamp) {
    // Select all elements with the class 'c-timestamp'
    const timestamps = document.querySelectorAll('.c-timestamp');

    // Loop through each element and check if it contains the desired text
    for (let i = 0; i < timestamps.length; i++) {
        if (timestamps[i].innerText === timestamp) {
            return true; // A match is found
        }
    }

    return false; // No match found
}

function loadComments() {
    const commentsContainer = document.getElementById('c_commentsContainer');
    //commentsContainer.innerHTML = ''; // Clear existing comments

    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0gUZFJh24Gte4NbJssGTdUC26JHJ-ysdLWbLNrcBoZYnmjXx2Puh1UmDLxmuAEO8u7YXCrAZkWA39/pubhtml';
    const cacheBuster = new Date().getTime();
    const fetchUrl = `${url}?nocache=${cacheBuster}`;
    fetch(fetchUrl)
        .then(response => response.text())
        .then(html => {
            // Create a new DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Assuming your data is in a table, find the rows of the table
            const rows = doc.querySelectorAll('table tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const timestamp = cells[0].innerText;
                    const name = cells[1].innerText;
                    const website = cells[2].innerText;
                    const message = cells[3].innerText;

                    if (name == "name" || name == "") {
                        return;
                    }

                    if (!checkTimestampExists(timestamp)) {
                        const commentDiv = document.createElement('div');
                        commentDiv.className = 'c-comment';
                        commentDiv.innerHTML = `
                            <h6>${name} ${website ? `<a href="${website}" target="_blank" class="c-site">${website}</a>` : ''}</h6>
                            <span class="c-timestamp">${timestamp}</span>
                            <p>${message}</p>
                        `;
                        commentsContainer.appendChild(commentDiv);
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Poll for new comments every 30 seconds
setInterval(loadComments, 30000);

// Call the function to load comments when the page loads
window.onload = loadComments;
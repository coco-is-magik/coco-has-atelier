/*
 * Comment Box
 */
function submitComment() {
    // Populate the hidden form with the input values
    document.getElementById('hiddenEntryName').value = document.getElementById('entryName').value;
    document.getElementById('hiddenEntryWebsite').value = document.getElementById('entryWebsite').value;
    document.getElementById('hiddenEntryMessage').value = document.getElementById('entryMessage').value;

    // Submit the hidden form
    document.getElementById('hiddenForm').submit();

    // Clear the original form after submission
    document.getElementById('c_form').reset(); 
    alert("Thank you for your comment! It may take up to 5 minutes to appear!");
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
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT0gUZFJh24Gte4NbJssGTdUC26JHJ-ysdLWbLNrcBoZYnmjXx2Puh1UmDLxmuAEO8u7YXCrAZkWA39/pubhtml';
    const cacheBuster = new Date().getTime();
    const fetchUrl = `${url}?nocache=${cacheBuster}`;
    fetch(fetchUrl)
        .then(response => response.text())
        .then(html => {
            // Create a new DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Find the rows of the table
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

            // Ensure the scroll happens after DOM updates
            setTimeout(() => {
                commentsContainer.scrollTop = commentsContainer.scrollHeight;
            }, 0);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to load comments when the page loads
window.onload = loadComments;

// Make sure that we only have one interval
clearInterval(loadComments);

// Poll for new comments every 5 minutes, the cache timer
setInterval(loadComments, (60000) * 5);
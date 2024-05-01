function runQuery() {
    // Change the button text to "On process..."
    var button = document.querySelector('.editor button');
    button.textContent = 'On process...';

    // Get the SQL query entered by the user
    var query = document.getElementById('queryInput').value;

    // Send the query to the server via an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/query', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            // If the request is successful, display the results in the results table
            var response = JSON.parse(xhr.responseText);
            if (response.message) {
                displayMessage(response.message);
            } else {
                displayResults(response.results);
            }
        } else {
            // If the request fails, display an error message in the error zone
            var errorResponse = JSON.parse(xhr.responseText);
            displayError(errorResponse.error);
        }

        // Restore the button text to "Run Query"
        button.textContent = 'Run Query';
    };
    xhr.send(JSON.stringify({ query: query }));
}



function displayResults(results) {
    // Display the results in the results table
    var table = document.getElementById('queryResults');
    var tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    } else {
        tbody.innerHTML = '';
    }

    // Create column headers
    var headerRow = document.createElement('tr');
    for (var column in results[0]) {
        var headerCell = document.createElement('th');
        headerCell.textContent = column;
        headerRow.appendChild(headerCell);
    }
    tbody.appendChild(headerRow);

    // Fill in the results data
    results.forEach(function(rowData) {
        var row = document.createElement('tr');
        for (var column in rowData) {
            var cell = document.createElement('td');
            cell.textContent = rowData[column];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    });

    // Display the results section
    document.querySelector('.results').style.display = 'block';
}

function displayMessage(message) {
    var messageElement = document.getElementById('message');
    var errorElement = document.getElementById('error');
    var messageContent = document.getElementById('messageContent');

    messageContent.textContent = message;
    messageElement.style.display = 'block';

    // Hide error message if displayed
    errorElement.style.display = 'none';
}

function displayError(error) {
    var errorElement = document.getElementById('error');
    var messageElement = document.getElementById('message');
    var errorContent = document.getElementById('errorContent');

    errorContent.textContent = error;
    errorElement.style.display = 'block';

    // Hide message if displayed
    messageElement.style.display = 'none';
}

function closeMessage() {
    var messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
}

function closeError() {
    var errorElement = document.getElementById('error');
    errorElement.style.display = 'none';
}

function closeResults() {
    document.querySelector('.results').style.display = 'none';
}


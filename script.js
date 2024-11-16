document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const errorMessages = document.getElementById('errorMessages');

    const constraints = {
        name: {
            presence: { allowEmpty: false, message: "^Name is required" },
            length: { minimum: 3, message: "^Name must be at least 3 characters long" }
        },
        email: {
            presence: { allowEmpty: false, message: "^Email is required" },
            email: { message: "^Please enter a valid email address" }
        },
        message: {
            presence: { allowEmpty: false, message: "^Message is required" }
        }
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formValues = {
            name: form.elements.name.value,
            email: form.elements.email.value,
            message: form.elements.message.value
        };

        const errors = validate(formValues, constraints);

        if (errors) {
            errorMessages.innerHTML = Object.values(errors).map(error => `<p>${error[0]}</p>`).join('');
        } else {
            errorMessages.innerHTML = '';
            form.submit();
        }
    });

    fetchData();
});

function fetchData() {
    fetch('display.php')
        .then(response => response.json())
        .then(data => {
            const dataTable = document.getElementById('dataTable');
            let tableHTML = '<table><tr><th>id</th><th>Name</th><th>Email</th><th>Message</th></tr>';
            
            data.forEach(row => {
                tableHTML += `<tr><td>${row.id}</td><td>${row.name}</td><td>${row.email}</td><td>${row.message}</td></tr>`;
            });
            
            tableHTML += '</table>';
            dataTable.innerHTML = tableHTML;
        })
        .catch(error => console.error('Error:', error));
}
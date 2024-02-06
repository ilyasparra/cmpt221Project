document.addEventListener('DOMContentLoaded', function () {
    // Function to handle account creation form submission
    document.getElementById('accountCreationForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Extract form data
        const formData = {
            firstname: document.getElementById('firstName').value,
            lastname: document.getElementById('lastName').value,
            DOB: document.getElementById('dob').value,
            username: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
        //    securityQuestion: document.getElementById('securityQuestion').value,
        //    securityAnswer: document.getElementById('securityAnswer').value
        };

        // Add logic to handle form data 

        // Clear the form
        document.getElementById('accountCreationForm').reset();
    });
});


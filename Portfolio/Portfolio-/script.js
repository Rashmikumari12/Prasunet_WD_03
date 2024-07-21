document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const thankYouSection = document.getElementById("thank-you");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                form.style.display = 'none';
                thankYouSection.style.display = 'block';
                thankYouSection.innerHTML = `<h2>Thank You!</h2><p>Your message has been sent successfully.</p>`;
            } else {
                return response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        const errors = data["errors"].map(error => error["message"]).join(", ");
                        throw new Error(errors);
                    } else {
                        throw new Error("There was a problem submitting your form");
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            thankYouSection.style.display = 'block';
            thankYouSection.innerHTML = `<h2>Error</h2><p>There was an error submitting your form: ${error.message}</p>`;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('health-check-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect all checkbox values from the form
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    const formData = {};

    checkboxes.forEach(function(checkbox) {
      const questionId = checkbox.name.replace('[]', '');
      if (!formData[questionId]) {
        formData[questionId] = [];
      }
      if (checkbox.checked) {
        formData[questionId].push(checkbox.value);
      }
    });

    // Send the form data to the server
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(message => {
      alert(message); // Alert success or error message from server
      form.reset();   // Optionally reset the form after submission
    })
    .catch(error => console.error('Error:', error));
  });
});

  
console.log('Login JS...');
console.log('Login JS...');
const form = document.getElementById('loginForm');

/*
1 - Select the Form
2 - Listen for submit & prevent default
3 - Get form values
4 - Validate values
5 - Submit request if valid
6 - Redirect to Login on success
*/

// Submit Event Listener
form.addEventListener('submit', handleLoginSubmit);

// Handle Submit
function handleLoginSubmit(event) {
  let formIsValid = true;
  const userData = {};
  event.preventDefault();

  // Clear Alert Messages
  document.querySelectorAll('.invalid-feedback').forEach((alert) => alert.remove());

  // const formInputs = Array.from(form.elements);
  const formInputs = [...form.elements];
  formInputs.forEach((input) => {
    input.classList.remove('is-invalid');
    if (input.type !== 'submit' && input.value === '') {
      formIsValid = false;
      // Add Red Border to Input
      input.classList.add('is-invalid');
      // Add Error Message Below Input
      input.insertAdjacentHTML('afterend', `
        <div class="invalid-feedback ${input.id}-message">
          Please enter your ${input.name}
        </div>
      `);
    } else if (input.type === 'password' && input.value.length < 4) {
        formIsValid = false;
        // Add Red Border to Input
        input.classList.add('is-invalid');
        // Add Error Message Below Input
        input.insertAdjacentHTML('afterend', `
          <div class="invalid-feedback ${input.id}-message">
            Password must be at least 4 characters
          </div>
        `);
    }

    if (formIsValid) {
      userData[input.name] = input.value;
    }
  });

  if (formIsValid) {
    // SUBMIT DATA TO SERVER
    console.log('Submitting User Data ---->', userData)
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location = '/profile';
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
}

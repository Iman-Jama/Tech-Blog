const registerFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-reg').value.trim();
    const email = document.querySelector('#email-reg').value.trim();
    const password = document.querySelector('#password-reg').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('.register-form')
    .addEventListener('submit', registerFormHandler);
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordValid = document.querySelector('#passRe-signup').value.trim();
  const passwordHelp = document.querySelector('#passwordHelpBlock');

  if (username && email && password && passwordValid) {
    if (password === passwordValid) {
      passwordHelp.hidden = true;
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } else {
      passwordHelp.hidden = false;
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

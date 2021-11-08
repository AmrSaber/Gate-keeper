const submitButton = document.getElementById('submit');
const keyInput = document.getElementById('key');
const passwordInput = document.getElementById('password');

submitButton.onclick = (e) => {
  e.preventDefault();
  console.log('Clicked');
  key = keyInput.value;
  password = passwordInput.value;

  fetch(`api/keys/${key}`, { headers: { 'X-PASSWORD': password } })
    .then(response => {
      const status = response.status;
      response.json().then(body => {
        if(status !== 200) {
          alert(`${status} - ${body.message}`)
        } else {
          window.location.replace(body.url);
        }
      })
    }).catch(err => {
      console.error(err);
      alert(err.message);
    });
};
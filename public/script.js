const urlParams = new URLSearchParams(window.location.search);
const queryKey = urlParams.get('key');

// Show related fields based on the existence of the key query
{
  document.getElementById('key-text').innerHTML = queryKey;

  if (queryKey == null) {
    document.getElementById('key-text').style.display = 'none';
    document.getElementById('key').style.display = 'inline';
  }

  document.querySelector('form').style.display = 'grid';
}

// Get key & password and handle the submit key click
{
  document.getElementById('submit').onclick = e => {
    e.preventDefault();

    const key = queryKey || document.getElementById('key').value;
    const password = document.getElementById('password').value;

    fetch(`api/keys/${key}`, { headers: { 'X-PASSWORD': password } })
      .then(response => {
        const { status } = response;
        response.json().then(body => {
          if (status !== 200) {
            alert(`${status} - ${body.message}`); // eslint-disable-line no-alert
          } else {
            // Redirect to URL
            window.location.replace(body.url);
          }
        });
      })
      .catch(err => {
        console.error(err); // eslint-disable-line no-console
        alert(err.message); // eslint-disable-line no-alert
      });

    document.getElementById('password').focus();
  };
}

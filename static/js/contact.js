document.getElementById('submitMessage').addEventListener('submit', submitMessage);
function processResponse(response) {
    if (response.status === 200) {
        document.getElementById('container').classList.remove('running');
        output =
            `
        <div class="alert alert-success" role="alert">
          Thanks, ${document.getElementById('name').value}! We'll be in touch soon!
        </div>        
        `;
        document.getElementById('output').innerHTML = output;
        document.getElementById('submitMessage').style.visibility = "hidden";
    } else {
        output =
            `
        <div class="alert alert-danger" role="alert">
          Oh no! Something went wrong :(
        </div>        
        `;
        document.getElementById('output').innerHTML = output;
    }
}
function submitMessage(e) {
    e.preventDefault();
    // add running
    document.getElementById('container').classList.add('running');
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    fetch('https://h3tech.azurewebsites.net/api/contact', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then((res) => processResponse(res))
}
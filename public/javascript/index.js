const form = document.querySelector('form');

form.onsubmit = sendData;

function sendData(e) {
    e.preventDefault();

    document.querySelector('.errorContainer').style.display = "none";

    let formData = new FormData(form);


    let Params = {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            phone1: formData.get('phone1'),
            phone2: formData.get('phone2'),
            phone3: formData.get('phone3'),
            zipCode: formData.get('zipCode'),
            age: formData.get('over18'),
        }),
        method: "POST",
    };


    fetch('http://localhost:3000/formData', Params)
    .then(response => response.json())
    .then(data => {
        
        document.querySelector('.errorContainer').style.display = "block";

        let error = document.querySelector('.error');
        // data.errors.forEach((err) => {
            
        //     error.innerHTML += `<li>${err.msg}</li>`;

        // });

        error.innerHTML = `<li>${data.errors[0].msg}</li>`;

    })
    .catch(error => console.log(error));
    
}
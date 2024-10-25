

document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Sprečava slanje forme

    const name = document.getElementById('Username').value;
    const email = document.getElementById('email').value;
    const pw = document.getElementById('pw').value;



    console.log(`Email: ${email}`);
    console.log(`Username: ${name}`);
    console.log(`Password: ${pw}`);
    
});
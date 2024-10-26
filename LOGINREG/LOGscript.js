// Login Form skirpta


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('Username').value;
    const pw = document.getElementById('pw').value;

    //Ispis na konzolu  
    /*
    console.log(`Email: ${email}`);
    console.log(`Username: ${name}`);
    console.log(`Password: ${pw}`);
    */

  
    // Slanje podataka na server
    fetch('/submitLOG', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8" 
        },
        
        body: JSON.stringify({ name: name,  pw: pw }) // Konvertuje podatke u JSON
        
    })
    .then(response => response.text()) // Očekuje odgovor u tekstualnom formatu
    .then(data => {
        alert(data); // Prikazuje odgovor korisniku
    })
    .catch(error => console.error('Greška:', error)); // Obrada grešaka
});
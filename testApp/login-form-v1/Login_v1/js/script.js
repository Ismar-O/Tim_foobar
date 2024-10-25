document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Sprečava podrazumevano ponašanje forme

    const ime = document.getElementById('ime').value; // Uzimanje vrednosti imena
    const email = document.getElementById('email').value; // Uzimanje vrednosti emaila

    // Slanje podataka na server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Definiše tip sadržaja
        },
        body: JSON.stringify({ ime: ime, email: email }) // Konvertuje podatke u JSON
    })
    .then(response => response.text()) // Očekuje odgovor u tekstualnom formatu
    .then(data => {
        alert(data); // Prikazuje odgovor korisniku
    })
    .catch(error => console.error('Greška:', error)); // Obrada grešaka
});
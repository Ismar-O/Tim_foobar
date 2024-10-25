const express = require('express');  //Za serviranje cijelih stranica
const path = require('path'); 
const bodyParser = require('body-parser'); //Za parsiranje 
const app = express();
const port = 8000;

const { MongoClient } = require("mongodb");

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});

// Serve static files from the 'webpage' directory
app.use(express.static(path.join(__dirname, 'login-form-v1/Login_v1')));

const uri = "mongodb+srv://ajdinbegic:abcd@cluster0.obzpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

document.getElementById('submitLink').addEventListener('click', function(event) {
    event.preventDefault(); // Sprečava podrazumevano ponašanje linka

    const feedInput = document.getElementById('feedInput').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: feedInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('feedOutput').innerHTML = '';
        data.forEach(entry => {
            const p = document.createElement('p');
            p.textContent = entry.text;
            document.getElementById('feedOutput').appendChild(p);
            pageWrite("tekst", p);
        });
    })
    .catch(error => console.error('Greška:', error));
});
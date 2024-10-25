const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

const { MongoClient } = require("mongodb");

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});

// Serve static files from the 'webpage' directory
app.use(express.static(path.join(__dirname, 'login-form-v1/Login_v1')));




// Replace the uri string with your connection string.
const uri = "mongodb+srv://ajdinbegic:abcd@cluster0.obzpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);



// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const name = req.body.name; // Access the 'name' field
    const email = req.body.email; // Access the 'email' field

    // Log the received data to the console
    console.log('Received data:', { name, email });

    // Send a response back to the client
    res.send(`Thank you for your submission, ${name}!`);
});




let pageLogin = {

    getEntry: async function (ime){
        try {
          const database = client.db('page');
          const pageUsers = database.collection('users');
          const query = { Username: ime };
          const pageUserName = await pageUsers.findOne(query);
          console.log(pageUserName._id);
   

        } finally {
     
          await client.close();
        }
      }
    }


pageLogin.getEntry("Ismar").catch(console.dir);




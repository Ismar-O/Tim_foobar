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




getEntry("users", "", "Ismar").catch(console.dir);



app.use(bodyParser.urlencoded({ extended: true }));          

//Handling submision get req


app.use(express.json());


app.post('/submitREG', (req, res) => {
    const ime = req.body.name; // Access the 'name' field
    const email = req.body.email; // Access the 'email' field
    const pw = req.body.pw; // Access the 'pw' field
      // Log the received data to the console
    console.log('Received data:', {ime , email, pw });
      // Send a response back to the client
     res.send(`Thank you for your submission, ${ime}!`);
   
    const myobj = { Username: ime, Password: pw, Email: email };
    pageWrite("users", myobj);

    res.redirect('../index.html');
    

});



app.post('/submitLOG', (req, res) => {
    const ime = req.body.name; // Access the 'name' field
    const pw = req.body.pw; // Access the 'pw' field
      // Log the received data to the console
    console.log('Received data:', {ime, pw});
      // Send a response back to the client
    res.send(`Thank you for your submission, ${ime}!`);

    getEntry()

});



  async function pageWrite(pageColl, obj) {
    const client = new MongoClient(uri);
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected successfully to server");
        // Select the database
      const db = client.db("page");
        // Insert the document into the collection
      const result = await db.collection(pageColl).insertOne(obj);
      console.log("1 document inserted", result);
      } catch (err) {
      console.error("An error occurred:", err);
    } finally {
         await client.close();
    }
  }


  
async function getEntry(pageColl, title, value){
    try {
      const database = client.db('page');
      const pageUsers = database.collection(pageColl);
      const query = { Username: value };
      const pageUserName = await pageUsers.findOne(query);
      //console.log(pageUserName._id);

    } finally {     
      await client.close();
    }

}




  


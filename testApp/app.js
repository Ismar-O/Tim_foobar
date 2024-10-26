const express = require('express');         //Za serviranje cijelih stranica
const path = require('path'); 
const bodyParser = require('body-parser');  //Za parsiranje 
const app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
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




//getEntry("users", "", "Ismar").catch(console.dir);



app.use(bodyParser.urlencoded({ extended: true }));          

//Handling submision get req



app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'login-form-v1/Login_v1/register.html'))
})
    
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,'login-form-v1/Login_v1/index.html'))
})
app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,'login-form-v1/Login_v1/default.html'))
})

app.get("/wrongpass",(req,res)=>{
  res.sendFile(path.join(__dirname,'login-form-v1/Login_v1/wrongpass.html'))
})


app.use(express.json());
app.post('/submitREG', (req, res) => {
    let ime = req.body.Username; // Access the 'name' field
    let email = req.body.Email; // Access the 'email' field
    let pw = req.body.Pass; // Access the 'pw' field
      // Log the received data to the console
    console.log('Received data:', {ime , email, pw });
      // Send a response back to the client
    //console.log(req);

    const myobj = { Username: ime, Password: pw, Email: email };


    pageWrite("users", myobj);

    
    res.redirect('/login')
    

});




app.post('/submitLOG', (req, res) => {
    const ime = req.body.Username; // Access the 'name' field
    const pw = req.body.Pass; // Access the 'pw' field
      // Log the received data to the console
    console.log('Received data:', {ime, pw});
      // Send a response back to the client
    getEntry('users', ime).then(result => {


      if(result == pw){

        res.redirect('/home');
      }else{
        res.redirect('/wrongpass');
      }
    
      console.log("Ovo je podatak " + result);
  }).catch(error => {
      console.error(error);
  });



    res.cookie("userData", ime); 
  
 

});



app.post('/submitWP', (req, res) => {

      res.redirect('/login');


});



  async function pageWrite(pageColl, obj) {
   
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
  
async function getEntry(pageColl, value){
    try {
      await client.connect();
      const database = client.db('page');
      const pageUsers = database.collection(pageColl);
      const query = { Username: value };
      const pageUserName = await pageUsers.findOne(query);
      //    console.log(pageUserName._id);

      if(pageUserName == null){
        return null;
      }else{
        return pageUserName.Password
      }

    } finally {     
      await client.close();
    }

}


/*~~~~~~~~~~~~~~~~~~~~ Cookies ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */






  app.get('/home', (req, res)=>{ 
    //shows all the cookies 
    //res.send(req.cookies); 
    res.send("home page")
    });



  
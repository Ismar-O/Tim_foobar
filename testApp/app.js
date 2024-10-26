/*************** TIM FOOBAR *********************/

/*Ajdin Begić, Edin Suljić, Ismar Osmanović*/


const express = require('express');            //Serving pages
const path = require('path');           
const bodyParser = require('body-parser');     //Parsing
const app = express();
var cookieParser = require('cookie-parser');   //Parsing cookies
app.use(cookieParser());
const port = 8000;                             //Server port

const { MongoClient } = require("mongodb");   

// Starting server
app.listen(port, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});

// Serve static files from the 'webpage' directory
app.use(express.static(path.join(__dirname, 'login-form-v1/Login_v1')));


const uri = "mongodb+srv://ajdinbegic:abcd@cluster0.obzpy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  //Link for mongoDB database

const client = new MongoClient(uri); 


app.use(bodyParser.urlencoded({ extended: true }));          


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
    let ime = req.body.Username;  // Access to name field
    let email = req.body.Email;   // Access to email field
    let pw = req.body.Pass;       // Access to pass field
      
    console.log('Received data:', {ime , email, pw });

      // Returning data to the client

    const myobj = { Username: ime, Password: pw, Email: email };
    pageWrite("users", myobj);
    res.redirect('/login')
  

});




app.post('/submitLOG', (req, res) => {
    const ime = req.body.Username; // Access to name field
    const pw = req.body.Pass;     // Access to Password field

    console.log('Received data:', {ime, pw});
      // Send a response back to the client
    getEntry('users', ime).then(result => {

      if(result == pw){
        res.redirect('/home');
      }else{
        res.redirect('/wrongpass');
      }
  }).catch(error => {
      console.error(error);
  });

    res.cookie("userData", ime);
});


app.post('/submitWP', (req, res) => {  //Redirect to login  from wrong pass page
      res.redirect('/login');
});


//Writing to base
  async function pageWrite(pageColl, obj) {
   
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log("Connected successfully to server");
      const db = client.db("page");
      const result = await db.collection(pageColl).insertOne(obj);
      console.log("1 document inserted", result);
      } catch (err) {
      console.error("An error occurred:", err);
    } finally {
         await client.close();
    }
  }
  

  //Reading from base
async function getEntry(pageColl, value){
    try {
      await client.connect();
      const database = client.db('page');
      const pageUsers = database.collection(pageColl);
      const query = { Username: value };
      const pageUserName = await pageUsers.findOne(query);

      if(pageUserName == null){
        return null;
      }else{
        return pageUserName.Password
      }
    } finally {     
      await client.close();
    }

}




// Parsing post data and writing it to base
app.post('/newpost', (req, res) => {
  const Text = req.body.myText;  
  const Head = req.body.myHead;
  const User = req.body.myUser

  console.log("Post received");



  const myobj = {Head: Head, Text: Text, User: User }; 
  pageWrite("post", myobj);  

  // Send a response back to the client to confirm success
  res.json({ message: "Post successful", data: myobj });
});

/*~~~~~~~~~~~~~~~~~~~~ Cookies ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


app.get('/logout', (req, res)=>{ 
  res.clearCookie('userData'); 
  res.redirect('/login');
  });


  /************ Generate posts ************************/


app.get('/getPosts', async (req, res) => {
  try {
      await client.connect();
      const database = client.db('page');
      const collection = database.collection('post');

      // Retrieve all posts
      const posts = await collection.find({}).toArray();
      
      // Send posts as JSON
      res.json(posts);
  } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).send("An error occurred while fetching posts.");
  } finally {
      await client.close();
  }
});




  
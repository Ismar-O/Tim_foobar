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
      console.log(req);
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




// Assuming Express and body-parser are already set up
app.post('/newpost', (req, res) => {
  const Text = req.body.myText;  // Access 'myText' from the JSON payload
  const Head = req.body.myHead;
  const User = req.body.myUser

  console.log("Post received");
  console.log("Text:", Text);


  const myobj = {Head: Head, Text: Text, User: User };
  pageWrite("post", myobj);  // Process and save the data as needed

  // Send a response back to the client to confirm success
  res.json({ message: "Post successful", data: myobj });
});

/*~~~~~~~~~~~~~~~~~~~~ Cookies ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


app.get('/logout', (req, res)=>{ 
  //it will clear the userData cookie 
  res.clearCookie('userData'); 
  res.redirect('/login');
  });


  /************ Generisanje postova ************************/


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




  
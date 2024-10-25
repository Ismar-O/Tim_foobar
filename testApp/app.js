const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Serve static files from the 'webpage' directory
app.use(express.static(path.join(__dirname, 'login-form-v1/Login_v1')));

// Start the server
app.listen(8000, '0.0.0.0', () => {
    console.log('Server running on port 8000');
});
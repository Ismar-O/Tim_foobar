//Read cookie function

function getCookie(name) {
    const value = document.cookie;  
    console.log("Cookie string:", value);
    
    const parts = value.split(`; ${name}=`); 
    console.log("Parts after split:", parts);

    if (parts.length) {
        const value = parts[0].split('=')[1];
  
        return decodeURIComponent(value);
    }
    
    return null;  
}

// Get the 'username' cookie
const username = getCookie('user');

// Display the username in the HTML
if (username) {
    document.getElementById('user-name').textContent = username;
}


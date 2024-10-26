

function getCookie(name) {
    const value = document.cookie;  // Remove the extra semicolon here
    console.log("Cookie string:", value);
    
    const parts = value.split(`; ${name}=`); // Split by `; name=` pattern
    console.log("Parts after split:", parts);

    if (parts.length) {
        const value = parts[0].split('=')[1];
  
        return decodeURIComponent(value);
    }
    
    return null;  // Return null if cookie is not found
}

// Get the 'username' cookie
const username = getCookie('user');

// Display the username in the HTML
if (username) {
    document.getElementById('user-name').textContent = username;
}


    
    document.getElementById('submitLink').addEventListener('click', function(event) {
        event.preventDefault();  // Prevent default form submission

       

        // Get the value of the input field
        const myText = document.getElementById('feedInput').value;
        const myHead = document.getElementById('headInput').value;
        document.getElementById('feedInput').value  = "";
        document.getElementById('headInput').value  = "";

        console.log("Pisanje jsona");

        // Send a POST request to the server
        fetch('http://localhost:8000/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ myText, myHead, myUser})   // Send the form data as JSON
        })
        .then(response => response.json())     // Parse the JSON response
        .then(data => {
            console.log('Success:', data);
            // Optionally, update the page or show a success message here
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });


function getCookie(name) {
    const value = document.cookie;  
    console.log("Cookie string:", value);
    
    const parts = value.split(`; ${name}=`); 
    console.log("Parts after split:", parts);

    if (parts.length) {
        const value = parts[0].split('=')[1];
  
        return decodeURIComponent(value);
    }
    
    return null;  // Return null if cookie is not found
}

const myUser = getCookie('user');





fetch('http://localhost:8000/getPosts')
            .then(response => response.json())
            .then(posts => {
                const container = document.getElementById('posts-container');
                posts.reverse().forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'postMain';

                    postDiv.innerHTML = `
                        <h2>${post.Head}</h2>
                        <p><strong>User:</strong> ${post.User}</p>
                        <p>${post.Text}</p>
                    `;

                     container.appendChild(postDiv);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));

    
    
    // Create and add post to base
    
    document.getElementById('submitLink').addEventListener('click', function(event) {
        event.preventDefault(); 

        const myText = document.getElementById('feedInput').value;
        const myHead = document.getElementById('headInput').value;
        document.getElementById('feedInput').value  = "";
        document.getElementById('headInput').value  = "";

        fetch('http://localhost:8000/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ myText, myHead, myUser}) //Passing JSON file
        })
        .then(response => response.json())   
        .then(data => {
            console.log('Success:', data);
      })
        .catch((error) => {
            console.error('Error:', error);
        });
    });

//Getting username details from cookie
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

const myUser = getCookie('user');


// Writing posts to div


fetch('http://localhost:8000/getPosts')
            .then(response => response.json())
            .then(posts => {
                const container = document.getElementById('posts-main');
                posts.reverse().forEach(post => {
                    const postDiv = document.createElement('div');
                    postDiv.className = 'postMain';

                    postDiv.innerHTML = `
                    <div class="customCard card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                        <h2>${post.Head}</h2>
                        <p><strong>User:</strong> ${post.User}</p>
                        <p>${post.Text}</p>


                        <div class="card-body d-flex p-0 mt-3">
                                    <a href="#" class="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"><i class="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i> <i class="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i></a>
                        </div>
                    </div>
                    `;

                     container.appendChild(postDiv);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));

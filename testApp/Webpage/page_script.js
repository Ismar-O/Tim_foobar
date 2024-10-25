// When the user scrolls the page, execute myFunction
window.onscroll = function() {stickyNavFoo()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavFoo() {
  if (window.pageYOffset  + 20 >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function hideAllTabs(){
   
    document.querySelectorAll('.tabs').forEach(parent =>{
        document.getElementById('page-' + parent.id + '-content').classList.remove('page-show');
        
        parent.style.borderBottom= 'none';
        console.log("2");
    });
};

document.querySelectorAll('.tabs').forEach(parent => {
    parent.addEventListener('click', () =>{
      //document.documentElement.scrollTop = 0; 
      //document.body.scrollTop = 0;
        hideAllTabs();
        parent.style.borderBottom= '2px solid white';
        console.log('page-' + parent.id + '-content');
        document.getElementById('page-' + parent.id + '-content').classList.add('page-show');
        document.getElementById('page-' + parent.id + '-content').style.transform = 'translate(-80%,0vh)';

        
        setTimeout(() => {
          document.getElementById('page-' + parent.id + '-content').style.transform = 'translate(0,0vh)';
      }, 0);


        
    });
})








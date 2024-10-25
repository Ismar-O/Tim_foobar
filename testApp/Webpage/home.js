
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Za show on scroll ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

window.onscroll = function() {slideVideoFoo(), stickyNavFoo()};


function slideVideoFoo(){

    document.querySelectorAll('.page-show-on-scroll-R, .page-show-on-scroll-L').forEach(scrollElem => {
        var rect = scrollElem.getBoundingClientRect();
        var top = rect.top + window.scrollY;
        if (window.scrollY +  window.innerHeight / 1.4>= top) {
            console.log("got")
            scrollElem.style.transform = 'translate(0%)';
        } else if (window.scrollY < 100/*window.scrollY   >  top -  window.innerHeight / 1.9*/){  
            console.log("GOT2");
            scrollElem.style.transform ='';
        }

    });

}

slideVideoFoo();


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Home galery items ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
document.querySelectorAll('.page-galery-item').forEach(parent => {
    parent.addEventListener('mouseenter', () => {
        parent.querySelector('.page-galery-item-text').style.height = '100px';
        parent.classList.add("Hover-over");
    });
    parent.addEventListener('mouseleave', () => {
        parent.querySelector('.page-galery-item-text').style.height = '50px';
        parent.classList.remove("Hover-over");
    });
});

/**********~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Za nav bar ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~********/


// When the user scrolls the page, execute myFunction


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








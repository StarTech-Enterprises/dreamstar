/**
* Highlight correct RHS TOC Menu Item
*/

(function scrollTop() {

    // Set a variable for our button element.
    const scrollToTopButton = document.getElementById('js-top');
    let didScroll;

    // Let's set up a function that shows our scroll-to-top button if we scroll beyond the height of the initial window.
    const scrollFunc = () => {
        didScroll = true;
    };

    // Add Scroll Event Listener
    window.addEventListener("scroll", scrollFunc);

    // Run function every 250 ms - should improve browser performance
     setInterval(function() {
        if (didScroll) {
            let y = window.scrollY;
            // If the scroll value is greater than the window height, add a class to the scroll-to-top button to show it!
            if (y > 100) {
            scrollToTopButton.className = "rhs-top-link show";
            } else {
            scrollToTopButton.className = "rhs-top-link hide";
         }
            didScroll = false;
        }
    }, 150);

    const scrollToTop = () => {
    // Let's set a variable for the number of pixels we are from the top of the document.
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    
    // If that number is greater than 0, we'll scroll back to 0, or the top of the document.
    // We'll also animate that scroll with requestAnimationFrame:
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

    window.scrollTo(0, 0);

    // if (c > 0) {
        // window.requestAnimationFrame(scrollToTop);
        // ScrollTo takes an x and a y coordinate.
        // Increase the '5' value to get a smoother/slower scroll!
        // window.scrollTo(0, c - c / 3);
    // }
    };

    // When the button is clicked, run our ScrolltoTop function above!
    scrollToTopButton.onclick = function(e) {
    e.preventDefault();
    scrollToTop();
    }

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let scrollTop;
document.addEventListener('DOMContentLoaded', scrollTop);
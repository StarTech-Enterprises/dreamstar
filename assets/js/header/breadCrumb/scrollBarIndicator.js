/**
* Assign width to scrollBarIndicator, depending on how far user has scrolled down
**/

"use strict";
(function scrollBarIndicator() {

    // When the user scrolls the page, execute scrollIndicator
    window.addEventListener("scroll", function () {
        scrollIndicator(); 
    }, false);

    let docheight = document.documentElement.clientHeight;
    function scrollIndicator() {
        let winheight = document.documentElement.scrollHeight;
        let winScroll =  document.documentElement.scrollTop;
        let scrolled = (winScroll / (winheight - docheight)) * 100;
        document.getElementById("scrollBarIndicator-bar").style.width = scrolled + "%";
    } 

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let scrollBarIndicator;
document.addEventListener('DOMContentLoaded', scrollBarIndicator);
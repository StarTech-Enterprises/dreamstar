/**
* Apply JS to slideOut
**/

"use strict";
(function slideOut() {

    // Assign DOM elements to variables
    const slideOutButton = document.getElementsByClassName('header-sidebar-nav')[0];
    const slideOut = document.getElementsByClassName('slide-out')[0];
    const slideOutMask = document.getElementsByClassName('slide-out-mask')[0];
    const navDropDown = document.getElementsByClassName('nav-dropdown-toggle');

    // When the button is clicked, show slideout and turn on mask
    const slideOutFunc = () => {
        slideOut.className = "slide-out nav-is-open";
        slideOutMask.className = "slide-out-mask fade-active";
    }

    // When the Mask is clicked, close slideout and turn off mask
    const slideOutMaskFunc = () => {
        slideOut.className = "slide-out";
        slideOutMask.className = "slide-out-mask";
    }

    // When the Mask is clicked, close slideout and turn off mask
    const navDropDownFunc = (ev) => {
        console.log(ev.currentTarget);
        if (ev.currentTarget.className == "nav-dropdown-toggle"){
            ev.currentTarget.className = "nav-dropdown-toggle nav-dropdown-toggle--is-open";
            ev.currentTarget.nextElementSibling.nextElementSibling.className = "mobile-nav-dropdown mobile-nav-dropdown--is-open"
        } else {
            ev.currentTarget.className = ("nav-dropdown-toggle");
            ev.currentTarget.nextElementSibling.nextElementSibling.className = "mobile-nav-dropdown"
        }
        
    }

    // Add Click Event Listeners
    slideOutButton.addEventListener("click", slideOutFunc);
    slideOutMask.addEventListener("click", slideOutMaskFunc);
    Array.from(navDropDown).forEach(function(navDropDown) {
        navDropDown.addEventListener('click', navDropDownFunc, false);
    });
        
})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let slideOut;
document.addEventListener('DOMContentLoaded', slideOut); 
/**
* Assign page links to contentNavBottom buttons
**/

"use strict";
(function contentNavBottom() {
    // Get window location pathname
    let target = window.location.pathname;
    // Find first "a" with the target as href
    let a = [...document.querySelectorAll("#lhsTreeMenuToC a")].find(a => a.pathname === target);
    // Get Previous Element
    let prior = a.parentElement.previousElementSibling;
    // Get Next Element
    let next = a.parentElement.nextElementSibling;
    // Get DOM Elements
    let next_button = document.getElementById("contentNextPage");
    let previous_button = document.getElementById("contentPreviousPage");

     
    getPreviousMenuItem();
    function getPreviousMenuItem() {
        // Does Previous Element exist?
        if (!prior){
            // Go up one level to tree-group
            prior = parent_by_class(a.parentElement, "treegroup");
            // Go to relevant previous element
            while(true) {
                if (prior.previousElementSibling != null && prior.previousElementSibling.previousElementSibling != null){
                    if (prior.previousElementSibling.previousElementSibling.classList.contains("none")) break;
                    if (prior.previousElementSibling.previousElementSibling.classList.contains("treegroup")) break;
                };   
                prior = prior.parentElement;
                if (prior.classList.contains("lhs-tree-menu-toc") || prior.parentElement.classList.contains("lhs-tree-menu-toc")) break;
            }
           
            prior = prior.previousElementSibling ? prior.previousElementSibling.previousElementSibling ? prior.previousElementSibling.previousElementSibling : null : null;
            
            // Are you at the top of the tree
            if (!prior){
                prior = null;
            } else if (prior.classList.contains("none")) {
                // Get previous Element
                prior = prior.firstElementChild;
            } else if (prior.classList.contains("treegroup")){
                // Go all the way down to lowest level
                while(true){
                    if (prior.lastElementChild.classList.contains('none')) break;
                    prior = prior.lastElementChild;
                };
                prior = prior.lastElementChild.firstElementChild;
            }
        } else if (prior.classList.contains("none")){
            // Get previous Element
            prior = prior.firstElementChild;
        } else if (prior.classList.contains("treegroup")){
            // Go all the way down to lowest level
            while(true){
                if (prior.lastElementChild.classList.contains('none')) break;
                prior = prior.lastElementChild;
            };
            prior = prior.lastElementChild.firstElementChild;
        }
    }
   

    getNextMenuItem();
    function getNextMenuItem() {
        // Does Next Element exist?
        // if first child Element doesn't exist, either stop, or try to get first element of next immediate branch
        if(!next){
            next = a.parentElement;
            while(true){
                if (next.parentElement.nextElementSibling) break;
                next = next.parentElement
                if (next.parentElement.classList.contains("lhs-tree-menu-toc")) break;
            };
            next = next.parentElement.nextElementSibling ? next.parentElement.nextElementSibling : null;
            // Does Next Element exist
            if(!next){
                next = null;
            } else if (next.classList.contains("none")){
                // Get Next Element
                next = next.firstElementChild;
            } else if (next.classList.contains("treeitem")){
                // Goto Next Sibling Element
                next = next.nextElementSibling;
                while(true){
                    next = next.firstElementChild;
                    if (next.classList.contains("none")) break;
                    next = next.nextElementSibling;
                };
                // Get first child Element
                next = next.firstElementChild;
            }
        } else if (next.classList.contains("none")){
            // Get Next Element
            next = next.firstElementChild;
        } else if (next.classList.contains("treeitem")){
            // Goto Next Sibling Element
            next = next.nextElementSibling;
            while(true){
                next = next.firstElementChild;
                if (next.classList.contains("none")) break;
                next = next.nextElementSibling;
            };
            // Get first child Element
            next = next.firstElementChild;
        }
    }  

    
    // Modify HTML of next and back buttons

    next ? next_button.parentElement.setAttribute("href", next) : next_button.parentElement.setAttribute("href", "#top");
    prior ? previous_button.parentElement.setAttribute("href", prior): previous_button.parentElement.setAttribute("href", "#top");
    
    next ? next_button.classList.remove("is-faded") : next_button.classList.add("is-faded");
    prior ? previous_button.classList.remove("is-faded") : previous_button.classList.add("is-faded");


})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let contentNavBottom;
document.addEventListener('DOMContentLoaded', contentNavBottom);
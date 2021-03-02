/**
* Expand or collapse menu items
**/

"use strict";
(function lhsTreeMenu() {
    let menu = document.querySelector('#lhsTreeMenuToC');
    let elements = menu.getElementsByClassName("treeitem");
    let sibling = null;
    let expanded = false;

    eventListeners();
    function eventListeners(){
        // Listen for click
        Array.from(elements).forEach(function(element) {
            element.addEventListener('click', function(ev) {
                let e = null;
                ev.target.classList.contains("treeitem") ? e = ev.target : e = parent_by_class(ev.target, "treeitem");
                sibling = nextByClass(e, "treegroup")

                sibling.classList.contains('is-expanded') ? expanded = true : expanded = false;  
                    if(expanded){
                        e.classList.remove("is-expanded");
                        sibling.classList.remove("is-expanded");
                    } else {
                        e.classList.add("is-expanded");
                        sibling.classList.add("is-expanded");
                    } 
            }, false);
          });
    }

    // Get window location pathname
    let target = window.location.pathname;
    // Find first "a" with the target as href
    let a = [...document.querySelectorAll("#lhsTreeMenuToC a")].find(a => a.pathname === target);

    expandEntryOnLoad();
    function expandEntryOnLoad() {
        // Expand all tree group parents.
        if (a) {
          a.parentElement.classList.add("is-active");
          let parent = a;
          while (parent = parent.parentElement.closest(".treegroup")) parent.classList.add("is-expanded");
          a.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
    }

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let lhsTreeMenu;
document.addEventListener('DOMContentLoaded', lhsTreeMenu);

/**
* Generate rest of Breadcrumb, based on where user is in the Navigation Menu
**/

"use strict";
(function breadCrumbLinks() {

// Generate BreadCrumb links
generateBreadCrumb();
function generateBreadCrumb() {
    let df = new DocumentFragment(); 
    let breadcrumbs = document.getElementById("site-breadcrumb-container-list");
    let target = window.location.pathname;
    
    // Find first "a" with the target as href
    let a = [...document.querySelectorAll(".lhs-tree-menu-toc a")].find(a => a.pathname === target)
    let parent = a;

    // Only do if link is found in LHS Tree
    if(a){
        // Do this if already at Top-Most Level
        if (!parent.parentElement.closest(".treegroup").previousElementSibling){
            // Initialise variables for HTML
            let txtValue =  document.createTextNode(a.textContent);
            let linkValue = a.getAttribute("href");
            let li_bc = document.createElement('li');
            li_bc.setAttribute('class', "site-breadcrumb-container-list__item");
            let a_bc = document.createElement('a');
            let span_bc = document.createElement("span");
            
            // Create HTML
            span_bc.appendChild(txtValue);
            a_bc.appendChild(span_bc);
            a_bc.setAttribute("href", linkValue);
            a_bc.setAttribute("class", "site-breadcrumb-container-list__link");
            li_bc.appendChild(a_bc);
            df.appendChild(li_bc);
        }

        // Do this if not at Top-Most Level
        while (parent = parent.parentElement.closest(".treegroup")) {
            if (parent.previousElementSibling){

                // Initialise variables for HTML
                let txtValue =  document.createTextNode(parent.previousElementSibling.firstElementChild.textContent);
                let linkValue = parent.firstElementChild.firstElementChild;
                let li_bc = document.createElement('li');
                li_bc.setAttribute('class', "site-breadcrumb-container-list__item");
                let a_bc = document.createElement('a');
                a_bc.setAttribute("class", "site-breadcrumb-container-list__link");
                let span_bc = document.createElement("span");

                // Create HTML
                span_bc.appendChild(txtValue);
                a_bc.appendChild(span_bc);
                if(linkValue.tagName == 'A') a_bc.setAttribute("href", linkValue);
                li_bc.appendChild(a_bc);
                df.insertBefore(li_bc, df.childNodes[0]);
            }
        };

        breadcrumbs.appendChild(df);
    }
}

// Highlight active BreadCrumb link
highlightNavBar()
function highlightNavBar() {
    let target = window.location.pathname;
    // Find the first breadcrumb link with same link as the window pathname
    let breadcrumb = [...document.querySelectorAll(".site-breadcrumb-container-list__item a")].find(a => a.pathname === target)
    if(breadcrumb){
        breadcrumb.classList.add("site-breadcrumb-container-list__link", "is-active")
    }
}

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let breadCrumbLinks;
document.addEventListener('DOMContentLoaded', breadCrumbLinks);

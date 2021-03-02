/**
* Apply JS to breadCrumbFunctions elements
**/

"use strict";
(function breadCrumbFunctions() {

    // Initiate and assign Global Variables
    let page_title = [...document.querySelectorAll("#content-column h1")][0] ? [...document.querySelectorAll("#content-column h1")][0].textContent : null;
    let page_url = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;


    // Function for generating and embedding Social Media and Email links
    generateShareLinks ()
    function generateShareLinks() {

        // Get Elements to Modify
        let twitter = [...document.querySelectorAll("#twitter-link a")][0];
        let linkedin = [...document.querySelectorAll("#linkedin-link a")][0];
        let facebook = [...document.querySelectorAll("#facebook-link a")][0];
        let email = [...document.querySelectorAll("#email-link a")][0];

        // Generate Shareable Links
        let twitter_share = "https://twitter.com/intent/tweet?original_referer=https://www.startech-enterprises.com&text=" + page_title + ":&tw_p=tweetbutton&url=" + page_url;
        let linkedin_share = "https://www.linkedin.com/sharing/share-offsite/?url=" + page_url;
        let facebook_share = "https://www.facebook.com/sharer/sharer.php?u=" + page_url;
        let email_share = "mailto:?subject=DreamStar: [Shared Article] " + page_title + "&body=" + page_title + ":%0A%0A" + page_url;
        
        // Embed links within Elements
        twitter.setAttribute("href", twitter_share);
        linkedin.setAttribute("href", linkedin_share);
        facebook.setAttribute("href", facebook_share);
        email.setAttribute("href", email_share);
   
    }

    // Function for showing and hiding share menu
    toggleShareMenu()
    // Toggle when Share Button is clicked
    function toggleShareMenu() {
        // Get Element to Modify
        let d = [...document.querySelectorAll("#share-menu__item button")];

        d[0].addEventListener('click', function(ev){
            event.stopPropagation();
            let sharingMenu = document.querySelector("#share-menu__container");

            if (sharingMenu.classList.contains("is-hidden")){
                sharingMenu.classList.remove("is-hidden");
            } else {
                sharingMenu.classList.add("is-hidden");
            }
        }, false);

        // Hide if anywhere else in page is clicked
        document.getElementsByTagName("html")[0].addEventListener('click', function() {
        let sharingMenu = document.querySelector("#share-menu__container");
            if (!sharingMenu.classList.contains("is-hidden")){
                sharingMenu.classList.add("is-hidden");
            }
        })
    }

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let breadCrumbFunctions;
document.addEventListener('DOMContentLoaded', breadCrumbFunctions);
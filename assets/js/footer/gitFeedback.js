/**
* Apply JS to Feedback DOM elements
**/

"use strict";
(function gitFeedback() {

    // Initiate and assign Global Variables
    let page_title = [...document.querySelectorAll(".content-wrap h1")][0] ? [...document.querySelectorAll(".content-wrap h1")][0].textContent : null;
    let page_url = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
    
    // Generate Unique Page ID
    const MY_NAMESPACE = '1b683a64-45d5-491e-99b0-da01f3ef3341';
    let pageId = uuidv5(window.location.pathname, MY_NAMESPACE);

    // Function for generating and embedding GitHub feedback link
    generateFeedbackLink ()
    function generateFeedbackLink() {

        // Get Element to Modify
        let feedback = [...document.querySelectorAll(".feedback-submit__btn")];
       
        // Get various Page Information
        let meta_data = [...document.querySelectorAll(".metadata")][0] ? [...document.querySelectorAll(".metadata")][0].textContent : null;
        if (meta_data){
            var parts = meta_data.split('•', 3);
            var type = parts [0];
            var category = parts[1].replace("&", "and");
            var date = parts[2];
          
             // Replace '&' in page title with 'and'
             page_title = page_title.replace("&", "and");

          }

          // Embed link within Element
          let github_link = "https://github.com/StarTech-Enterprises/dreamstar/issues/new?&body=%0A%0A[Enter page feedback here]%0A%0A%0A---%0A%23%23%23%23 Document Details %23%23%23%23%0A%0A⚠ *Do not edit this section*. It is needed to respond to and fulfil any feedback requests!%0A%0A* Content Date%3A " + date + "%0A* Content Title%3A " + page_title + "%0A* Content Source%3A " + page_url + "%0A* Content Type%3A **" + type + "**%0A* Content Category%3A **" + category +  "**%0A* Brand%3A ** STAR VISTA Entertainment **%0A* Page ID%3A " + pageId;
          feedback[0].setAttribute("href", github_link);
    }

    // Function for generating and embedding View all Page feedback link
    generateViewAllFeedbackLink ()
    function generateViewAllFeedbackLink() {

      // Get Element to Modify
      let viewAllFeedback = [...document.querySelectorAll(".feedback-view__btn")];

      // Embed link within Element
      let github_link = "https://github.com/StarTech-Enterprises/dreamstar/issues?utf8=%E2%9C%93&q=%22" + pageId + "%22&in=body"
      viewAllFeedback[0].setAttribute("href", github_link);
    }

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let gitFeedback;
document.addEventListener('DOMContentLoaded', gitFeedback);
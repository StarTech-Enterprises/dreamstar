
/* Function toggling class for accordian items */

(function accordian () {

let acc_header = document.getElementsByClassName("accordion-item__header");

let i;

    for (i = 0; i < acc_header.length; i++) {
        acc_header[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.parentElement.classList.toggle("is-expanded");
        });
    } 

}) ();
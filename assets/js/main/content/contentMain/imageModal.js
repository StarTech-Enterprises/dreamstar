/* Function for Showing an Image Modal */

(function imgModal () {
    // Get the modal
    var modal = document.getElementById("imgModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    if (btn != null) {
        btn.onclick = function() {
        modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    if (span != null) {
        span.onclick = function() {
        modal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}) ();


/* Function for Showing an Image */

function showImageModal (imgName) {
    // Get the modal
    var modal = document.getElementById("imgModal");
    var modalbody = document.querySelector("#imgModal .modal-body");
    modalbody.innerHTML = 
    '<figure>' +
    '<img class="docimage" ' +
    'src="images/' + imgName +'" alt="" style="max-height: 660px" />' +
    '</figure>';
    modal.style.display = "block";
};
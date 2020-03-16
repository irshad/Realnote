 // Service  Worker
navigator.serviceWorker && navigator.serviceWorker.register('SW.js').then(function (registration) {

});

 // Char count
 function countChars(countfrom, displayto) {
    var len = document.getElementById(countfrom).value.length;
    document.getElementById(displayto).innerHTML = len;
}

// Reset Button Reloads The Page
function refreshPage() {
    window.location.reload();
}

// Copy To Clipboard
function copyClipboard() {
    let copyText = document.getElementById("data"); // Get the text field
    copyText.select(); // Select the text field
    copyText.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand("copy"); // Copy the text inside the text field
}

// Mail Button
function sendEmail() {
    window.location = "mailto:irshad@phonerefer.com";
}

// Buttons Disabled If Textarea Is Empty - Jquery
let $button = $("#r-btn, #c-btn");
$button.prop("disabled", true);

$("#data").keyup(function () {
    $button.prop("disabled", (this.value === "") ? true : false);
});
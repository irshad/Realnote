 // Service  Worker
 navigator.serviceWorker && navigator.serviceWorker.register('SW.js').then(function (registration) {

 });

 // Char count
 function countChars(countfrom, displayto) {
     let len = document.getElementById(countfrom).value.length;
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

 // Download Function
 function download() {
     let text = document.getElementById("data").value;
     text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
     let blob = new Blob([text], {
         type: "text/plain"
     });
     let anchor = document.createElement("a");
     anchor.download = "Realnote.txt";
     anchor.href = window.URL.createObjectURL(blob);
     anchor.target = "_blank";
     anchor.style.display = "none"; // just to be safe!
     document.body.appendChild(anchor);
     anchor.click();
     document.body.removeChild(anchor);
 }

 // Twitter Button
 function twitter() {
     window.open('https://twitter.com/imirshadali');
 }

 // Mail Button
 function sendEmail() {
     window.location = "mailto:irshad@phonerefer.com";
 }

 // Buttons Disabled If Textarea Is Empty - Jquery
 let $button = $("#r-btn, #c-btn, #d-btn");
 $button.prop("disabled", true);

 $("#data").keyup(function () {
     $button.prop("disabled", (this.value === "") ? true : false);
 });

 // Dark Mode
 function black() {
     let element = document.body;
     element.classList.toggle("dark-mode");
 }
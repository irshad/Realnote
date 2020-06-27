document.addEventListener("DOMContentLoaded", function () {
    AutoSave.start();
});


const AutoSave = (function () {

    let timer = null;

    //Save to local storage //

    function save() {

        const editorContent = document.getElementById('data').innerHTML;

        if (editorContent) {
            localStorage.setItem('AutoSave' + document.location, editorContent);
        }

    }

    //Load from local storage //

    function restore() {

        //get the content from local storage
        const savedContent = localStorage.getItem('AutoSave' + document.location);

        //if it found some
        if (savedContent) {
            //grab the editor
            document.getElementById('data').innerHTML = savedContent;

        }
    }

    return {

        // Start Autosave function triggered in line 2 //

        start: function () {

            const editor = document.getElementById('data');

            if (editor)
                restore();

            if (timer != null) {
                clearInterval(timer);
                timer = null;
            }

            timer = setInterval(save, 2000);
        },

        stop: function () {

            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    };

}());

// new text
function clearStorage() {
    if (confirm("Are you sure you want to create a new text? This will erase all the content.")) {
        window.localStorage.clear();
        document.getElementById("data").innerHTML= "Clear this write yours..";
        location.reload();
    }
}
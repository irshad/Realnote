<script>
    import { onMount } from "svelte";
    import TypingArea from "../components/TypingArea.svelte";
    import Footer from "../components/Footer.svelte";
    import Clear from "../components/svg/Clear.svelte";
    import Copy from "../components/svg/Copy.svelte";
    import Download from "../components/svg/Download.svelte";
    import Screenshot from "../components/svg/Screenshot.svelte";
    import Toast from "../stores/toast"
    import Flag from "../components/Flag.svelte";
    import Moon from "../components/svg/Moon.svelte";
    import Sun from "../components/svg/Sun.svelte";


    let theme = true;
    let text = '';
    $:count = text.length;

    onMount(() => {
        if (localStorage.getItem("realnote")) {
            let localData = window.localStorage.getItem("realnote");
            document.getElementById("data").value = atob(localData);
            Toast.success("Session restored");
            count = atob(localData).length;
        }

        theme = JSON.parse(localStorage.getItem("darkmode")) == true ? true : false;
    });
    
    function autosave() {
        window.localStorage.setItem("realnote", btoa(text));
    }

    function clearStorage() {
        text = '';
        count = 0;
        document.getElementById("data").value = '';
        window.localStorage.clear();
        Toast.error("Text cleared successfully");
    }

    function copyClipboard() {
        let copyText = document.getElementById("data");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        Toast.success("Text copied successfully");
    }

    function downloadFile() {
        const element = document.createElement('a');
        const blob = new Blob([text], {
            type: '.txt'
        });
        const fileUrl = URL.createObjectURL(blob);
        element.setAttribute('href', fileUrl);
        element.setAttribute('download', 'realnote');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        Toast.success("File downloaded successfully");
    };

    function screenShot() {
        html2canvas(document.querySelector('.screenshot-area'), {
            onrendered: function(canvas) {
              return Canvas2Image.saveAsPNG(canvas);
            }
        });
    }

    function darkMode() {
        theme = !theme;
        localStorage.setItem("darkmode", theme);
    }
</script>

<main>
    <TypingArea cssClass="screenshot-area">
        <textarea class="" id="data" autofocus placeholder=" Type your text here..." bind:value={text} on:keyup={autosave}/>
    </TypingArea>

    <Footer count={count}>
        <button on:click={clearStorage}>
            <Clear title="Clear"/>
        </button>
        <button on:click={copyClipboard} disabled={!text}>
            <Copy title="Copy"/>
        </button>
        <button on:click={downloadFile} disabled={!text}>
            <Download title="Download"/>
        </button>
        <button on:click={screenShot} disabled={!text}>
            <Screenshot title="Screenshot"/>
        </button>
        <button on:click={darkMode}>
            {#if theme}
                <Moon/>
            {:else}
                <Sun/>
            {/if}
        </button>
    </Footer>

    <!-- <Flag/> -->
</main>

<style>
    main {
        display: grid;
        gap: 5px;
    }

    button {
        font-size: 14px;
        padding: 4px 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: var(--primary-color-black);
        border-color: var(--primary-color-yellow);
        background-color: var(--primary-color-yellow);
        font-family: var(--primary-font-medium);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    button:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    button[disabled] {
        pointer-events: none;
        color: var(--primary-color-black);
    }
</style>

<svelte:head>
    {#if !theme}
        <style>
            body, textarea, .textarea {
                background-color: var(--primary-color-black) !important;
                color: var(--primary-color-yellow) !important;
            }

            .charater-count {
                color: var(--primary-color-yellow) !important;
            }
        </style>
    {/if}
</svelte:head>
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
    import FloatButton from "../components/FloatButton.svelte";

    let theme = false;
    let text = '';
    let disabled = true;
    $:count = text.length;

    onMount(() => {
        let localData = window.localStorage.getItem("realnote");
        if (localData) {
            document.getElementById("data").value = atob(localData);
            Toast.success("Session restored");
            count = atob(localData).length;
            disabled = false;
        }

        theme = JSON.parse(localStorage.getItem("darkmode")) == true ? true : false;

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || theme) {
            theme = true;
        }

        if(text.length > 0) {
            disabled = false;
        }
    });
    
    function autosave() {
        window.localStorage.setItem("realnote", btoa(text));
    }

    function clearStorage() {
        text = '';
        count = 0;
        document.getElementById("data").value = '';
        window.localStorage.removeItem("realnote");
        Toast.error("Text cleared successfully");
        disabled = true
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

    $:text.length > 0 ? disabled = false : disabled = true;
</script>

<main>
    <TypingArea cssClass="screenshot-area">
        <textarea class="" id="data" autofocus placeholder=" Type your text here..." bind:value={text} on:keyup={autosave}/>
    </TypingArea>

    <Footer count={count}>
        <button class="web-button" on:click={clearStorage}>
            <Clear title="Clear"/>
        </button>
        <button class="web-button" on:click={copyClipboard} disabled={disabled}>
            <Copy title="Copy"/>
        </button>
        <button class="web-button" on:click={downloadFile} disabled={disabled}>
            <Download title="Download"/>
        </button>
        <button class="web-button" on:click={screenShot} disabled={disabled}>
            <Screenshot title="Screenshot"/>
        </button>
        <button class="web-button" on:click={darkMode}>
            {#if theme}
                <Sun/>
            {:else}
                <Moon/>
            {/if}
        </button>
    </Footer>

    <FloatButton>
        <button class="mobile-button mobile-button-1" on:click={clearStorage}>
            <Clear title="Clear"/>
        </button>
        <button class="mobile-button mobile-button-2" on:click={copyClipboard} disabled={disabled}>
            <Copy title="Copy"/>
        </button>
        <button class="mobile-button mobile-button-3" on:click={downloadFile} disabled={disabled}>
            <Download title="Download"/>
        </button>
        <button class="mobile-button mobile-button-4" on:click={screenShot} disabled={disabled}>
            <Screenshot title="Screenshot"/>
        </button>
        <button class="mobile-button mobile-button-5" on:click={darkMode}>
            {#if theme}
                <Sun/>
            {:else}
                <Moon/>
            {/if}
        </button>
    </FloatButton>
    <!-- <Flag/> -->

    <div class="count-section">
        {count}
    </div>
</main>

<style>
    main {
        height: 100%;
        width: 100%;
    }

    .web-button, .mobile-button {
        font-size: 14px;
        padding: 4px 10px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        color: var(--primary-color-black);
        border-color: var(--primary-color-theme);
        background-color: var(--primary-color-theme);
        font-family: var(--primary-font-medium);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .web-button:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }

    .web-button[disabled] {
        pointer-events: none;
        color: var(--primary-color-black);
    }

    .count-section {
        display: none;
    }
</style>

<svelte:head>
    {#if theme}
        <style>
            body, textarea, .textarea {
                background-color: var(--primary-color-black) !important;
                color: var(--primary-color-theme) !important;
            }

            .charater-count {
                color: var(--primary-color-theme) !important;
            }

            ::selection {
                background: var(--primary-color-theme) !important;
                color: var(--primary-color-black) !important;
            }
        </style>

	    <meta name="theme-color" content="#c9e943">
    {:else}
        <meta name="theme-color" content="#c9e943">
    {/if}
</svelte:head>
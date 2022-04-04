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
    import Share from "../components/svg/Share.svelte";
    import File from "../components/svg/File.svelte";
    import { hapticFeedback } from "../utils/vibrate";
    import Save from "../components/svg/Save.svelte";

    let theme = false;
    let text = '';
    let disabled = true;
    let menu;
    let fileHandle;
    let saveFile = false;
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
        // vibrate phone
        hapticFeedback.vibratePhone();

        text = '';
        count = 0;
        document.getElementById("data").value = '';
        window.localStorage.removeItem("realnote");
        Toast.error("Text cleared successfully");
        disabled = true;
        saveFile = false;
    }

    function copyClipboard() {
        // vibrate phone
        hapticFeedback.vibratePhone();

        let copyText = document.getElementById("data");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        Toast.success("Text copied successfully");
    }

    function downloadFile() {
        // vibrate phone
        hapticFeedback.vibratePhone();

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
        // vibrate phone
        hapticFeedback.vibratePhone();

        html2canvas(document.querySelector('.screenshot-area'), {
            onrendered: function(canvas) {
              return Canvas2Image.saveAsPNG(canvas);
            }
        });
    }

    function darkMode() {
        // vibrate phone
        hapticFeedback.vibratePhone();

        theme = !theme;
        localStorage.setItem("darkmode", theme);
    }

    async function share() {
        // vibrate phone
        hapticFeedback.vibratePhone();
        
        try {            
            await navigator.share({
                title: 'Realnote - A minimalist note taking app.',
                text: 'Realnote is a simple single sheet note taking application that helps you to take notes on go. You can download your notes as text file or you can download your notes as image',
                url: 'https://realnote.ml',
            });
        } catch (error) {
            menu=!menu;
            Toast.success("Share cancelled");
        }
    }

    async function openFile() {
        // vibrate phone
        hapticFeedback.vibratePhone();

        // open file picker
        [fileHandle] = await window.showOpenFilePicker();
        // get file contents
        const fileData = await fileHandle.getFile();
        text = await fileData.text();
        saveFile = true;
        Toast.success("File opened successfully");
    }

    async function writeFile() {
        // vibrate phone
        hapticFeedback.vibratePhone();

        const writable = await fileHandle.createWritable();
        await writable.write(text);
        await writable.close();
        Toast.success("File saved successfully");
    }

    $:text.length > 0 ? disabled = false : disabled = true;
</script>

<main>
    <TypingArea cssClass="screenshot-area">
        <!-- svelte-ignore a11y-autofocus -->
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
        <button class="web-button" on:click={openFile}>
            <File title="Open File"/>
        </button>
        {#if saveFile}        
            <button class="web-button" on:click={writeFile}>
                <Save title="Save File"/>
            </button>
        {/if}
        <button class="web-button" on:click={darkMode}>
            {#if theme}
                <Sun/>
            {:else}
                <Moon/>
            {/if}
        </button>
    </Footer>

    <FloatButton bind:menu>
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
        <button class="mobile-button" on:click={openFile}>
            <File title="Open File"/>
        </button>
        <button class="mobile-button" slot="save" on:click={writeFile}>
            <Save title="Save File"/>
        </button>
        <button class="mobile-button mobile-button-5" slot="darkmode"  on:click={darkMode}>
            {#if theme}
                <Sun/>
            {:else}
                <Moon/>
            {/if}
        </button>
        <button class="mobile-button mobile-button-5" slot="share" on:click={share}>
            <Share />
        </button>
    </FloatButton>
    <!-- <Flag/> -->

    <div class="mobile-charater-count">
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

    .mobile-charater-count {
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

            .charater-count, .mobile-charater-count {
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
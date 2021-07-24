<script>
    import { onMount } from "svelte";
    import Footer from "../components/Footer.svelte";
    import Clear from "../components/svg/Clear.svelte";
    import Copy from "../components/svg/Copy.svelte";
    import Download from "../components/svg/Download.svelte";
    import Save from "../components/svg/Save.svelte";
    import TypingArea from "../components/TypingArea.svelte";
    import Toast from "../stores/toast"

    let text = '';
    let saveButton = true;
    $:count=text.length;
    
    onMount(() => {
        if (localStorage.getItem("realnote")) {
            let localData = localStorage.getItem("realnote");
            document.getElementById("data").value = localData;
            saveButton = true;
            Toast.success("Text restored successfully");
        } else {
            Toast.success("No save text to restored");
        }
    });

    $:if (localStorage.getItem("realnote")) {
        saveButton = false;
    } else {
        saveButton = true;
    }

    function clearStorage() {
        text = '';
        document.getElementById("data").value = '';
        window.localStorage.clear();
        saveButton = true;
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
        element.setAttribute('download', 'filename');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        Toast.success("File downloaded successfully");
    };

    function save() {
        localStorage.setItem("realnote", text);
        saveButton = false;
        Toast.success("Text saved successfully");
    }
    
    function restore() {
        let localData = localStorage.getItem("realnote");
        document.getElementById("data").value = localData;
        Toast.success("Text restored successfully");
    }
</script>

<main>
    <TypingArea>
        <textarea id="data" placeholder=" Type your text here..." bind:value={text}/>
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
        {#if saveButton}
            <button on:click={save} disabled={!text}>
                <Save title="Save"/>
            </button>
        {:else}
            <button on:click={restore}>
                <Save title="Restore"/>
            </button>
        {/if}
    </Footer>
</main>

<style>
    main {
        display: grid;
        gap: 6px;
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
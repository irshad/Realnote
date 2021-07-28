<script>
    export let cssClass = '';
</script>

<div class="textarea {cssClass}">
    <slot />
</div>

<style>
    .textarea {
        padding: 5px;
        margin: 10px 10px 0 10px;
        overflow: hidden;
        border-radius: 10px;
        background-color: var(--primary-color-white);
        border: 1px solid var(--primary-color-yellow);
    }

    :global(textarea) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 90vh;
        resize: none;
        font-size: 18px;
        border-width: 0;
        color: var(--primary-color-black);
        font-family: var(--primary-font-regular);
        background-color: var(--primary-color-white);
    }

    :global(textarea:focus) {
        outline: none !important;
    }
</style>
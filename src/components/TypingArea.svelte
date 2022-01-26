<script>
    export let cssClass = '';
</script>

<div class="textarea {cssClass}">
    <slot />
</div>

<style>
    .textarea {
        background-color: var(--primary-color-white);
        height: calc(100% - 40px);
        width: 100%;
    }

    :global(textarea) {
        margin: 0;
        padding: 6px;
        width: calc(100% - 34px);
        height: calc(100% - 24px);
        resize: none;
        font-size: 18px;
        border-radius: 10px;
        color: var(--primary-color-black);
        font-family: var(--primary-font-regular);
        background-color: var(--primary-color-white);
        border-color: var(--primary-color-yellow);
        margin: 10px 10px 0 10px;
    }

    :global(textarea:focus) {
        outline: none !important;
    }
</style>
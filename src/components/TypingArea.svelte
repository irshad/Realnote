<script>
    export let cssClass = '';
</script>

<div class="textarea {cssClass}">
    <slot />
</div>

<style>
    .textarea {
        background-color: var(--primary-color-white);
        height: calc(100% - 44px);
    }

    :global(textarea) {
        margin: 10px;
        padding: 6px;
        width: calc(100% - 34px);
        height: calc(100% - 26px);
        resize: none;
        font-size: 18px;
        border-radius: 10px;
        color: var(--primary-color-black);
        font-family: var(--primary-font-regular);
        background-color: var(--primary-color-white);
        border-color: var(--primary-color-yellow);
    }

    :global(textarea:focus) {
        outline: none !important;
    }
</style>
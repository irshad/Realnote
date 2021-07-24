<script>

</script>

<div class="textarea">
    <slot />
</div>

<style>
    .textarea {
        margin: 10px 10px 0 10px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #ffcc5c;
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
    }

    :global(textarea:focus) {
        outline: none !important;
    }
</style>
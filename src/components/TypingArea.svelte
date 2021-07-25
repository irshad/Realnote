<script>

</script>

<div class="textarea">
    <slot />
</div>

<style>
    .textarea {
		width:100%;
		height:100%;
    }
    
    :global(textarea) {
        margin: 10px;
        padding: 5px;
        height: 90%;
        width: -webkit-fill-available;
        resize: none;
        font-size: 18px;
        border-radius: 10px;
        border: 1px solid var(--primary-color-yellow);
        color: var(--primary-color-black);
        font-family: var(--primary-font-regular);
    }

    :global(textarea:focus) {
        outline: none !important;
    }
</style>
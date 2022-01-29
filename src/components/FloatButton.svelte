<script>
    import { fade } from "svelte/transition";
    export let menu = false;
</script>

<div class="floating-button-menu">
    <div class="floating-button" on:click={() => menu = !menu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left">
            <line x1="17" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="17" y1="18" x2="3" y2="18"></line>
        </svg>
    </div>
    
    {#if menu}
        <div class="floating-button-list" transition:fade={{ duration: 200 }}>
            <slot />
        </div>
    {/if}
</div>

<style>
    .floating-button-menu {
        visibility: hidden;
    }

    .floating-button {
        width: 50px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 10px;
        bottom: 24px;
        position: absolute;
        color: var(--primary-color-white);
        border-radius: 50px 0 0 50px;
        background-color: var(--primary-color-theme);
    }

    .floating-button-list {
        right: 74px;
        bottom: 37px;
        position: absolute;
        gap: 14px;
        display: flex;
        align-items: center;
    }
</style>
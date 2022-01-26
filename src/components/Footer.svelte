<script>
    import Title from "./svg/Title.svelte";
    export let count = 0;
</script>

<div class="footer">
    <div class="btn-section">
        <div style="display: flex;">
            <div class="charater-count-bracket">[</div>
            <div class="charater-count">{count}</div>
            <div class="charater-count-bracket">]</div>
        </div>
        <slot />
    </div>
    <Title/>
</div>

<style>
    .footer {
        height: 40px;
        margin: 0 10px;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .btn-section {
        gap: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.2s;
    }

    .charater-count-bracket {
        color: var(--primary-color-yellow);
        font-family: var(--primary-font-regular);
    }

    .charater-count {
        min-width: 22px;
        text-align: center;
        color: var(--primary-color-black);
        font-family: var(--primary-font-medium);
    }
</style>
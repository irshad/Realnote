<script>
	import { fade, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
    import ToastStore from '../stores/toast';
</script>

<style>
	.toast-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 10%;
		text-align: center;
		z-index: 9999;
	}
	.toast-item {
        gap: 5px;
        display: flex;
        align-items: center;
		border-radius: 10px;
		padding: 9px 15px;
		margin: 10px auto;
		width: fit-content;
		font-size: 16px;
        font-family: var(--primary-font-medium);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	}
</style>

<div class="toast-wrapper">
	{#if $ToastStore.show}
		<div class="toast-item {$ToastStore.type}"
			style="background-color: {$ToastStore.color}; color:{$ToastStore.textColor}" 
			in:fly="{{delay: 0, duration: 300, x: 0, y: 50, opacity: 0.1, easing: backOut}}" 
			out:fade={{duration:200, opacity: 0}}>
			{$ToastStore.message}
		</div>
	{/if}
</div>
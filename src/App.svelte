<script>
	import Toast from "./components/Toast.svelte";
	import HomePage from "./pages/HomePage.svelte";
	import { theme } from "./stores/theme";
</script>

<div style="--primary-color-theme: {$theme.color}">
	<HomePage/>
	<Toast/>
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
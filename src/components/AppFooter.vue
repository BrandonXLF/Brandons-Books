<template>
	<footer v-if="$route.meta.footer">
		<component :is="$route.meta.footer" />
	</footer>
</template>

<style scoped>
	footer {
		border-top: 1px solid #888;
		padding-top: 0.5rem;
		margin: 2em;
		font-size: 0.9em;
	}
</style>
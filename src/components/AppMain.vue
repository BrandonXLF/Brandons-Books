<script setup lang="ts">
	import { RouterView } from 'vue-router';
</script>

<template>
	<main>
		<RouterView v-if="!$route.meta.error" />
		<component :is="$route.meta.error" />
	</main>
</template>

<style scoped>
	main {
		margin: 0 2em 1.5em;
	}
</style>
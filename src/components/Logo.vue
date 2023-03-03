<script setup lang="ts">
	import { RouterLink } from 'vue-router';
</script>

<template>
	<RouterLink to="/" class="logo">
		<span>B</span>
		<span>randon's Books</span>
	</RouterLink>
</template>

<style scoped>
	.logo {
		text-decoration: none;
		color: black;
		font-weight: bold;
	}

	.logo > :first-child {
		background: #5e9aff;
		padding: 0.15em 0.35em;
		color: white;
	}

	.logo > :nth-child(2) {
		margin-left: 0.1em;
	}
</style>

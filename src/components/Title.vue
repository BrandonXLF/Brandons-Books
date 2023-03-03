<script setup lang="ts">
	defineProps<{
		text?: string;
	}>();
</script>

<template>
	<h1 v-if="text">
		<span>{{ text[0] }}</span>
		<span>{{ text.slice(1) }}</span>
	</h1>
</template>

<style scoped>
	header > * {
		display: inline-block;
	}

	.logo,
	nav > a {
		margin-right: 0.5em;
	}

	nav > .router-link-active {
		color: black;
		text-decoration: none;
	}

	.logo > :first-child,
	h1 > :first-child {
		background: #5e9aff;
		padding: 0.15em 0.35em;
		color: white;
	}

	.logo > :nth-child(2),
	h1 > :nth-child(2) {
		margin-left: 0.1em;
	}
</style>

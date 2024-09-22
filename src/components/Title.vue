<script setup lang="ts">
	defineProps<{
		text?: string;
		useDiv?: boolean;
	}>();
</script>

<template>
	<component v-if="text" :is="useDiv ? 'div' : 'h1'" class="title">
		{{ text }}
	</component>
</template>

<style scoped>
	header > * {
		display: inline-block;
	}

	.title::first-letter {
		background: var(--accent);
		padding: 0.15em 0.35em;
		color: white;
		margin-right: 0.1em;
	}
</style>

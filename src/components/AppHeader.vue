<script setup lang="ts">
	import Title from '@/components/Title.vue';
	import Nav from '@/components/Nav.vue';
	import Logo from '@/components/Logo.vue';
</script>

<template>
	<header>
		<Nav>
			<Logo />
			<component :is="$route.meta.header" />
		</Nav>
		<Title v-if="!$route.meta.error" :text="$route.meta.title as string" />
	</header>
</template>

<style scoped>
	nav {
		padding: 1.15em 2em;
		border-bottom: 1px solid var(--border-color);
	}

	.title {
		margin: 2rem;
	}
</style>
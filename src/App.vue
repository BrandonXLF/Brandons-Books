<script setup lang="ts">
	import { RouterView } from 'vue-router';
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
	<main>
		<RouterView v-if="!$route.meta.error" />
		<component :is="$route.meta.error" />
	</main>
	<footer v-if="$route.meta.footer">
		<component :is="$route.meta.footer" />
	</footer>
</template>

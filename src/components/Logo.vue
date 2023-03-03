<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import Title from '@/components/Title.vue';
</script>

<template>
	<RouterLink to="/" class="logo">
		<Title text="Brandon's Books" :use-div="true" />
	</RouterLink>
</template>

<style scoped>
	.logo {
		text-decoration: none;
		color: black;
		font-weight: bold;
	}
</style>

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
			<component
				v-if="!$route.meta.error && $route.meta.header"
				:is="$route.meta.header"
			/>
		</Nav>
	</header>
	<component v-if="$route.meta.error" :is="$route.meta.error" />
	<template v-else>
		<Title :text="$route.meta.title as string" />
		<RouterView />
	</template>
</template>

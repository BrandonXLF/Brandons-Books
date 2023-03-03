<script setup lang="ts">
	import type { DatedChange } from '@/stores/transactions';
	import { useRoute, RouterLink } from 'vue-router';
	import Figure from '@/components/Figure.vue';

	defineProps<{
		change: DatedChange;
	}>();

	const book = parseInt(useRoute().params.book as string);
</script>

<template>
	<div>
		{{ change.date.getUTCFullYear() }}-{{
			(change.date.getUTCMonth() + 1).toString().padStart(2, '0')
		}}-{{ change.date.getUTCDate().toString().padStart(2, '0') }}
	</div>
	<div></div>
	<div>
		<RouterLink :to="{ name: 'journal', params: { book } }">J1</RouterLink>
	</div>
	<div>
		<Figure v-if="change.amount > 0" :value="change.amount" />
	</div>
	<div>
		<Figure v-if="change.amount < 0" :value="-change.amount" />
	</div>
	<div class="dr-cr">
		<template v-if="change.total >= 0">Dr</template>
		<template v-else>Cr</template>
	</div>
	<div>
		<Figure :value="Math.abs(change.total)" />
	</div>
</template>

<style scoped>
	.dr-cr {
		margin-right: 1em;
	}
</style>

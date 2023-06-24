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
	<div class="start border">
		{{ change.date.getUTCFullYear() }}-{{
			(change.date.getUTCMonth() + 1).toString().padStart(2, '0')
		}}-{{ change.date.getUTCDate().toString().padStart(2, '0') }}
	</div>
	<div class="border"></div>
	<div class="border">
		<RouterLink :to="{ name: 'journal', params: { book } }">J1</RouterLink>
	</div>
	<div class="value border">
		<Figure v-if="change.amount > 0" :value="change.amount" />
	</div>
	<div class="value border">
		<Figure v-if="change.amount < 0" :value="-change.amount" />
	</div>
	<div class="border">
		<template v-if="change.total >= 0">Dr</template>
		<template v-else>Cr</template>
	</div>
	<div class="value border end">
		<Figure :value="Math.abs(change.total)" />
	</div>
</template>
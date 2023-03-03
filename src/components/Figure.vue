<script setup lang="ts">
	import { AccountType, accountTypes } from '@/data/accountTypes';
	import { computed } from 'vue';

	const props = defineProps<{
		value: number;
		multiplier?: number;
		accountType?: AccountType;
	}>();

	const multiplier =
		props.multiplier ??
		(props.accountType !== undefined
			? accountTypes[props.accountType as AccountType].multiplier
			: 1);

	const value = computed(() => props.value * multiplier);
	const display = computed(() => Math.abs(value.value).toLocaleString());
</script>

<template>
	<template v-if="value < 0">(</template>{{ display
	}}<template v-if="value < 0">)</template>
</template>

<script setup lang="ts">
	import {
		AccountType,
		accountTypes,
		incomeAccountTypes,
		incomeParentType
	} from '@/data/accountTypes';
	import { useTransactionStore, type TimeRange } from '@/stores/transactions';
	import Figure from '@/components/Figure.vue';
	import { computed } from 'vue';

	const props = defineProps<{
		book: UUID;
		type: AccountType | AccountType[];
		name: string;
		timeRange?: TimeRange;
		valueClass?: string;
		totalDepth?: number;
		threeColEmpty?: number;
		imaginary?: boolean;
	}>();

	const transactions = useTransactionStore();
	const types = typeof props.type === 'number' ? [props.type] : props.type;

	if (types.includes(incomeParentType)) types.push(...incomeAccountTypes);

	const value = computed(() =>
		transactions.getTotalForAccountType(props.book, types, props.timeRange)
	);
</script>

<template>
	<template v-if="!imaginary || value">
		<div :class="`total-${totalDepth || 0} ${imaginary ? 'imaginary' : ''}`">{{ name }}</div>
		<div v-if="threeColEmpty === 2"></div>
		<div :class="`value ${valueClass}`">
			<Figure
				:value="value"
				:multiplier="accountTypes[types[0]].multiplier"
			/>
		</div>
		<div v-if="threeColEmpty === 3"></div>
	</template>
</template>

<style>
	.imaginary {
		font-style: italic;
	}

	.total-1 {
		margin-left: 0.75em;
	}

	.total-2 {
		margin-left: 1.5em;
	}
</style>

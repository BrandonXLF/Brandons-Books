<script setup lang="ts">
	import {
		AccountType,
		accountTypes,
		incomeAccountTypes,
		incomeParentType
	} from '@/data/accountTypes';
	import { useTransactionStore, type TimeRange } from '@/stores/transactions';
	import Figure from '@/components/Figure.vue';

	const props = defineProps<{
		book: UUID;
		type: AccountType | AccountType[];
		name: string;
		timeRange?: TimeRange;
		nameClass?: string;
		valueClass?: string;
		totalDepth?: number;
		threeColEmpty?: number;
	}>();

	const transactions = useTransactionStore();
	const types = typeof props.type === 'number' ? [props.type] : props.type;

	if (types.includes(incomeParentType)) types.push(...incomeAccountTypes);
</script>

<template>
	<div :class="`total-${totalDepth || 0} ${nameClass}`">{{ name }}</div>
	<div v-if="threeColEmpty === 2"></div>
	<div :class="`value ${valueClass}`">
		<Figure
			:value="transactions.getTotalForAccountType(book, types, timeRange)"
			:multiplier="accountTypes[types[0]].multiplier"
		/>
	</div>
	<div v-if="threeColEmpty === 3"></div>
</template>

<style>
	.total-1 {
		margin-left: 0.75em;
	}

	.total-2 {
		margin-left: 1.5em;
	}
</style>

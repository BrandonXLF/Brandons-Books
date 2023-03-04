<script setup lang="ts">
	import { AccountType, accountTypes } from '@/data/accountTypes';
	import { useTransactionStore } from '@/stores/transactions';
	import Figure from '@/components/Figure.vue';

	const props = defineProps<{
		book: number;
		type: number | number[];
		name: string;
		date?: Date;
		valueClass?: string;
		totalDepth?: number;
		threeColEmpty?: number;
	}>();

	const transactions = useTransactionStore();
	const types: AccountType[] = Array.isArray(props.type)
		? props.type
		: [props.type];
</script>

<template>
	<div :class="`total-${totalDepth || 0}`">{{ name }}</div>
	<div v-if="threeColEmpty === 2"></div>
	<div :class="`value ${valueClass}`">
		<Figure
			:value="transactions.getTotalForAccountTypes(book, types, date)"
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

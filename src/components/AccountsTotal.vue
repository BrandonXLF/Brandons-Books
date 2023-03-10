<script setup lang="ts">
	import {
		accountTypes,
		AccountType,
		incomeAccountTypes
	} from '@/data/accountTypes';
	import { useAccountStore } from '@/stores/accounts';
	import { useTransactionStore, type TimeRange } from '@/stores/transactions';
	import Figure from '@/components/Figure.vue';
	import TypeTotal from './TypeTotal.vue';

	const props = defineProps<{
		book: number;
		type: AccountType;
		timeRange?: TimeRange;
		threeColEmpty?: number;
	}>();

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const accountsOfType = accounts.byType(props.book, props.type);
	const netIncome = accountTypes[props.type].netIncome;
</script>

<template>
	<template v-for="(account, index) in accountsOfType" :key="account.number">
		<div>{{ account.name }}</div>
		<div v-if="threeColEmpty === 2"></div>
		<div
			:class="`value ${
				!netIncome && index == accountsOfType.length - 1 ? 'pre-total' : ''
			}`"
		>
			<Figure
				:value="
					transactions.getTotalForAccount(book, account.number, timeRange)
				"
				:accountType="account.type"
			/>
		</div>
		<div v-if="threeColEmpty === 3"></div>
	</template>
	<TypeTotal
		v-if="accountTypes[type].netIncome"
		valueClass="pre-total"
		:book="book"
		:type="incomeAccountTypes"
		:name="accountTypes[type].netIncome as string"
		:time-range="timeRange"
	/>
</template>

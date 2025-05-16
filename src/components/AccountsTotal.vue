<script setup lang="ts">
	import {
		AccountType,
		incomeParentType,
		incomeAccountTypes
	} from '@/data/accountTypes';
	import { useAccountStore } from '@/stores/accounts';
	import { useTransactionStore, type TimeRange } from '@/stores/transactions';
	import Figure from '@/components/Figure.vue';
	import TypeTotal from './TypeTotal.vue';

	const props = defineProps<{
		book: UUID;
		type: AccountType;
		timeRange?: TimeRange;
		threeColEmpty?: number;
	}>();

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const accountsOfType = accounts.byType(props.book, props.type);
	const includeIncome = props.type == incomeParentType;
</script>

<template>
	<template v-for="(account, index) in accountsOfType" :key="account.number">
		<div>{{ account.name }}</div>
		<div v-if="threeColEmpty === 2"></div>
		<div
			:class="`value ${
				!includeIncome && index == accountsOfType.length - 1 ? 'pre-total' : ''
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
		v-if="includeIncome"
		valueClass="pre-total"
		:book="book"
		:type="incomeAccountTypes"
		nameClass="italic"
		name="Pending Retained Earnings"
		:time-range="timeRange"
	/>
</template>

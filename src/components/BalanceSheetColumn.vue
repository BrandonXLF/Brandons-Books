<script setup lang="ts">
	import { accountTypes, incomeAccountTypes } from '@/data/accountTypes';
	import { useAccountStore } from '@/stores/accounts';
	import { useTransactionStore } from '@/stores/transactions';
	import { useRoute } from 'vue-router';
	import Figure from '@/components/Figure.vue';

	defineProps<{
		multiplier: number;
		date?: Date;
	}>();

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const book = parseInt(useRoute().params.book as string);
</script>

<template>
	<div class="table balance-sheet">
		<template
			v-for="accountType in Object.values(accountTypes).filter(
				accountType =>
					accountType.multiplier === multiplier &&
					!incomeAccountTypes.includes(accountType.type)
			)"
			:key="accountType.name"
		>
			<h2>{{ accountType.name }}</h2>
			<template
				v-for="account in accounts.byType(book, accountType.type)"
				:key="account.number"
			>
				<div>
					{{ account.name }}
				</div>
				<div class="value">
					<Figure
						:value="transactions.getTotalForAccount(book, account.number, date)"
						:accountType="account.type"
					/>
				</div>
			</template>
		</template>
		<slot />
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.balance-sheet {
		grid-template-columns: 1fr max-content;
		max-width: 30em;
		flex: 0 1 100%;
	}

	.balance-sheet h2 {
		grid-column: 1 / 3;
		margin-top: 1em;
	}

	.balance-sheet h2:first-child {
		margin-top: 0;
	}
</style>

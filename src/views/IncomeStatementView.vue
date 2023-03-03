<script setup lang="ts">
	import { accountTypes, incomeAccountTypes } from '@/data/accountTypes';
	import { useAccountStore } from '@/stores/accounts';
	import { useTransactionStore } from '@/stores/transactions';
	import { useRoute } from 'vue-router';
	import Figure from '@/components/Figure.vue';
	import TopDate from '@/components/TopDate.vue';
	import { ref } from 'vue';

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const book = parseInt(useRoute().params.book as string);
	const date = ref<Date | undefined>(new Date());
</script>

<template>
	<TopDate v-model="date" />
	<div class="table income-statement">
		<template v-for="(accountType, index) in incomeAccountTypes" :key="index">
			<h2>{{ accountTypes[accountType].name }}</h2>
			<template
				v-for="account in accounts.byType(book, accountType)"
				:key="account.number"
			>
				<div>{{ account.name }}</div>
				<div>
					<Figure
						:value="transactions.getTotalForAccount(book, account.number, date)"
						:accountType="accountType"
					/>
				</div>
				<div></div>
			</template>
			<div>
				<em>Total {{ accountTypes[accountType].name }}</em>
			</div>
			<div></div>
			<div>
				<Figure
					:value="transactions.getTotalForAccountType(book, accountType, date)"
					:accountType="accountType"
				/>
			</div>
		</template>
		<div style="margin-top: 0.5em">Net Income</div>
		<div></div>
		<div style="margin-top: 0.5em">
			<Figure
				:value="transactions.getTotalForAccountTypes(book, incomeAccountTypes, date)"
				:multiplier="-1"
			/>
		</div>
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.income-statement {
		grid-template-columns: 5fr repeat(2, 1fr);
		max-width: 40em;
	}

	.income-statement h2 {
		grid-column: 1 / 4;
	}

	.income-statement h2:first-child {
		margin-top: 0;
	}
</style>

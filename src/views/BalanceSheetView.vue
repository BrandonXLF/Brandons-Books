<script setup lang="ts">
	import { incomeAccountTypes } from '@/data/accountTypes';
	import { useTransactionStore } from '@/stores/transactions';
	import { useRoute } from 'vue-router';
	import BalanceSheetColumn from '@/components/BalanceSheetColumn.vue';
	import Figure from '@/components/Figure.vue';
	import TopDate from '@/components/TopDate.vue';
	import { ref } from 'vue';

	const transactions = useTransactionStore();
	const book = parseInt(useRoute().params.book as string);
	const date = ref<Date | undefined>(new Date());
</script>

<template>
	<TopDate v-model="date" />
	<div class="balance-sheets">
		<BalanceSheetColumn :multiplier="1" :date="date" />
		<BalanceSheetColumn :multiplier="-1" :date="date">
			<div>
				<em>Undistributed Equity</em>
			</div>
			<div>
				<Figure
					:value="
						transactions.getTotalForAccountTypes(book, incomeAccountTypes, date)
					"
					:multiplier="-1"
				/>
			</div>
		</BalanceSheetColumn>
	</div>
</template>

<style scoped>
	.balance-sheets {
		display: flex;
		align-items: start;
		gap: 2em;
	}
</style>

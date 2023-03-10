<script setup lang="ts">
	import BalanceSheetColumn from '@/components/BalanceSheetColumn.vue';
	import TopDate from '@/components/TopDate.vue';
	import { AccountType } from '@/data/accountTypes';
	import type { TimeRange } from '@/stores/transactions';
	import { ref } from 'vue';

	const timeRange = ref<TimeRange>({});
</script>

<template>
	<TopDate v-model="timeRange.end" />
	<div class="balance-sheets">
		<BalanceSheetColumn :types="[AccountType.Asset]" :time-range="timeRange" />
		<BalanceSheetColumn
			:types="[AccountType.Liability, AccountType.Equity]"
			:time-range="timeRange"
		/>
	</div>
</template>

<style scoped>
	.balance-sheets {
		display: flex;
		align-items: start;
		gap: 2em;
	}

	@media (max-width: 400px) {
		.balance-sheets {
			gap: 1em;
		}
	}
</style>

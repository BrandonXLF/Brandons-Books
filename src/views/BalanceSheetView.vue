<script setup lang="ts">
	import BalanceSheetColumn from '@/components/BalanceSheetColumn.vue';
	import TopDate from '@/components/TopDate.vue';
	import { AccountType } from '@/data/accountTypes';
	import { ref } from 'vue';

	const date = ref<Date | undefined>(new Date());
</script>

<template>
	<TopDate v-model="date" />
	<div class="balance-sheets">
		<BalanceSheetColumn :types="[AccountType.Asset]" :date="date" />
		<BalanceSheetColumn
			:types="[AccountType.Liability, AccountType.Equity]"
			:date="date"
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

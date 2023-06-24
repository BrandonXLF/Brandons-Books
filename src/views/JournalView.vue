<script setup lang="ts">
	import { useTransactionStore } from '@/stores/transactions';
	import { useRoute } from 'vue-router';
	import AddEntry from '@/components/AddEntry.vue';
	import ActionPopup from '@/components/ActionPopup.vue';
	import JournalEntry from '@/components/JournalEntry.vue';

	const transactions = useTransactionStore();
	const book = parseInt(useRoute().params.book as string);
</script>

<template>
	<div class="table journal">
		<div class="header" style="grid-column: 1 / span 2">Date</div>
		<div class="header">Particulars</div>
		<div class="header">P.R.</div>
		<div class="header value">Debit</div>
		<div class="header value">Credit</div>
		<JournalEntry
			v-for="transaction in transactions.byBook(book)"
			:transaction="transaction"
			:key="transaction.number"
		/>
	</div>
	<ActionPopup
		:type="AddEntry"
		toggleText="Add Transaction"
		titleText="Create Transaction"
		submitText="Create"
	/>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.journal {
		grid-template-columns: max-content 2fr 8fr 1fr 2fr 2fr;
		max-width: 52em;
	}
</style>

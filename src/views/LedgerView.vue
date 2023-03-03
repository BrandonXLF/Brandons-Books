<script setup lang="ts">
	import { useTransactionStore } from '@/stores/transactions';
	import { useAccountStore } from '@/stores/accounts';
	import { useRoute } from 'vue-router';
	import ActionPopup from '@/components/ActionPopup.vue';
	import AddAccount from '@/components/AddAccount.vue';
	import DeleteAccount from '@/components/DeleteAccount.vue';
	import EditButton from '@/components/EditButton.vue';
	import DeleteButton from '@/components/DeleteButton.vue';
	import LedgerEntry from '@/components/LedgerEntry.vue';

	const transactions = useTransactionStore();
	const accounts = useAccountStore();
	const book = parseInt(useRoute().params.book as string);
	const account = accounts.byNumber(
		book,
		parseInt(useRoute().params.account as string)
	);
</script>

<template>
	<div v-if="account === undefined">Account does not exist.</div>
	<div v-else :id="account.userNumber">
		<div class="title">
			<h2>{{ account.name }} #{{ account.userNumber }}</h2>
			<ActionPopup
				:type="DeleteAccount"
				:number="account.number"
				titleText="Delete Account"
				submitText="Delete"
			>
				<DeleteButton />
			</ActionPopup>
			<ActionPopup
				:type="AddAccount"
				:number="account.number"
				titleText="Edit Account"
				submitText="Save"
			>
				<EditButton />
			</ActionPopup>
		</div>

		<div class="table ledger">
			<div class="header">Date</div>
			<div class="header">Particulars</div>
			<div class="header">P.R.</div>
			<div class="header">Debit</div>
			<div class="header">Credit</div>
			<div class="header"></div>
			<div class="header">Balance</div>
			<LedgerEntry
				v-for="(change, index) in transactions.getChangesForAccount(
					book,
					account.number
				)"
				:change="change"
				:key="index"
			/>
		</div>
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.title {
		display: flex;
		align-items: center;
		margin-bottom: 0.5em;
	}

	.title h2 {
		margin: 0 0.25em 0 0;
	}

	.ledger {
		grid-template-columns: 2fr 5fr repeat(3, 1fr) max-content 1fr;
		max-width: 50em;
	}
</style>

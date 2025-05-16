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
	import Actions from '@/components/Actions.vue';

	const transactions = useTransactionStore();
	const accounts = useAccountStore();
	const book = useRoute().params.book as UUID;
	const account = accounts.byNumber(
		book,
		useRoute().params.account as UUID
	);
</script>

<template>
	<div v-if="account === undefined">Account does not exist.</div>
	<article v-else>
		<header class="title">
			<h2>{{ account.name }} - No. {{ account.userNumber }}</h2>
			<Actions>
				<ActionPopup
					:type="DeleteAccount"
					:number="account.number"
					titleText="Delete Account"
					submitText="Delete"
					destructive
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
			</Actions>
		</header>
		<div class="table ledger">
			<div class="header start">Date</div>
			<div class="header">Particulars</div>
			<div class="header">P.R.</div>
			<div class="header value">Debit</div>
			<div class="header value">Credit</div>
			<div class="header"></div>
			<div class="header value end">Balance</div>
			<LedgerEntry
				v-for="(change, index) in transactions.getChangesForAccount(
					book,
					account.number
				)"
				:change="change"
				:key="index"
			/>
		</div>
	</article>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.title {
		display: flex;
		align-items: center;
		margin-bottom: 0.5em;
	}

	.title h2 {
		margin: 0 1rem 0 0;
	}

	.ledger {
		grid-template-columns: 2fr 6fr 1fr 2fr 2fr max-content 2fr;
		max-width: 52em;
	}
</style>

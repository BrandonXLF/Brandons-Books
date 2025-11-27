<script setup lang="ts">
	import type { TransactionData } from '@/stores/transactions';
	import { useAccountStore } from '@/stores/accounts';
	import { useRoute, RouterLink } from 'vue-router';
	import Figure from '@/components/Figure.vue';
	import ActionPopup from '@/components/ActionPopup.vue';
	import DeleteEntry from '@/components/DeleteEntry.vue';
	import AddEntry from '@/components/AddEntry.vue';
	import DeleteButton from '@/components/DeleteButton.vue';
	import EditButton from '@/components/EditButton.vue';
	import Actions from './Actions.vue';

	defineProps<{
		transaction: TransactionData;
	}>();

	const accounts = useAccountStore();
	const book = useRoute().params.book as UUID;
</script>

<template>
	<template v-for="(change, index) in transaction.changes" :key="index">
		<div class="start">
			<Actions>
				<ActionPopup
					v-if="index === 0"
					:type="DeleteEntry"
					:number="transaction.number"
					titleText="Delete Transaction"
					submitText="Delete"
					destructive
				>
					<DeleteButton />
				</ActionPopup>
				<ActionPopup
					v-if="index === 0"
					:type="AddEntry"
					:number="transaction.number"
					titleText="Edit Transaction"
					submitText="Save"
				>
					<EditButton />
				</ActionPopup>
			</Actions>
		</div>
		<div :class="transaction.closing ? 'closing-date' : ''">
			<template v-if="index === 0">
				{{ transaction.date.getUTCFullYear() }}-{{
					(transaction.date.getUTCMonth() + 1).toString().padStart(2, '0')
				}}-{{ transaction.date.getUTCDate().toString().padStart(2, '0') }}
			</template>
		</div>
		<div :class="change.amount < 0 ? 'credit' : 'debit'">
			{{ accounts.byNumber(book, change.account)!.name }}
		</div>
		<div>
			<RouterLink
				:to="{
					name: 'ledgeraccount',
					params: { book, account: change.account }
				}"
			>
				{{ accounts.byNumber(book, change.account)!.userNumber }}
			</RouterLink>
		</div>
		<div class="value">
			<Figure v-if="change.amount > 0" :value="change.amount" />
		</div>
		<div class="value end">
			<Figure v-if="change.amount < 0" :value="-change.amount" />
		</div>
	</template>
	<div class="border start"></div>
	<div class="border"></div>
	<div class="summary border">
		{{ transaction.summary }}
	</div>
	<div class="border"></div>
	<div class="border"></div>
	<div class="border end"></div>
</template>

<style scoped>
	.closing-date {
		font-weight: bolder;
	}

	.summary {
		font-style: italic;
	}
</style>

<script setup lang="ts">
	import { useAccountStore } from '@/stores/accounts';
	import type { AccountChange } from '@/stores/transactions';
	import { useTransactionStore } from '@/stores/transactions';
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import LabeledInput from '@/components/LabeledInput.vue';
	import FigureInput from '@/components/FigureInput.vue';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number?: number;
		submissionNumber?: number;
	}>();

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const book = parseInt(useRoute().params.book as string);

	const transaction =
		props.number === undefined
			? undefined
			: transactions.byNumber(book, props.number);

	const date = ref<Date | undefined | null>(transaction?.date);
	const summary = ref<string>(transaction?.summary ?? '');

	const changes = ref<AccountChange[]>(
		transaction?.changes.map(change => {
			return { ...change };
		}) || []
	);

	const unchangedAccounts = computed(() => {
		const changedAccounts = changes.value.map(change => change.account);

		return accounts
			.byBook(book)
			.filter(account => !changedAccounts.includes(account.number));
	});

	const selectedAccount = ref<number>(unchangedAccounts.value[0]?.number);

	const changesWithValue = computed(() =>
		changes.value.filter(change => change.amount)
	);

	function addChange() {
		if (selectedAccount.value === null) return;

		changes.value.push({
			account: selectedAccount.value,
			amount: 0
		});

		selectedAccount.value = unchangedAccounts.value[0]?.number;
	}

	function submit() {
		let sum = 0;

		if (!changesWithValue.value.length) {
			emit('error', 'No changes');
			return;
		}

		if (!date.value) {
			emit('error', 'No date');
			return;
		}

		changesWithValue.value.forEach(change => (sum += change.amount));

		if (sum !== 0) {
			emit('error', 'Unbalanced transaction');
			return;
		}

		const data = {
			changes: changesWithValue.value,
			date: new Date(date.value),
			summary: summary.value
		};

		if (props.number) {
			transactions.editTransaction(book, props.number, data);
		} else {
			transactions.addTransaction(book, data);
		}

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>
	<LabeledInput label="Date">
		<input
			type="date"
			:valueAsDate="date"
			@change="date = ($event.target as HTMLInputElement).valueAsDate"
		/>
	</LabeledInput>
	<LabeledInput label="Summary" v-model:value.trim="summary" />
	<fieldset>
		<legend>Changes</legend>
		<FigureInput
			v-for="change in changes"
			:key="change.account"
			:accountType="accounts.byNumber(book, change.account)!.type"
			:label="accounts.byNumber(book, change.account)!.name"
			v-model:value="change.amount"
		/>
		<LabeledInput
			v-if="unchangedAccounts.length"
			button="Add"
			:flex="false"
			@button="addChange"
		>
			<select v-model.number="selectedAccount">
				<option
					v-for="account in unchangedAccounts"
					:key="account.number"
					:value="account.number"
				>
					{{ account.name }}
				</option>
			</select>
		</LabeledInput>
	</fieldset>
</template>

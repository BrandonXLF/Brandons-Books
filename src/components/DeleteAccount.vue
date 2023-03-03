<script setup lang="ts">
	import { useTransactionStore } from '@/stores/transactions';
	import { useAccountStore } from '@/stores/accounts';
	import { useRoute } from 'vue-router';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number: number;
	}>();

	const transactions = useTransactionStore();
	const accounts = useAccountStore();
	const book = parseInt(useRoute().params.book as string);

	function submit() {
		if (transactions.getChangesForAccount(book, props.number).length) {
			emit('error', 'Account is used in transactions');
			return;
		}

		accounts.removeAccount(book, props.number);

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>Are you sure you want to delete this account?</template>

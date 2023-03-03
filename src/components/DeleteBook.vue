<script setup lang="ts">
	import { useBookStore } from '@/stores/books';
	import { useAccountStore } from '@/stores/accounts';
	import { useTransactionStore } from '@/stores/transactions';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number: number;
	}>();

	const accounts = useAccountStore();
	const transactions = useTransactionStore();
	const books = useBookStore();

	function submit() {
		accounts.removeByBook(props.number);
		transactions.removeByBook(props.number);
		books.removeBook(props.number);

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>Are you sure you want to delete this book?</template>

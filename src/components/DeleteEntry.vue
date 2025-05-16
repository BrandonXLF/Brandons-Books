<script setup lang="ts">
	import { useTransactionStore } from '@/stores/transactions';
	import { useRoute } from 'vue-router';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number: UUID;
	}>();

	const transactions = useTransactionStore();
	const book = useRoute().params.book as UUID;

	function submit() {
		transactions.removeTransaction(book, props.number);

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>Are you sure you want to delete this transaction?</template>

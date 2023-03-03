<script setup lang="ts">
	import { ref } from 'vue';
	import { useBookStore } from '@/stores/books';
	import LabeledInput from '@/components/LabeledInput.vue';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number?: number;
	}>();

	const books = useBookStore();
	const book =
		props.number === undefined ? undefined : books.byNumber(props.number);
	const name = ref<string>(book?.name ?? '');

	function submit() {
		if (!name.value) {
			emit('error', 'No name');
			return;
		}

		const data = {
			name: name.value
		};

		if (props.number) {
			books.editBook(props.number, data);
		} else {
			books.addBook(data);
		}

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>
	<LabeledInput type="text" label="Name" v-model:value.trim="name" />
</template>

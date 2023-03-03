<script setup lang="ts">
	import { useBookStore } from '@/stores/books';
	import AddBook from '@/components/AddBook.vue';
	import DeleteBook from '@/components/DeleteBook.vue';
	import ActionPopup from '@/components/ActionPopup.vue';
	import EditButton from '@/components/EditButton.vue';
	import DeleteButton from '@/components/DeleteButton.vue';
	import DownloadButton from '@/components/DownloadButton.vue';
	import { RouterLink } from 'vue-router';
	import FileStorage from '@/helpers/FileStorage';

	const books = useBookStore();
</script>

<template>
	<div class="container">
		<div v-for="book in books.books" :key="book.number" class="book">
			<RouterLink
				:to="{ name: 'book', params: { book: book.number } }"
				class="link"
			>
				{{ book.name }}
			</RouterLink>
			<ActionPopup
				:type="DeleteBook"
				:number="book.number"
				titleText="Delete Book"
				submitText="Delete"
			>
				<DeleteButton />
			</ActionPopup>
			<ActionPopup
				:type="AddBook"
				:number="book.number"
				titleText="Edit Book"
				submitText="Save"
			>
				<EditButton />
			</ActionPopup>
			<DownloadButton @click="FileStorage.downloadBook(book.number)" />
		</div>
	</div>
	<div>
		<ActionPopup
			:type="AddBook"
			toggleText="Create Book"
			titleText="Create Book"
			submitText="Create"
		/>
		<button @click="FileStorage.uploadBook()">Upload Book</button>
	</div>
</template>

<style scoped>
	.book {
		margin: 0.5em 0;
		display: flex;
		align-items: center;
	}

	.link {
		margin-right: 0.5em;
	}

	.container {
		margin-bottom: 1em;
	}

	button,
	:deep(button) {
		margin-right: 0.5em;
	}
</style>

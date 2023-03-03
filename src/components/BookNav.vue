<script setup lang="ts">
	import { RouterLink, useRoute } from 'vue-router';
	import { useBookStore } from '@/stores/books';
	import Chevron from '@/components/Chevron.vue';
	import FileStorage from '@/helpers/FileStorage';
	import DownloadButton from '@/components/DownloadButton.vue';

	const book = parseInt(useRoute().params.book as string);
	const books = useBookStore();
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const name = books.byNumber(book)!.name;
</script>

<template>
	<Chevron class="chevron" />
	<span class="book-name">{{ name }}</span>
	<DownloadButton @click="FileStorage.downloadBook(book)" />
	<Chevron class="chevron" />
	<RouterLink :to="{ name: 'journal', params: { book } }">Journal</RouterLink>
	<RouterLink :to="{ name: 'ledger', params: { book } }">Ledgers</RouterLink>
	<RouterLink :to="{ name: 'balancesheet', params: { book } }"
		>Balance Sheet</RouterLink
	>
	<RouterLink :to="{ name: 'incomestatement', params: { book } }"
		>Income Statement</RouterLink
	>
</template>

<style scoped>
	nav > .router-link-active {
		color: black;
		text-decoration: none;
	}

	.book-name,
	.chevron {
		margin-right: 0.5em;
	}
</style>

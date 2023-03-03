import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';

export interface BookData {
	number: number;
	name: string;
}

export const useBookStore = defineStore('books', () => {
	const books = ref<BookData[]>(
		JSON.parse(localStorage.getItem('books') || '[]')
	);

	watch([books, books.value], () =>
		localStorage.setItem('books', JSON.stringify(books.value))
	);

	function byNumber(number: number) {
		return books.value.find(book => book.number === number);
	}

	function addBook(data: Omit<BookData, 'number'>) {
		const number = (books.value.slice(-1)[0]?.number || 0) + 1;

		books.value.push({
			...data,
			number: number
		});

		return number;
	}

	function editBook(number: number, data: Omit<BookData, 'number'>) {
		const target = byNumber(number);

		for (const key in data) {
			// @ts-ignore
			target[key] = data[key];
		}
	}

	function removeBook(number: number) {
		books.value = books.value.filter(book => book.number !== number);
	}

	return {
		books,
		byNumber,
		addBook,
		editBook,
		removeBook
	};
});

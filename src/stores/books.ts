import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export interface BookData {
	number: number;
	name: string;
}

export const useBookStore = defineStore('books', () => {
	const books = ref<BookData[]>(
		JSON.parse(localStorage.getItem('books') || '[]')
	);

	watch(
		books,
		() => localStorage.setItem('books', JSON.stringify(books.value)),
		{ deep: true }
	);

	function byNumber(number: number) {
		return books.value.find(book => book.number === number);
	}

	function addBook(data: Omit<BookData, 'number'> & { number?: number }) {
		if (data.number) {
			const index = books.value.findIndex(book => book.number === data.number);

			books.value[index] = data as BookData;

			return data.number;
		}

		const number = Math.max(0, ...books.value.map(book => book.number)) + 1;

		books.value.push({ ...data, number });

		return number;
	}

	function removeBook(number: number) {
		books.value = books.value.filter(book => book.number !== number);
	}

	return {
		books,
		byNumber,
		addBook,
		removeBook
	};
});

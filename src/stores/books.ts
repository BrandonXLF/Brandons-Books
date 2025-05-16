import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import parseObject from '@/helpers/parseObject';

export interface BookData {
	number: UUID;
	name: string;
}

export const useBookStore = defineStore('books', () => {
	const books = ref(parseObject<BookData[]>(localStorage.getItem('books') ?? '[]'));

	watch(
		books,
		() => localStorage.setItem('books', JSON.stringify(books.value)),
		{ deep: true }
	);

	function byNumber(number: UUID) {
		return books.value.find(book => book.number === number);
	}

	function addBook(data: Omit<BookData, 'number'> & { number?: UUID }) {
		if (data.number) {
			const index = books.value.findIndex(book => book.number === data.number);

			books.value[index] = data as BookData;

			return data.number;
		}

		const number = crypto.randomUUID();

		books.value.push({ ...data, number });

		return number;
	}

	function removeBook(number: UUID) {
		books.value = books.value.filter(book => book.number !== number);
	}

	return {
		books,
		byNumber,
		addBook,
		removeBook
	};
});

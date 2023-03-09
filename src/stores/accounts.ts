import { defineStore } from 'pinia';
import type { AccountType } from '@/data/accountTypes';
import { ref, watch } from 'vue';

export interface AccountData {
	number: number;
	book: number;
	userNumber: string;
	name: string;
	type: AccountType;
}

export const useAccountStore = defineStore('accounts', () => {
	const accounts = ref<AccountData[]>(
		JSON.parse(localStorage.getItem('accounts') || '[]')
	);

	watch(
		accounts,
		() => localStorage.setItem('accounts', JSON.stringify(accounts.value)),
		{ deep: true }
	);

	function byBook(book: number) {
		return accounts.value.filter(account => account.book === book);
	}

	function byNumber(book: number, number: number) {
		return byBook(book).find(account => account.number === number);
	}

	function byType(book: number, type: AccountType) {
		return byBook(book).filter(account => account.type === type);
	}

	function addAccount(data: Omit<AccountData, 'number'> & { number?: number }) {
		if (data.number) removeAccount(data.book, data.number);

		const accountsInBook = byBook(data.book);
		const number =
			data.number ||
			Math.max(0, ...accountsInBook.map(book => book.number)) + 1;

		let index = accountsInBook.findIndex(
			account => account.userNumber > data.userNumber
		);

		index = index == -1 ? accountsInBook.length : index;

		accounts.value.splice(index, 0, { ...data, number });
	}

	function removeAccount(book: number, number: number) {
		accounts.value = accounts.value.filter(
			account => account.book !== book || account.number !== number
		);
	}

	function removeByBook(book: number) {
		accounts.value = accounts.value.filter(account => account.book !== book);
	}

	return {
		accounts,
		byBook,
		byNumber,
		byType,
		addAccount,
		removeAccount,
		removeByBook
	};
});

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

	watch([accounts, accounts.value], () =>
		localStorage.setItem('accounts', JSON.stringify(accounts.value))
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

	function addAccount(
		book: number,
		data: Omit<Omit<AccountData, 'number'>, 'book'>
	) {
		accounts.value.push({
			...data,
			book: book,
			number: (byBook(book).slice(-1)[0]?.number || 0) + 1
		});
	}

	function editAccount(
		book: number,
		number: number,
		data: Omit<Omit<AccountData, 'number'>, 'book'>
	) {
		const target = byNumber(book, number);

		for (const key in data) {
			// @ts-ignore
			target[key] = data[key];
		}
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
		editAccount,
		removeAccount,
		removeByBook
	};
});

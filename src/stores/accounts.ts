import { defineStore } from 'pinia';
import type { AccountType } from '@/data/accountTypes';
import { ref, watch } from 'vue';
import parseObject from '@/helpers/parseObject';

export interface AccountData {
	number: UUID;
	book: UUID;
	userNumber: string;
	name: string;
	type: AccountType;
}

export const useAccountStore = defineStore('accounts', () => {
	const accounts = ref(parseObject<AccountData[]>(localStorage.getItem('accounts') ?? '[]'));

	ref<AccountData[]>(
		JSON.parse(localStorage.getItem('accounts') || '[]')
	);

	watch(
		accounts,
		() => localStorage.setItem('accounts', JSON.stringify(accounts.value)),
		{ deep: true }
	);

	function byBook(book: UUID) {
		return accounts.value.filter(account => account.book === book);
	}

	function byNumber(book: UUID, number: UUID) {
		return byBook(book).find(account => account.number === number);
	}

	function byType(book: UUID, type: AccountType) {
		return byBook(book).filter(account => account.type === type);
	}

	function addAccount(data: Omit<AccountData, 'number'> & { number?: UUID }) {
		if (data.number) removeAccount(data.book, data.number);

		const accountsInBook = byBook(data.book);
		const number = data.number ?? crypto.randomUUID();

		let index = accountsInBook.findIndex(
			account => account.userNumber > data.userNumber
		);

		index = index == -1 ? accountsInBook.length : index;

		accounts.value.splice(index, 0, { ...data, number });
	}

	function removeAccount(book: UUID, number: UUID) {
		accounts.value = accounts.value.filter(
			account => account.book !== book || account.number !== number
		);
	}

	function removeByBook(book: UUID) {
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

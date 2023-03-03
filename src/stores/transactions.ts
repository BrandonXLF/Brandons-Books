import { defineStore } from 'pinia';
import { useAccountStore } from '@/stores/accounts';
import type { AccountType } from '@/data/accountTypes';
import { ref, watch } from 'vue';

export interface AccountChange {
	amount: number;
	account: number;
}

export interface DatedChange {
	amount: number;
	date: Date;
	total: number;
}

export interface TransactionData {
	number: number;
	book: number;
	date: Date;
	summary: string;
	changes: AccountChange[];
}

export const useTransactionStore = defineStore('transactions', () => {
	const transactions = ref<TransactionData[]>(
		JSON.parse(localStorage.getItem('transactions') || '[]')
	);

	transactions.value.forEach(transaction => {
		transaction.date = new Date(transaction.date);
	});

	transactions.value = transactions.value.sort(
		(a, b) => a.date.getTime() - b.date.getTime()
	);

	watch([transactions, transactions.value], () =>
		localStorage.setItem('transactions', JSON.stringify(transactions.value))
	);

	function byBook(book: number) {
		return transactions.value.filter(transaction => transaction.book === book);
	}

	function byNumber(book: number, number: number) {
		return byBook(book).find(transaction => transaction.number === number);
	}

	function* iterateChanges(
		book: number,
		date?: Date
	): Generator<[TransactionData, AccountChange]> {
		for (const transaction of byBook(book)) {
			if (date && transaction.date > date) continue;

			for (const change of transaction.changes) {
				yield [transaction, change];
			}
		}
	}

	function getChangesForAccount(book: number, account: number, date?: Date) {
		const changes: DatedChange[] = [];

		let total = 0;

		for (const [transaction, change] of iterateChanges(book, date)) {
			if (change.account !== account) continue;

			total += change.amount;

			changes.push({
				amount: change.amount,
				date: transaction.date,
				total: total
			});
		}

		return changes;
	}

	function getTotalForAccount(book: number, account: number, date?: Date) {
		let total = 0;

		for (const [_, change] of iterateChanges(book, date)) {
			if (change.account !== account) continue;

			total += change.amount;
		}

		return total;
	}

	function getTotalForAccountTypes(
		book: number,
		types: AccountType[],
		date?: Date
	) {
		let total = 0;
		const accountStore = useAccountStore();

		for (const [_, change] of iterateChanges(book, date)) {
			const type = accountStore.byNumber(book, change.account)?.type;

			if (!type || !types.includes(type)) continue;

			total += change.amount;
		}

		return total;
	}

	function getTotalForAccountType(
		book: number,
		type: AccountType,
		date?: Date
	) {
		return getTotalForAccountTypes(book, [type], date);
	}

	function addTransaction(
		book: number,
		data: Omit<TransactionData, 'number' | 'book'>
	) {
		transactions.value.push({
			...data,
			book: book,
			number: (byBook(book).slice(-1)[0]?.number || 0) + 1
		});
	}

	function editTransaction(
		book: number,
		number: number,
		data: Omit<TransactionData, 'number' | 'book'>
	) {
		const target = byNumber(book, number);

		for (const key in data) {
			// @ts-ignore
			target[key] = data[key];
		}
	}

	function removeTransaction(book: number, number: number) {
		transactions.value = transactions.value.filter(
			transaction => transaction.book !== book || transaction.number !== number
		);
	}

	function removeByBook(book: number) {
		transactions.value = transactions.value.filter(
			transaction => transaction.book !== book
		);
	}

	return {
		transactions,
		byBook,
		byNumber,
		getChangesForAccount,
		getTotalForAccount,
		getTotalForAccountTypes,
		getTotalForAccountType,
		addTransaction,
		editTransaction,
		removeTransaction,
		removeByBook
	};
});

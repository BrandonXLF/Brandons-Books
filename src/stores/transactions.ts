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

export interface TimeRange {
	start?: Date;
	end?: Date;
}

export const useTransactionStore = defineStore('transactions', () => {
	const transactions = ref<TransactionData[]>(
		JSON.parse(localStorage.getItem('transactions') || '[]')
	);

	transactions.value.forEach(transaction => {
		transaction.date = new Date(transaction.date);
	});

	watch(
		transactions,
		() =>
			localStorage.setItem('transactions', JSON.stringify(transactions.value)),
		{ deep: true }
	);

	function byBook(book: number) {
		return transactions.value.filter(transaction => transaction.book === book);
	}

	function byNumber(book: number, number: number) {
		return byBook(book).find(transaction => transaction.number === number);
	}

	function* iterateChanges(
		book: number,
		timeRange?: TimeRange
	): Generator<[TransactionData, AccountChange]> {
		for (const transaction of byBook(book)) {
			if (
				(timeRange?.end && transaction.date > timeRange?.end) ||
				(timeRange?.start && transaction.date < timeRange?.start)
			)
				continue;

			for (const change of transaction.changes) {
				yield [transaction, change];
			}
		}
	}

	function getChangesForAccount(
		book: number,
		account: number,
		timeRange?: TimeRange
	) {
		const changes: DatedChange[] = [];

		let total = 0;

		for (const [transaction, change] of iterateChanges(book, timeRange)) {
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

	function getTotalForAccount(
		book: number,
		account: number,
		timeRange?: TimeRange
	) {
		let total = 0;

		for (const [_, change] of iterateChanges(book, timeRange)) {
			if (change.account !== account) continue;

			total += change.amount;
		}

		return total;
	}

	function getTotalForAccountType(
		book: number,
		types: AccountType | AccountType[],
		timeRange?: TimeRange
	) {
		let total = 0;
		const accountStore = useAccountStore();

		if (typeof types === 'number') types = [types];

		for (const [_, change] of iterateChanges(book, timeRange)) {
			const type = accountStore.byNumber(book, change.account)!.type;

			if (!types.includes(type)) continue;

			total += change.amount;
		}

		return total;
	}

	function addTransaction(
		data: Omit<TransactionData, 'number'> & { number?: number }
	) {
		if (data.number) removeTransaction(data.book, data.number);

		const transactionsInBook = byBook(data.book);
		const number =
			data.number ||
			Math.max(0, ...transactionsInBook.map(book => book.number)) + 1;

		let index = transactionsInBook.findIndex(
			transactions => transactions.date > data.date
		);

		index = index == -1 ? transactionsInBook.length : index;

		data.changes.sort((a, b) => Math.sign(b.amount) - Math.sign(a.amount));

		transactions.value.splice(index, 0, { ...data, number });
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
		getTotalForAccountType,
		addTransaction,
		removeTransaction,
		removeByBook
	};
});

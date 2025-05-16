import { defineStore } from 'pinia';
import { useAccountStore } from '@/stores/accounts';
import type { AccountType } from '@/data/accountTypes';
import { ref, watch } from 'vue';
import parseObject from '@/helpers/parseObject';

export interface AccountChange {
	account: UUID;
	amount: number;
}

export interface DatedChange {
	amount: number;
	date: Date;
	total: number;
}

export interface TransactionData {
	number: UUID;
	book: UUID;
	date: Date;
	summary: string;
	changes: AccountChange[];
}

export interface TimeRange {
	start?: Date;
	end?: Date;
}

export const useTransactionStore = defineStore('transactions', () => {
	const transactions = ref(parseObject<TransactionData[]>(localStorage.getItem('transactions') ?? '[]'));

	transactions.value.forEach(transaction => {
		transaction.date = new Date(transaction.date);
	});

	watch(
		transactions,
		() =>
			localStorage.setItem('transactions', JSON.stringify(transactions.value)),
		{ deep: true }
	);

	function byBook(book: UUID) {
		return transactions.value.filter(transaction => transaction.book === book);
	}

	function byNumber(book: UUID, number: UUID) {
		return byBook(book).find(transaction => transaction.number === number);
	}

	function* iterateChanges(
		book: UUID,
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
		book: UUID,
		account: UUID,
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
		book: UUID,
		account: UUID,
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
		book: UUID,
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
		data: Omit<TransactionData, 'number'> & { number?: UUID }
	) {
		if (data.number) removeTransaction(data.book, data.number);

		const transactionsInBook = byBook(data.book);
		const number = data.number ?? crypto.randomUUID();

		let index = transactionsInBook.findIndex(
			transactions => transactions.date > data.date
		);

		index = index == -1 ? transactionsInBook.length : index;

		data.changes.sort((a, b) => Math.sign(b.amount) - Math.sign(a.amount));

		transactions.value.splice(index, 0, { ...data, number });
	}

	function removeTransaction(book: UUID, number: UUID) {
		transactions.value = transactions.value.filter(
			transaction => transaction.book !== book || transaction.number !== number
		);
	}

	function removeByBook(book: UUID) {
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

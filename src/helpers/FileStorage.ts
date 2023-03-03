import { useTransactionStore } from '@/stores/transactions';
import { useBookStore } from '@/stores/books';
import { useAccountStore } from '@/stores/accounts';

import type { BookData } from '@/stores/books';
import type { TransactionData }  from '@/stores/transactions';
import type { AccountData }  from '@/stores/accounts';

export default class FileStorage {
	static downloadBook(book: number) {
		const transactions = useTransactionStore();
		const books = useBookStore();
		const accounts = useAccountStore();

		const data = JSON.stringify({
			book: books.byNumber(book),
			accounts: accounts.byBook(book),
			transactions: transactions.byBook(book)
		});

		const blob = new Blob([data], {type: 'text/json'});

		const el = document.createElement('a');

		el.href = URL.createObjectURL(blob);
		el.download = books.byNumber(book)?.name + '.bb';

		document.body.appendChild(el);
		el.click();
		document.body.removeChild(el);
	}

	static uploadBook() {
		const el = document.createElement('input');

		el.type = 'file';
		el.accept = '.bb';
		el.click();

		return new Promise(resolve =>
			el.addEventListener('change', _ => {
				const file = el?.files?.[0];

				if (!file) return;

				resolve(FileStorage.uploadBookWithFile(file));
			})
		);
	}

	static async uploadBookWithFile(file: File) {
		const transactions = useTransactionStore();
		const books = useBookStore();
		const accounts = useAccountStore();

		const text = await file.text();
		const {
			book: bookData,
			transactions: transactionsData,
			accounts: accountsData
		}: {
			book: BookData;
			transactions: TransactionData[];
			accounts: AccountData[];
		} = JSON.parse(text);

		const book = books.addBook(bookData);

		transactionsData.forEach(transaction => {
			transaction.date = new Date(transaction.date);

			transactions.addTransaction(book, transaction);
		});

		accountsData.forEach(account => accounts.addAccount(book, account));
	}
}
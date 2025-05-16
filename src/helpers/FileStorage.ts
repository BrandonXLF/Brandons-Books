import { useTransactionStore } from '@/stores/transactions';
import { useBookStore } from '@/stores/books';
import { useAccountStore } from '@/stores/accounts';

import type { BookData } from '@/stores/books';
import type { TransactionData } from '@/stores/transactions';
import type { AccountData } from '@/stores/accounts';
import parseObject from '@/helpers/parseObject';

export default class FileStorage {
	static downloadBook(book: UUID) {
		const transactions = useTransactionStore();
		const books = useBookStore();
		const accounts = useAccountStore();

		const data = {
			book: books.byNumber(book)!,
			accounts: accounts.byBook(book),
			transactions: transactions.byBook(book)
		};

		const blob = new Blob([JSON.stringify(data)], { type: 'text/json' });

		const el = document.createElement('a');
		el.href = URL.createObjectURL(blob);
		el.download = data.book.name + '.bb';

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
			book: Omit<BookData, 'number'> & { number: UUID | undefined }; // Support old format
			transactions: TransactionData[];
			accounts: AccountData[];
		} = parseObject(text);

		const book = books.addBook(bookData);

		transactionsData.forEach(transaction => {
			transaction.date = new Date(transaction.date);
			transaction.book = book;

			transactions.addTransaction(transaction);
		});

		accountsData.forEach(account => {
			account.book = book;

			accounts.addAccount(account);
		});
	}
}

import { createRouter, createWebHistory } from 'vue-router';

import BookListView from '@/views/BookListView.vue';
import BookView from '@/views/BookView.vue';
import JournalView from '@/views/JournalView.vue';
import LedgerView from '@/views/LedgerView.vue';
import LedgerListView from '@/views/LedgerListView.vue';
import BalanceSheetView from '@/views/BalanceSheetView.vue';
import IncomeStatementView from '@/views/IncomeStatementView.vue';
import BookNav from '@/components/BookNav.vue';
import BookError from '@/components/BookError.vue';
import { useBookStore } from '@/stores/books';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: {
				name: 'booklist'
			}
		},
		{
			path: '/books',
			name: 'booklist',
			component: BookListView,
			meta: {
				title: 'Books'
			}
		},
		{
			path: '/books/:book',
			name: 'book',
			component: BookView,
			redirect: {
				name: 'journal'
			},
			meta: {
				header: BookNav
			},
			beforeEnter: to => {
				const book = parseInt(to.params.book as string);
				const books = useBookStore();

				if (!books.byNumber(book)) {
					to.meta.title = 'Error';
					to.meta.error = BookError;
				}

				return true;
			},
			children: [
				{
					path: 'journal',
					name: 'journal',
					component: JournalView,
					meta: {
						title: 'Journal'
					}
				},
				{
					path: 'ledger',
					name: 'ledger',
					component: LedgerListView,
					meta: {
						title: 'Ledgers'
					}
				},
				{
					path: 'ledger/:account',
					name: 'ledgeraccount',
					component: LedgerView,
					meta: {
						title: 'Ledger'
					}
				},
				{
					path: 'balancesheet',
					name: 'balancesheet',
					component: BalanceSheetView,
					meta: {
						title: 'Balance Sheet'
					}
				},
				{
					path: 'incomestatement',
					name: 'incomestatement',
					component: IncomeStatementView,
					meta: {
						title: 'Income Statement'
					}
				}
			]
		}
	]
});

router.afterEach(to => {
	document.title = (to.meta.title as string) + " - Brandon's Books";
});

export default router;

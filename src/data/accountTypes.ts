export enum AccountType {
	Asset,
	Liability,
	Equity,
	Revenue,
	Expense
}

export const accountTypes = {
	[AccountType.Asset]: {
		type: AccountType.Asset,
		name: 'Asset',
		prefix: 1,
		multiplier: 1
	},
	[AccountType.Liability]: {
		type: AccountType.Liability,
		name: 'Liability',
		prefix: 1,
		multiplier: -1
	},
	[AccountType.Equity]: {
		type: AccountType.Equity,
		name: 'Equity',
		prefix: 1,
		multiplier: -1
	},
	[AccountType.Revenue]: {
		type: AccountType.Revenue,
		name: 'Revenue',
		prefix: 1,
		multiplier: -1
	},
	[AccountType.Expense]: {
		type: AccountType.Expense,
		name: 'Expense',
		prefix: 1,
		multiplier: 1
	}
};

export const incomeAccountTypes = [AccountType.Revenue, AccountType.Expense];

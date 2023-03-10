export enum AccountType {
	Asset,
	Liability,
	Equity,
	Revenue,
	Expense
}

export type AccountTypeInfo = {
	type: AccountType;
	name: string;
	multiplier: -1 | 1;
};

export const accountTypes: { [key in AccountType]: AccountTypeInfo } = {
	[AccountType.Asset]: {
		type: AccountType.Asset,
		name: 'Assets',
		multiplier: 1
	},
	[AccountType.Liability]: {
		type: AccountType.Liability,
		name: 'Liabilities',
		multiplier: -1
	},
	[AccountType.Equity]: {
		type: AccountType.Equity,
		name: 'Equity',
		multiplier: -1
	},
	[AccountType.Revenue]: {
		type: AccountType.Revenue,
		name: 'Revenues',
		multiplier: -1
	},
	[AccountType.Expense]: {
		type: AccountType.Expense,
		name: 'Expenses',
		multiplier: 1
	}
};

export const incomeParentType = AccountType.Equity;
export const incomeAccountTypes = [AccountType.Revenue, AccountType.Expense];

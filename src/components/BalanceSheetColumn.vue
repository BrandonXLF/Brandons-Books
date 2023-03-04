<script setup lang="ts">
	import {
		AccountType,
		accountTypes,
		incomeAccountTypes
	} from '@/data/accountTypes';
	import { useRoute } from 'vue-router';
	import AccountsTotal from '@/components/AccountsTotal.vue';
	import TypeTotal from '@/components/TypeTotal.vue';

	const props = defineProps<{
		types: AccountType[];
		date?: Date;
	}>();

	const book = parseInt(useRoute().params.book as string);
	const typeInfos = props.types.map(type => accountTypes[type]);
</script>

<template>
	<div class="table balance-sheet">
		<template v-for="(accountType, index) in typeInfos" :key="accountType.name">
			<h2>{{ accountType.name }}</h2>
			<AccountsTotal :book="book" :type="accountType.type" :date="date" />
			<TypeTotal
				v-if="typeInfos.length > 1"
				:valueClass="index === typeInfos.length - 1 ? 'pre-total' : ''"
				:book="book"
				:type="
					accountType.netIncome
						? [...incomeAccountTypes, accountType.type]
						: accountType.type
				"
				:name="`Total ${accountType.name}`"
				:date="date"
				:totalDepth="1"
			/>
		</template>
		<TypeTotal
			valueClass="total"
			:book="book"
			:type="typeInfos.map(typeInfo => typeInfo.type)"
			:name="`Total ${typeInfos
				.map(accountType => accountType.name)
				.join(' and ')}`"
			:date="date"
			:totalDepth="typeInfos.length > 1 ? 2 : 1"
		/>
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.balance-sheet {
		grid-template-columns: 4fr 1fr;
		max-width: 32em;
		flex: 0 1 100%;
	}

	.balance-sheet h2 {
		grid-column: 1 / 3;
		margin-top: 1em;
	}

	.balance-sheet h2:first-child {
		margin-top: 0;
	}
</style>

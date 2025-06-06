<script setup lang="ts">
	import {
		AccountType,
		accountTypes,
		incomeParentType,
		incomeAccountTypes
	} from '@/data/accountTypes';
	import { useRoute } from 'vue-router';
	import AccountsTotal from '@/components/AccountsTotal.vue';
	import TypeTotal from '@/components/TypeTotal.vue';
	import type { TimeRange } from '@/stores/transactions';

	const props = defineProps<{
		types: AccountType[];
		timeRange: TimeRange;
	}>();

	const book = useRoute().params.book as UUID;
	const typeInfos = props.types.map(type => accountTypes[type]);
</script>

<template>
	<div class="table balance-sheet">
		<template v-for="(accountType, index) in typeInfos" :key="accountType.name">
			<h2>{{ accountType.name }}</h2>
			<AccountsTotal
				:book="book"
				:type="accountType.type"
				:time-range="timeRange"
			/>
			<TypeTotal
				v-if="typeInfos.length > 1"
				:valueClass="index === typeInfos.length - 1 ? 'pre-total' : ''"
				:book="book"
				:type="
					accountType.type === incomeParentType
						? [...incomeAccountTypes, accountType.type]
						: accountType.type
				"
				:name="`Total ${accountType.name}`"
				:time-range="timeRange"
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
			:time-range="timeRange"
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

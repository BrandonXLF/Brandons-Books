<script setup lang="ts">
	import { accountTypes, incomeAccountTypes } from '@/data/accountTypes';
	import { useRoute } from 'vue-router';
	import TopDate from '@/components/TopDate.vue';
	import { ref } from 'vue';
	import TypeTotal from '@/components/TypeTotal.vue';
	import AccountsTotal from '@/components/AccountsTotal.vue';

	const book = parseInt(useRoute().params.book as string);
	const date = ref<Date | undefined>(new Date());
</script>

<template>
	<TopDate v-model="date" />
	<div class="table income-statement">
		<template v-for="(accountType, index) in incomeAccountTypes" :key="index">
			<h2>{{ accountTypes[accountType].name }}</h2>
			<AccountsTotal
				:book="book"
				:type="accountType"
				:date="date"
				:threeColEmpty="3"
			/>
			<TypeTotal
				valueClass="pre-total"
				:book="book"
				:type="accountType"
				:date="date"
				:name="`Total ${accountTypes[accountType].name}`"
				:threeColEmpty="2"
				:totalDepth="1"
			/>
		</template>
		<TypeTotal
			valueClass="total"
			:book="book"
			:type="incomeAccountTypes"
			:date="date"
			name="Net Income"
			:threeColEmpty="2"
		/>
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.income-statement {
		grid-template-columns: 5fr repeat(2, 1fr);
		max-width: 40em;
	}

	.income-statement h2 {
		grid-column: 1 / 4;
	}

	.income-statement h2:first-child {
		margin-top: 0;
	}
</style>

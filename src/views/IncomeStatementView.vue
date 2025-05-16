<script setup lang="ts">
	import { accountTypes, incomeAccountTypes } from '@/data/accountTypes';
	import { useRoute } from 'vue-router';
	import TopDate from '@/components/TopDate.vue';
	import { ref, watch } from 'vue';
	import TypeTotal from '@/components/TypeTotal.vue';
	import AccountsTotal from '@/components/AccountsTotal.vue';
	import type { TimeRange } from '@/stores/transactions';

	const book = useRoute().params.book as UUID;
	const range = ref<TimeRange>({});
	const startDateText = ref<string>('');

	function updateStartDate() {
		const value = startDateText.value;

		if (!value) {
			delete range.value.start;
			return;
		}

		range.value.start = new Date(range.value.end ?? Date.now());

		if (value.startsWith('last-')) {
			const days = parseInt(value.slice(5)) - 1;
			range.value.start.setDate(range.value.start.getDate() - days);
			return;
		}

		if (value === 'month') {
			range.value.start.setDate(1);
			return;
		}

		if (value === 'year') {
			range.value.start.setMonth(0);
			range.value.start.setDate(1);
		}
	}

	watch(range, () => console.log(range.value.start?.toUTCString()), {
		deep: true
	});
</script>

<template>
	<TopDate v-model="range.end" @update:model-value="updateStartDate" /> for
	<select v-model="startDateText" @change="updateStartDate">
		<option value="">all time</option>
		<option value="last-7">last 7 days</option>
		<option value="last-30">last 30 days</option>
		<option value="last-365">last 365 days</option>
		<option value="month">month to date</option>
		<option value="year">year to date</option>
	</select>
	<div class="table income-statement">
		<template v-for="(accountType, index) in incomeAccountTypes" :key="index">
			<h2>{{ accountTypes[accountType].name }}</h2>
			<AccountsTotal
				:book="book"
				:type="accountType"
				:time-range="range"
				:threeColEmpty="3"
			/>
			<TypeTotal
				valueClass="pre-total"
				:book="book"
				:type="accountType"
				:time-range="range"
				:name="`Total ${accountTypes[accountType].name}`"
				:threeColEmpty="2"
				:totalDepth="1"
			/>
		</template>
		<TypeTotal
			valueClass="total"
			:book="book"
			:type="incomeAccountTypes"
			:time-range="range"
			name="Net Income"
			:threeColEmpty="2"
		/>
	</div>
</template>

<style scoped>
	@import url('@/assets/table.css');

	.income-statement {
		grid-template-columns: 4fr 1fr 1fr;
		max-width: 39em;
	}

	.income-statement h2 {
		grid-column: 1 / 4;
	}

	.income-statement h2:first-child {
		margin-top: 0;
	}
</style>

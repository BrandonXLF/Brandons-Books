<script setup lang="ts">
	import { AccountType, accountTypes } from '@/data/accountTypes';
	import LabeledInput from '@/components/LabeledInput.vue';

	defineEmits<{
		(event: 'update:value', value: number): void;
	}>();

	const props = defineProps<{
		value: number;
		multiplier?: number;
		accountType?: AccountType;
		label?: string;
	}>();

	const multiplier =
		props.multiplier ??
		(props.accountType !== undefined
			? accountTypes[props.accountType as AccountType].multiplier
			: 1);
</script>

<template>
	<LabeledInput
		type="number"
		:value="value * multiplier"
		@update:value="(value: number) => $emit('update:value', value * multiplier)"
	>
		<template v-slot:label>
			<span
				:class="multiplier === 1 ? 'dr' : 'cr'"
				:title="multiplier === 1 ? 'Debit account' : 'Credit account'"
			>
				{{ label }}
			</span>
		</template>
	</LabeledInput>
</template>

<style scoped>
	.dr {
		color: green;
	}

	.cr {
		color: red;
	}
</style>

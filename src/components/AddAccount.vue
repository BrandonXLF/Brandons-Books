<script setup lang="ts">
	import { useAccountStore } from '@/stores/accounts';
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { AccountType, accountTypes } from '@/data/accountTypes';
	import LabeledInput from '@/components/LabeledInput.vue';

	const emit = defineEmits<{
		(e: 'error', error: string): void;
		(e: 'success'): void;
	}>();

	const props = defineProps<{
		number?: UUID;
	}>();

	const accounts = useAccountStore();
	const book = useRoute().params.book as UUID;

	const account =
		props.number === undefined
			? undefined
			: accounts.byNumber(book, props.number);

	const name = ref<string>(account?.name ?? '');
	const userNumber = ref<string>(account?.userNumber ?? '');
	const type = ref<AccountType>(account?.type || AccountType.Asset);

	function submit() {
		if (!name.value) {
			emit('error', 'No name');
			return;
		}

		if (!userNumber.value) {
			emit('error', 'No number');
			return;
		}

		if (type.value === undefined) {
			emit('error', 'No type');
			return;
		}

		if (
			accounts
				.byBook(book)
				.some(account =>
					props.number && props.number === account.number
						? false
						: account.userNumber === userNumber.value ||
						  account.name === name.value
				)
		) {
			emit('error', 'Account with that name or number already exists');
			return;
		}

		accounts.addAccount({
			book,
			number: props.number,
			userNumber: userNumber.value,
			name: name.value,
			type: type.value
		});

		emit('success');
	}

	defineExpose({ submit });
</script>

<template>
	<LabeledInput v-model:value.trim="name" label="Name" />
	<LabeledInput v-model:value.trim="userNumber" label="Number" />
	<LabeledInput label="Type">
		<select v-model.number="type">
			<option
				v-for="accountType in Object.values(accountTypes)"
				:key="accountType.type"
				:value="accountType.type"
			>
				{{ accountType.name }}
			</option>
		</select>
	</LabeledInput>
</template>

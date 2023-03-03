<script setup lang="ts">
	import { useAccountStore } from '@/stores/accounts';
	import { RouterLink, useRoute } from 'vue-router';
	import DeleteButton from '@/components/DeleteButton.vue';
	import ActionPopup from '@/components/ActionPopup.vue';
	import EditButton from '@/components/EditButton.vue';
	import DeleteAccount from '@/components/DeleteAccount.vue';
	import AddAccount from '@/components/AddAccount.vue';

	const accounts = useAccountStore();
	const book = parseInt(useRoute().params.book as string);
</script>

<template>
	<div class="container">
		<div
			v-for="account in accounts.byBook(book)"
			:key="account.number"
			class="account"
		>
			<RouterLink
				:to="{ name: 'ledgeraccount', params: { account: account.number } }"
				class="link"
			>
				{{ account.name }} #{{ account.userNumber }}
			</RouterLink>
			<ActionPopup
				:type="DeleteAccount"
				:number="account.number"
				titleText="Delete Account"
				submitText="Delete"
			>
				<DeleteButton />
			</ActionPopup>
			<ActionPopup
				:type="AddAccount"
				:number="account.number"
				titleText="Edit Account"
				submitText="Save"
			>
				<EditButton />
			</ActionPopup>
		</div>
	</div>
	<ActionPopup
		:type="AddAccount"
		toggleText="Add Account"
		titleText="Create Account"
		submitText="Create"
	/>
</template>

<style scoped>
	.account {
		margin: 0.5em 0;
		display: flex;
		align-items: center;
	}

	.link {
		margin-right: 0.5em;
	}

	.container {
		margin: 1em 0;
	}
</style>

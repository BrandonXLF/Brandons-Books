<script setup lang="ts">
	import type { Component } from 'vue';
	import { ref } from 'vue';

	const props = defineProps<{
		toggleText?: string;
		titleText: string;
		submitText: string;
		type: Component;
		number?: number;
		destructive?: boolean;
	}>();

	const showPopup = ref(false);
	const error = ref('');
	const child = ref<Component & { submit: () => void }>();
	const buttonClass = props.destructive ? 'destructive' : 'progressive';

	function togglePopup() {
		showPopup.value = !showPopup.value;
		error.value = '';
	}

	function showError(errorMsg: string) {
		error.value = errorMsg;
	}
</script>

<template>
	<span @click="togglePopup" class="toggle">
		<slot>
			<button :class="buttonClass">{{ toggleText }}</button>
		</slot>
	</span>
	<div v-if="showPopup" class="background">
		<div role="dialog" class="popup">
			<header>
				<div class="title">{{ titleText }}</div>
				<div class="close" @click="togglePopup">&times;</div>
			</header>
			<div class="popup-main">
				<component
					:is="type"
					ref="child"
					@error="showError"
					@success="togglePopup"
					:number="number"
				/>
				<div v-if="error" class="error">Error: {{ error }}</div>
			</div>
			<footer>
				<button @click="child?.submit()" :class="buttonClass">
					{{ submitText }}
				</button>
				<button @click="togglePopup">Cancel</button>
			</footer>
		</div>
	</div>
</template>

<style scoped>
	.toggle {
		display: inline-flex;
	}

	.popup-main {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.error {
		margin: 0.5em 0;
		color: rgb(150, 6, 6);
	}

	.background {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
	}

	.popup {
		display: flex;
		background: #fff;
		min-width: 25vw;
		min-height: 25vh;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		flex-direction: column;
		box-shadow: 2px 1px 4px 0 rgba(0, 0, 0, 0.1);
	}

	header {
		display: flex;
		margin-bottom: 0.5em;
		padding: 1.25em;
		padding-bottom: 0;
	}

	.title {
		font-weight: bold;
		flex: 1;
	}

	.close {
		font-weight: bold;
		font-size: 1.5em;
		line-height: 0.5em;
		cursor: pointer;
	}

	.popup-main {
		flex: 1;
		padding: 0 1.25em;
		padding-bottom: 1.25em;
	}

	footer {
		padding: 1.25em;
		background: var(--secondary-bg);
		border-radius: 0 0 4px 4px;
		border-top: 1px solid var(--border-color);
	}

	footer > *:not(:last-child) {
		margin-right: 1em;
	}
</style>

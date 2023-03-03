<script setup lang="ts">
	defineEmits<{
		(event: 'update:value', value: any): void;
		(event: 'button'): void;
	}>();

	defineProps<{
		type?: string;
		label?: string;
		value?: unknown;
		flex?: boolean;
		button?: string;
	}>();
</script>

<template>
	<div class="container">
		<label class="label">
			<slot name="label">
				<span v-if="label">{{ label }}</span>
			</slot>
			<span class="input">
				<slot>
					<input
						:type="type"
						:value="value"
						@input="$emit('update:value', ($event.target as HTMLInputElement).value)"
					/>
				</slot>
			</span>
		</label>
		<button v-if="button" @click="$emit('button')" class="button">
			{{ button }}
		</button>
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		align-items: center;
	}

	.label {
		flex: 1;
		display: flex;
		margin: 0.5em 0;
		align-items: center;
	}

	.label > :not(:last-child),
	.label > :slotted(:not(:last-child)) {
		margin-right: 0.5em;
	}

	.button {
		margin-left: 0.5em;
	}

	.input {
		display: flex;
		flex: 1;
	}

	.input *,
	.input :slotted(*) {
		flex: 1;
	}
</style>

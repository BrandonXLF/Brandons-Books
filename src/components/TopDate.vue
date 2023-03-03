<script setup lang="ts">
	const emit = defineEmits<{
		(event: 'update:modelValue', value?: Date): void;
	}>();

	const props = defineProps<{
		modelValue?: Date;
	}>();

	if (!props.modelValue) {
		emit('update:modelValue', new Date());
	}
</script>

<template>
	As of
	<input
		type="date"
		:valueAsDate="modelValue"
		@change="$emit('update:modelValue', ($event.target as HTMLInputElement).valueAsDate || undefined)"
	/>
</template>

<style scoped>
	input {
		margin-bottom: 1em;
	}
</style>

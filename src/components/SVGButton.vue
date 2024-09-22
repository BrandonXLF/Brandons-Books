<template>
	<button>
		<slot />
	</button>
</template>

<style scoped>
	button {
		padding: 0;
		margin: 0;
		background: none;
		margin-left: 0.5em;
		font: inherit;
	}

	button > :deep(svg) {
		height: 1em;
		cursor: pointer;
	}
</style>
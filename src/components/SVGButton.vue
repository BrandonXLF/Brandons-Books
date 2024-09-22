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
		font: inherit;
	}

	button > :deep(svg) {
		height: 1em;
		cursor: pointer;
	}
</style>
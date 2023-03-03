<template>
	<nav>
		<slot />
	</nav>
</template>

<style scoped>
	nav > :deep(*) {
		margin: 0 0.5em 0.5em 0;
		display: inline-block;
		vertical-align: middle;
	}
</style>

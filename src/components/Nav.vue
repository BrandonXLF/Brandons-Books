<template>
	<nav>
		<slot />
	</nav>
</template>

<style scoped>
	nav {
		display: flex;
		align-items: center;
	}

	nav > :deep(*) {
		margin-right: 0.5em;
	}
</style>

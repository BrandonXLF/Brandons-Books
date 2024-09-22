<template>
	<nav>
		<slot />
	</nav>
</template>

<style scoped>
	nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5em;
		background: var(--secondary-bg);
	}
</style>

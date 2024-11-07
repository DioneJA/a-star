<template>
    <div class="main-container">
        <a-star-example />
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    components: {
        AStarExample: () => import('../components/aStar/AStarExample.vue'),
    },
};
</script>

<style scoped lang="scss">
.main-container {
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--color-background-primary);
}
</style>
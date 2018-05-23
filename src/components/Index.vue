<template>
  <div class="index">
    <h2>Все виды собак</h2>
    <breed-list></breed-list>
  </div>
</template>

<script>
import breedList from './partial/breedList';
export default {
  components: { breedList },
  name: 'Index'
};
</script>

<style lang="less">
</style>

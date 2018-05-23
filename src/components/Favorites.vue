<template>
  <div class="index">
    <h2>Избранное</h2>
    <breed-list isFavorites></breed-list>
  </div>
</template>

<script>
import breedList from './partial/breedList';
export default {
  name: 'Index',
  components: { breedList },
  data() {
    return {
    };
  }
};
</script>

<style lang="less">
</style>

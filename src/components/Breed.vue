<template>
  <div class="index">
    <h2>Порода: {{breed}}</h2>
    <breed-list :breed="breed"></breed-list>
  </div>
</template>

<script>
import breedList from './partial/breedList';

export default {
  name: 'Index',
  components: { breedList },
  props: ['breed']
};
</script>

<style lang="less">
</style>

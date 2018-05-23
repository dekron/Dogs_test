<template>
  <div class="index">
    <h2>Порода: {{breed}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: ['breed'],
  data() {
    return {
    };
  }
};
</script>

<style lang="less">
</style>

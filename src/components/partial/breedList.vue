<template>
    <div class="card-list">
      <div class="breed-card" v-for="(img, index) in images" v-bind:key="index">
        <img class="breed-card__image"  :src="img.image" alt="" />
        <div class="like-icon" :class="favoritesList && favoritesList.indexOf(img.image) >= 0 ? 'liked' : ''"  @click="setFavorites(img.image)"></div>
      </div>
      <div class="loader" v-show="!isFavorites && images.length < 1"></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'breed-list',
  props: {
    breed: {
      type: String,
      default: () => {
        return '';
      }
    },
    isFavorites: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.count = 20;
      document.documentElement.scrollTop = 0;
    }
  },
  data() {
    return {
      count: 20,
      loadingImages: false
    };
  },
  computed: {
    ...mapGetters([
      'breedImages',
      'allFavorites'
    ]),
    images() {
      if (this.breed !== '') {
        return this.breedImages.filter(img => img.breed === this.breed).slice(0, this.count);
      } else if (this.isFavorites === true) {
        return this.breedImages.filter(img => this.favoritesList.indexOf(img.image) >= 0).slice(0, this.count);
      } else {
        return this.breedImages.slice(0, this.count);
      }
    },
    favoritesList() {
      return this.allFavorites;
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions([
      'setFavorites'
    ]),
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop + window.outerHeight >= document.documentElement.scrollHeight - 100 && !this.loadingImages && this.images.length > 0) {
        this.loadingImages = true;
        this.count += 20;
        this.loadingImages = false;
        console.log('get +20 images');
      }
    }
  }
};
</script>

<style lang="less">
  .card-list{
    margin-top: 10px;

    .breed-card {
      width: 600px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
      box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
      padding-bottom: 1px;
      text-align: center;
      &__image {
        max-width: 600px;
      }
    }
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin-left: auto;
    margin-right: auto;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .like-icon{
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAARZJREFUOBG1k7tOAlEURUdjSaztiJGG1taekoQPsCYh9P6J/2BNi5WFHT0FDYHCGBMbCwhR14K5GCZe5+Gwk80995x91kwmIUl+1KC8w2P8ktranrOgU4ohfsRvqa3tOTvQJbcp/orYWQtf4edIxl1nTbzVCb9POAYN/TkZHe6xU5bMpF8gHIPE+n2/SVd6zdoyl0BjT67aX/rG65rfVtxa8OQI4InghyOA98wR8KrfM7sna68LqhnOhsreZcg6kP++BS4LC3l3ZfyqNt1XHMJFT3fc/VPXTN9xUahZdwrphtQHzoObMVtKHdIrHIM7M1NJPbY2OAu35+xfumX7Ewe4tb1aNIASwNa5OstN7AL3HOdp1jpX3w0DzRjry5arAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-size: contain;
    width: 32px;
    height: 32px;
    margin: 12px;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    &:hover,&.liked{
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAYAAACJfM0wAAAAAXNSR0IArs4c6QAAAfJJREFUOBGtlM9LG1EQx7/z8kMqvdV/wItQNMVT0YbEHLQerELoxWsPxdL2D/CYf6KlZ/XiQTzoQQxoEm0oFFRwQ6GHQg+FHuxBkB42m53OvPSpGxJ/7oPdefOdmc+b3fd2Cf9Ho1B4eOL/eQeEUwBl2jIfA6Y8kH70YbhSOVONSyWzV157yxwWwRi1eYQjIrOem3r5kUqlUDXSWzX/ZBBBa4sZQ+p3DiJ8T6X7Ztj3uQmsgHmsM8f6RF9SSM1n64c/DTMTB62lXlAt0FjT93cCYLcntJ041oS/okyqZjMLHIaf7Iox3ciYN0Y6mIuJd4ERppEHbW/AhRzDjEflHcOPgRRBKNMQ6CCixuAo08BgNQZWFCFMe44rz0Y2ZBNfRKN39Ig2C3VvVjYP6E8/eE1EP+6IOi9ThrJUsOCnla+/kTST8iH+Os+69URqhWFZUmtfhWNU8yOPOeCa/AMGnHYjSzihJOUnat43l287do4GTCIxLeudOu16S6dacxmqNZGOHaSWG85yQNsM7ndaNyvH6i8l+Xl+r/G5Mx7p2AVtIqEoq/b8eGxMcrpBldMVrIGJurfNCZoHUUv9yBBNY5oT0S85PcGaU9j31hPAK+mOXY3OVdOY07rZK8FakKt7y0x474p1rprz722r45lFvW4K+gemd6+st4Ha7QAAAABJRU5ErkJggg==');
    }
  }
</style>

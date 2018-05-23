<template>
  <div id="app">
    <nav class="navigation" role='navigation'>
      <div class="content">
        <div class="navigation__title">Породы собак</div>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><a>Порода</a>
            <ul>
              <li v-for="(breed, index) in breeds" v-bind:key="index">
                <router-link :to="breed">{{breed}}</router-link>
              </li>
            </ul>
          </li>
          <li><router-link to="favourites">Избранное</router-link></li>
        </ul>
      </div>
    </nav>
    <div class="content">
      <div class="content-box">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  mounted() {
    this.getAllBreeds();
    this.getAllFavorites();
  },
  computed: {
    ...mapGetters([
      'allBreeds'
    ]),
    breeds() {
      return this.allBreeds;
    }
  },
  methods: {
    ...mapActions([
      'getAllBreeds',
      'getAllFavorites'
    ])
  }
};
</script>

<style lang="less">
  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Verdana', sans-serif;
  }

  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 3px 10px -2px rgba(0, 0, 0, .1);
    border: 1px solid rgba(0, 0, 0, .1);

    &__title {
      font-size: 1.5em;
      padding: 20px 0;
      display: inline-block;
    }

    ul {
      list-style: none;
      position: relative;
      float: right;
      display: inline-table;

      li {
        float: left;
        -webkit-transition: all .2s ease-in-out;
        -moz-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
        cursor: pointer;
        &:hover {
          background: rgba(0, 0, 0, .15);
          > ul {
            display: block;
          }
        }

        a {
          display: block;
          padding: 30px 20px;
          color: #222;
          font-size: .9em;
          letter-spacing: 1px;
          text-decoration: none;
          text-transform: uppercase;
        }
      }

      ul {
        display: none;
        background: #fff;
        position: absolute;
        top: 100%;
        box-shadow: -3px 3px 10px -2px rgba(0, 0, 0, .1);
        border: 1px solid rgba(0, 0, 0, .1);
        max-height: 320px;
        overflow: hidden;
        overflow-y: scroll;

        li {
          float: none;
          position: relative;
          cursor: pointer;
          a {
            padding: 15px 30px;
            border-bottom: 1px solid rgba(0, 0, 0, .05);
          }
        }

        ul {
          position: absolute;
          left: 100%;
          top: 0;
        }
      }
    }
  }
  .content {
    width: 1100px;
    margin-left: auto;
    margin-right: auto;

    &-box {
      margin-top: 100px;
      box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);
      min-height: 600px;
      padding: 20px 30px;
      h2 {
        border-bottom: 1px solid #ddd;
        font-weight: normal;
        padding-bottom: 10px;
      }
    }
  }

</style>

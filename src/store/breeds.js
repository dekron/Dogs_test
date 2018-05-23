const state = {
  breeds: [],
  breedImages: [],
  favorites: []
};

const actions = {
  getAllBreeds({commit, dispatch}) {
    window.fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        return res.json();
      }).then(data => {
        if (data.status && data.status === 'success') {
          commit('recieve_breeds', Object.keys(data.message));
          dispatch('getAllImages');
        }
    });
  },
  getAllImages({commit, state}) {
    for (let breed in state.breeds) {
      window.fetch(`https://dog.ceo/api/breed/${state.breeds[breed]}/images`)
        .then(res => {
          return res.json();
        }).then(data => {
        if (data.status && data.status === 'success') {
          let images = data.message.map((el) => {
            return {
              breed: state.breeds[breed],
              image: el
            };
          });
          commit('recieve_images', images);
        }
      });
    }
  },
  getAllFavorites({commit}) {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    commit('recieve_favorites', favorites || []);
  },
  setFavorites({commit, state}, image) {
    let index = state.favorites.indexOf(image);
    if (index >= 0) {
      state.favorites.splice(state.favorites.indexOf(image), 1);
    } else {
      state.favorites.push(image);
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    commit('recieve_favorites', state.favorites);
  }
};

const mutations = {
  recieve_breeds(state, breeds) {
    state.breeds = breeds;
  },
  recieve_images(state, images) {
    state.breedImages = state.breedImages.concat(images);
  },
  recieve_favorites(state, favorites) {
    state.favorites = favorites;
  }
};

const getters = {
  allBreeds(state) {
    return state.breeds;
  },
  breedImages(state) {
    return state.breedImages;
  },
  allFavorites(state) {
    return state.favorites;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};

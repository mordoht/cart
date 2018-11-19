import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Cats: [
      {
        name: 'chat 1',
        price: 20,
        image: 'https://static.wamiz.fr/images/news/medium/handicap-chat-bub-star-web.jpg',
        stars: 4.4,
        totalReviews: 340,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chat 2',
        price: 40,
        image: 'https://66.media.tumblr.com/ab7088dd0c70708a12f2b35a280f2e0d/tumblr_ouejsoMeh71rq1a16o2_250.jpg',
        stars: 3,
        totalReviews: 30,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chat 3',
        price: 30,
        image: 'https://static.wamiz.fr/images/news/medium/maru-chat-video-ralenti-08.jpg',
        stars: 2,
        totalReviews: 248,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chat 4',
        price: 10,
        image: 'https://i.warosu.org/data/sci/img/0090/77/1501685522562.jpg',
        stars: 4.4,
        totalReviews: 340,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chat 5',
        price: 100000,
        image: 'https://flavorwire.files.wordpress.com/2014/01/nic-cage-cat.jpg?w=250&h=250&crop=1',
        stars: 3,
        totalReviews: 30,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chat 6',
        price: 40,
        image: 'https://cdn.drawception.com/images/avatars/636276-FE4.jpg',
        stars: 2,
        totalReviews: 248,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
    ],

    Dogs: [
      {
        name: 'chien 1',
        price: 50,
        image: 'http://cdn-scraplogo.pearltrees.com/fe/c1/fec121dbed6815dd3951d77f9737cba1-pearlsquare.jpg?v=2',
        stars: 5,
        totalReviews: 310,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chien 2',
        price: 20,
        image: 'https://avaq.fr/wp-content/uploads/2018/05/sante-chien.png',
        stars: 2.9,
        totalReviews: 42,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chien 3',
        price: 60,
        image: 'https://www.animauxenligne.com/media/wysiwyg/shampoing-pour-chien.jpg',
        stars: 0.5,
        totalReviews: 1,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chien 4',
        price: 30,
        image: 'https://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/dogesmall.jpg',
        stars: 5,
        totalReviews: 310,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chien 5',
        price: 20,
        image: 'https://i0.wp.com/media3.giphy.com/media/fvmz3gCAip1M4/giphy.gif?resize=250%2C250&ssl=1',
        stars: 2.9,
        totalReviews: 42,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
      {
        name: 'chien 6',
        price: 40,
        image: 'http://78.media.tumblr.com/92cf2270850925373a9a9bd0f28d1b3c/tumblr_nrqy9nGLdP1tdxuggo1_250.jpg',
        stars: 0.5,
        totalReviews: 1,
        details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      },
    ],

    cartProducts: [],
    currentProduct: {},
    showModal: false,
    showPopupCart: false,
  },

  getters: {
    getCats: state => state.Cats,
    getDogs: state => state.Dogs,
    getCatsAndDogs: state => state.Cats.concat(state.Dogs),
    getProductsInCart: state => state.cartProducts,
    getCurrentProduct: state => state.currentProduct,
    getShowModal: state => state.showModal,
    getPopupCart: state => state.showPopupCart,
  },

  mutations: {
    ADD_PRODUCT: (state, product) => {
      state.cartProducts.push(product);
    },
    REMOVE_PRODUCT: (state, index) => {
      state.cartProducts.splice(index, 1);
    },
    REMOVE_ALL_PRODUCTS: (state) => {
      state.cartProducts = [];
    },
    CURRENT_PRODUCT: (state, product) => {
      state.currentProduct = product;
    },
    SHOW_MODAL: (state) => {
      state.showModal = !state.showModal;
    },
    SHOW_POPUP_CART: (state) => {
      state.showPopupCart = !state.showPopupCart;
    },
  },

  actions: {
    addProduct: (context, product) => {
      context.commit('ADD_PRODUCT', product);
    },
    removeProduct: (context, index) => {
      context.commit('REMOVE_PRODUCT', index);
    },
    removeAllProducts: (context) => {
      context.commit('REMOVE_ALL_PRODUCTS');
    },
    currentProduct: (context, product) => {
      context.commit('CURRENT_PRODUCT', product);
    },
    showOrHiddenModal: (context) => {
      context.commit('SHOW_MODAL');
    },
    showOrHiddenPopupCart: (context) => {
      context.commit('SHOW_POPUP_CART');
    },
  },
});

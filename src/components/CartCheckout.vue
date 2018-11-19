<template>
  <div class="checkout-box">
    <ul class="checkout-list">
      <transition-group name="fade">
      <li v-for="(product, index) in getProductsInCart" :key="index" class="checkout-product">
        <img :src="product.image" alt="" class="product-image">
        <h3 class="product-name">{{ product.name }}</h3>
        <span class="product-price">{{ product.price }},00 € </span>
        <button class="product-remove" @click="remove(index)">X</button>
      </li>
      </transition-group>
    </ul>
    <div v-if="!hasProduct() && !orderConfirmed" class="checkout-message">
      <h3>Aucun animal n'a été ajouté au panier...</h3>
      <router-link to="./">Cliquer ici pour retourner au menu principal</router-link>
    </div>
    <div v-if="message" class="checkout-message">
      <h3>{{message}}</h3>
    </div>
    <h3 class="total" v-if="hasProduct()">
      Total: {{ totalPrice() }},00 €
    </h3>
    <button v-if="hasProduct() && loggedIn" class="btn btn-info" btnColor="btn btn-small btn-info"
         @click="validateCommand()">
      Confirmer la commande
    </button>
    <div v-if="hasProduct() && !loggedIn">
      Vous devez être connecté pour valider votre panier !
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  data() {
    return {
      loggedIn: false,
      message: null,
      orderConfirmed: false
    };
  },
  computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
  },

  methods: {
    ...mapActions([
      'removeProduct',
      'removeAllProducts',
    ]),
    hasProduct() {
      return this.getProductsInCart.length > 0;
    },
    totalPrice() {
      return this.getProductsInCart.reduce((current, next) =>
        current + next.price, 0);
    },
    remove(index) {
      this.removeProduct(index);
    },
    validateCommand() {
      const token = localStorage.getItem('token');
      axios
        .post('/api/submitOrder', {
          orders: this.getProductsInCart,
        }, {
          headers: { Authorization: 'Bearer ' + token },
        }).then((response) => {
          this.message = response.data.message;
          this.removeAllProducts();
          this.orderConfirmed = true;
        }).catch((err) => {
          this.message = err.response.data.message;
        });
    },
    checkExpirationToken(tokenDecode) {
      const now = Date.now().valueOf() / 1000
      if (typeof tokenDecode.exp !== 'undefined' && tokenDecode.exp < now) {
        throw new Error(`token est expiré : ${JSON.stringify(tokenDecode)}`);
      }
      if (typeof tokenDecode.nbf !== 'undefined' && tokenDecode.nbf > now) {
        throw new Error(`token est expiré : ${JSON.stringify(tokenDecode)}`);
      }
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenDecode = jwtDecode(token);
      try {
        this.checkExpirationToken(tokenDecode);
        this.loggedIn = true;
      } catch (error) {
        this.loggedIn = false;
      }
    } else {
      this.loggedIn = false;
    }
  },
};
</script>

<style scoped>
  .checkout-box {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    box-sizing: border-box;
    padding: 1em;
  }

  .checkout-list {
    padding: 0;
  }

  .checkout-product {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr .5fr;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
    border-radius: 5px;
    list-style: none;
    box-sizing: border-box;
    padding: .8em;
    margin: 1em 0;
  }

  .checkout-product * {
    place-self: center;
  }
  .product-image {
    grid-column: 1/2;
    width: 50%;
  }

  .product-name {
    box-sizing: border-box;
  }

  .product-price {
    font-size: 1.2em;
    font-weight: bold;
  }

  .product-remove {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 0;
    background-color: #E0E0E0;
    color: #fff;
    cursor: pointer;
  }

  .total {
    font-size: 2em;
    font-weight: bold;
    align-self: flex-end;
  }

  .checkout-message {
    font-size: 1.5em;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(-40px);
    opacity: 0;
  }
  .btn {
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    position: relative;
    padding: 10px;
  }

  .btn-info {
    background-color: #2D9CDB;
  }

  .btn {
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    position: relative;
  }

  .btn-danger {
    background-color: #e74c3c;
  }
</style>

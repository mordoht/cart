<template>
  <div>
    <div>
      <div>{{message}}</div>
      <br/>
      <div v-if="!loggedIn">
        <form>
          Identifiant:
          <input v-model='form.username' name="Id"><br/>
          Mot de passe:
          <input v-model='form.password' type="password" name="Password"><br/>
        </form>
        <button class="btn btn-info" @click="login()">Se connecter</button>
        <button class="btn btn-info" @click="register()">S'inscrire</button>
      </div>
      <div>
        <button class="btn btn-danger" v-if="loggedIn" @click="logout()">Logout</button>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  name: 'SignIn',
  data() {
    return {
      loggedIn: false,
      message: null,
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      axios
        .post('/api/login', this.form)
        .then((response) => {
          this.message = response.data.message;
          localStorage.setItem('token', response.data.token);
          this.form.username = '';
          this.form.password = '';
          this.loggedIn = true;
        })
        .catch((err) => {
          this.message = err.response.data.message;
        });
    },
    register() {
      axios
        .post('/api/register', this.form)
        .then((response) => {
          this.message = response.data.message;
          localStorage.setItem('token', response.data.token);
          this.form.username = '';
          this.form.password = '';
          this.loggedIn = true;
        })
        .catch((err) => {
          this.message = err.response.data.message;
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.message = 'Vous avez bien été déconnecté';
      this.loggedIn = false;
    },
    checkExpirationToken(tokenDecode) {
      const now = Date.now()
        .valueOf() / 1000;
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

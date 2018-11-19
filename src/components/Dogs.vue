<template>
  <listOfProducts :products="getDogs"/>
</template>

<script>
import { mapGetters } from 'vuex';
import listOfProducts from './ListOfProducts';

export default {
  components: {
    listOfProducts,
  },

  computed: {
    ...mapGetters([
      'getDogs',
    ]),
  },
};
</script>

<style>
</style>


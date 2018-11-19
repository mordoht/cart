<template>
  <listOfProducts :products="getCats"/>
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
      'getCats',
    ]),
  },
};
</script>

<style>
</style>


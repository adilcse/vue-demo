<template>
  <div id="app">
    <AppHeader />
    <MainForm />
  </div>
</template>

<script>
import MainForm from './layouts/MainForm.vue'
import AppHeader from './components/AppHeader.vue';

export default {
  name: 'App',
  beforeMount() {
    this.$store.dispatch('getList')
  },
  components: {
    MainForm,
    AppHeader
}
}
</script>


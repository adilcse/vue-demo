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
  components: {
    MainForm,
    AppHeader
}
}
</script>

